```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. Shadow DOM
- 브라우저 내부에 존재하여 숨겨진 DOM/CSS 기능
- Shadow DOM은 캡슐화되어 문서에서 액세스 불가능, 내부 스타일 규칙을 가짐 

![[ShadowDOM.PNG]]

- `input`의 타입을 지정할 경우 미리 지정된 스타일의 요소가 생성
- 개발자도구에서 사용자 에이전트 Shadow DOM 표시 옵션 활성화시 확인 가능

![[ShadowDOM2.PNG]]

- Shadow DOM은  `pseudo` 라는 비표준 속성을 가지며 CSS를 통해 스타일 지정 가능

```
<style>
input::-webkit-slider-runnable-track {
	background : red;
}
</style>

<input type="range">
```

## 1-1 Shadow Tree
- DOM은Light Tree와 Shadow Tree로 구분
- 한 요소가 두 트리에 함께 존재할 경우 브라우저는 Shadow Tree의 요소만 렌더링
- 커스텀 요소를 Shadow Tree에 적용하여 캡슐화 할 수 있음

```
<!doctype html>
<body>
<script>
customElements.define('show-hello', class extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `<p>Hello, ${this.getAttribute('name')}</p>`;
  }
});
</script>

<show-hello name="John"></show-hello>
</body>
```

- `elem.attachShadow({mode : ...})` 메서드를 통해 Shadow Tree에 요소 추가 가능
- `mode` : 캡슐화 수준 설정
	- `open` : `elem.shadowRoot`를 통해 섀도우 루트에 접근 가능
	- `closed` : `elem.shadowRoot`는 항상 `null`

> article, aside, blockquote, body, div, footer, h1…h6, header, main, nav, p, section, span, 커스텀 요소는
> Shadow Tree에 포함할 수 있음 그러나 img 등의 태그는 포함할 수 없음

- `elem.attachShadow`를 통해 반환된 값을 통해서만 Shadow Tree에 접근 가능
- 브라우저 기본 Shadow Tree에 접근하는 방법은 없음
- Shadow Root 요소를 `host` 프로퍼티로 접근 가능

```
elem.shadowRoot.host === elem // true
```

## 1-2 캡슐화
- Shadow DOM은 `Document.querySelector` 으로 접근할 수 없음
- Light DOM과 중복되는 id를 가질 수 있음
- 섀도우 루트에 접근하여 `elem.shadowRoot.querySelector`로 접근 가능
- 자체 스타일이 존재하며 외부 DOM 스타일 규칙은 적용되지 않음

---
# 2. Shadow DOM Slots, Componsition

- `Slot`은 Light Tree 의 요소 내부의 컨텐츠를 Shadow DOM에 합성하는 방법을 제공
- 기존 태그에 `slot` 속성을 사용하여 이름을 정의하고 Shadow DOM에서 `Slot` 태그를 통해 합성

```
<!doctype html>
<body>
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <div>Name:<slot name="username"></slot></div>
      <div>Birthday:<slot name="birthday"></slot></div>`;
  }
});
</script>

// shadow DOM에 user-card 요소 추가
<user-card>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
</body>
```

- 단 Shadow host의 직계 하위 항목에서만 유효한 `slot` 옵션을 가질 수 있음

```
<user-card>
	<span slot="username">John Smith</span>
	<div>
		// 이 슬롯은 유효하지 않음
		<span slot="birthday">01.01.2001</span>
	</div>
</user-card>
```

- 동일한 `slot` 이름을 가진 여러 요소가 존재할 경우 차례대로 슬롯에 추가

```
<user-card>
	#shadow-root
	<div>Name:
		<slot name="username">
			<span slot="username">John</span>
			<span slot="username">Smith</span>
		</slot>
</user-card>
```

## 2-1 Slot Default 컨텐츠
- ShadowRoot의 `<slot>` 태그 내에 콘텐츠가 존재하면 `Default` 컨텐츠가 됨
- Light DOM에 해당 `slot`의 이름이 존재하지 않을 경우 `Default` 컨텐츠가 렌더링

## 2-2 이름이 없는 Default Slot
- 이름이 없는 Slot은 Light DOM 요소중 `slot` 이름이 없는 모든 노드를 가져옴

```
<!doctype html>
<body>
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <div>Name:<slot name="username"></slot></div>
    <div>Birthday:<slot name="birthday"></slot></div>
    <fieldset>
	    <legend>Other information</legend>
		<slot></slot>
    </fieldset>`;
  }
});
</script>

<user-card>
  <div>I like to swim.</div> // 이 내용은 filedset 내의 이름 없는 slot으로 평면화
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
  <div>...And play volleyball too!</div> // 이 내용은 filedset 내의 이름 없는 slot으로 평면화
</user-card>
</body>
```

![[ShadDOMSlot.PNG]]

## 2-3 Slot과 Template을 활용한 커스텀 메뉴 요소 생성

```
<custom-menu>
  <span slot="title">Candy menu</span>
  <li slot="item">Lollipop</li>
  <li slot="item">Fruit Toast</li>
  <li slot="item">Cup Cake</li>
</custom-menu>

<template id="tmpl">
  <style> /* menu styles */ </style>
  <div class="menu">
    <slot name="title"></slot>
    <ul><slot name="item"></slot></ul> // slot="item"인 모든 li 추가
  </div>
</template>

customElements.define('custom-menu', class extends HTMLElement {
    connectedCallback() {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.append( tmpl.content.cloneNode(true) );

      this.shadowRoot.querySelector('slot[name="title"]').onclick = () => {
        this.shadowRoot.querySelector('.menu').classList.toggle('closed');
      };
    }
});
```

## 2-4 Slot 이벤트
- 브라우저는 Slot을 모니터링하여 추가/삭제시 렌더링 업데이트
- Slot이 변화할 경우 `slotchagne` 이벤트가 발생

## 2-5 Slot 메서드
- `node.assignedSlot` : `node`이 할당된  `<slot>`요소 반환
- `slot.assignedNodes({flatten: true/false})` : 슬롯에 할당된 DOM 노드 반환
- `slot.assignedElements({flatten : true/false})` : 슬롯에 할당된 DOM 요소만 반환

---
# 3. Shadow DOM 스타일링
- Shadow DOM은 `<style>` 또는 `<link rel="stylesheet"...>`에서 해당 태그 포함 가능

## 3-1 :host(selector)
- Shadow 호스트의 CSS는 `:host` 선택자를 통해 스타일 가능
- Light DOM CSS 규칙 또한 영향 받음
- 로컬, 문서 스타일에 모두 영향을 받지만 문서 스타일이 우선 적용
- 셀렉터가 존재할 경우 `:host(selector)` 선택자 사용

```
<template>
<style>
	:host([centered]) {
		...
	}
</style>
<slot></slot>
</template>

<script>
	customElements.define('custom-dialog', class extends HTMLElement {
		connectedCallback(){
			this.attachShadow({mode:'open'}).append(tmpl.content.clonNode(true));
		}
	});
</script>

<custom-dialog centered>
	...
<custom-dialog>
```

## 3-2 :host-context(selector)
- Shadow DOM 호스트 중 외부 문서의 호스트 또는 상위 항목이 `selector`와 일치하는 경우 적용

```
<body class="dark-theme">
	<cusdom-dialog>...</custom-dialog>
</body>
```

## 3-3 Slot 콘텐츠 스타일링
- Slot 요소는 Light DOM 구성 요소이므로 문서 스타일을 사용
- 로컬 스타일에 영향을 받지 않음

### 3-3-1 
---
# 4. Shadow DOM 이벤트

---
#ShadowDOM