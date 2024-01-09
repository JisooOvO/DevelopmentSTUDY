```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. Custom Element
- 자체 클래스, 메서드, 프로퍼티, 이벤트를 만들어 사용자 정의 HTML 요소를 만들 수 있음
- 커스텀 요소에는 2가지 종류가 존재
	- **Autonomous Custom elements** : 추상 `HTMLElement` 클래스를 확장하는 새로운 요소
	- **Customized built-in elements** : `HTMLButtonElement`에 기반한 커스텀 버튼 등 이미 존재하는 요소의 확장

- 커스텀 요소를 위한 특별한 메서드가 존재
- HTML 요소의 렌더링은 `constructor`가 아닌 `connectedCallback()` 메서드에서 실행

```
class MyElement extends HTMLElement {

    constructor() {
      super();
      
    }

    connectedCallback() {
	  // 브라우저는 해당 요소가 문서에 추가될 때마다 이 메서드를 실행
    }

    disconnectedCallback() {
      // 브라우저는 해당 요소가 문서에서 삭제될 때마다 이 메서드를 실행
    }

    static get observedAttributes() {
      return [/* array of attribute names to monitor for changes */];
    }

    attributeChangedCallback(name, oldValue, newValue) {
	  // 속성이 변화할 경우 실행되는 메서드
    }

    adoptedCallback() {
      // 요소가 새로운 문서에 추가될 때 실행되는 메서드
    }

  }
```

## 1-1 커스텀 요소 등록

- 커스텀 요소의 이름에는 하이픈(`-`)이 포함되어야함

```
customElements.define("my-element", MyElement);
```

- [**Intl.DateTimeFormat**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat)을 사용하여 사용자 정의 형식 시간 표시하는 요소 만들기

```
<body>

<script>
// 요소 생성
class TimeFormatted extends HTMLElement {

  // 요소가 문서에 추가될 때 해당 메서드 실행
  connectedCallback() {
    let date = new Date(this.getAttribute('datetime') || Date.now());
    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }
}

// 문서에 커스텀 요소 정의
customElements.define("time-formatted", TimeFormatted); 
</script>

// 커스텀 요소 추가
<time-formatted datetime="2019-12-01"
  year="numeric" month="long" day="numeric"
  hour="numeric" minute="numeric" second="numeric"
  time-zone-name="short"
></time-formatted>
</body>
```

> 브라우저가 `customElements.define`을 만나기전에 커스텀 요소를 만날 경우
> 에러가 발생하지 않음. 대신, 해당 요소는 비표준 태그처럼 `unknown` 상태로 취급
> 이러한 `undefined` 요소는 CSS 선택자 `:not(:defined)`로 스타일 지정 가능
### 1-1-1 커스텀 요소 생성 관련 메서드

- `customElements.get(name)` : `name`에 해당하는 커스텀 요소의 클래스 반환
- `customElements.whenDefined(name)` : `name`에 해당하는 커스텀 요소가 생성된 시간의 프라미스 반환

## 1-2 커스텀 요소의 속성 감지
- `observedAttributes()` 메서드의 반환되는 배열 값을 통해 속성의 변화를 감지할 수 있음
- 속성이 변화할 경우 `attributeChangedCallback()` 메서드가 콜백

```
<!doctype html>
<body>
<script>
class TimeFormatted extends HTMLElement {

  // 렌더링 함수
  render() { 
    let date = new Date(this.getAttribute('datetime') || Date.now());
    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

  // 호출시 렌더링 함수 1번만 실행
  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  // 속성 감지
  static get observedAttributes() {
    return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
}

customElements.define("time-formatted", TimeFormatted);
</script>

<time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

<script
setInterval(() => elem.setAttribute('datetime', new Date()), 1000);
</script>
</body>
```

## 1-3 DOM 렌더링 순서
- HTML 파서가 DOM 구축시 상위요소가 먼저 처리됨

> 따라서 커스텀 요소가 `connectedCallback()` 메서드를 통해
> `innerHTML` 등 하위 요소에 접근시 해당 자식요소의 DOM이 완성되지 않아서 아무것도 얻지 못함
> 단 `setTimeout`을 이용하면 HTML 파싱이 완료된 후 비동기적으로 실행하므로 자식 요소 획득 가능

```
custom.define('user-info', class extends HTMLElement {
	connectedCallback() {
		setTimeout(()=> alert(this.innerHTML));
	}
})''
```

## 1-4 Customized built-in elements

- 커스텀 요소는 시맨틱 태그와 연관되지 않고 검색 엔진과 접근성 장치는 이를 처리할 수 없음

> 내장 HTML 요소를 상속받을 경우 기존 태그의 기능을 재사용하며 해당 문제 해결 가능

```
// 커스텀 요소 생성
class HelloButton extends HTMLButtonElement {
	constructor() {
		super();
		...
	}
	...
}

// button 태그 상속
customElements.define('hello-button', HelloButton, {extends : 'button'})

// 커스텀 built-in 요소 생성
<button is="hello-button">...<button>
```

---
#customElements