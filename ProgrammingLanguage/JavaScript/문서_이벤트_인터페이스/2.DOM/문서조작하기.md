```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. Element 조작하기

## 1-1 Element 생성

- `document.createElement(tag)` : 태그 이름을 사용해 새로운 요소 노드를 만듦
-  `document.createTextNode(text)` : 텍스트를 사용해 새로운 텍스트 노드를 만듦

## 1-2 Element 조작하기

### 1-2-1 append

-  `document.body.append(element)` 
> 생성한 Element를 document에 삽입하여야 출력물로 나타남
> 문자열을 인수로 넘길 경우 HTML이 아닌 문자열 그 자체로 삽입
> `append` 메서드를 호출하여 요소를 삽입 가능

- `node.append` : 노드나 문자열을 `node`끝에 삽입
- `node.prepend` : `node` 맨 앞에 삽입
- `node.before` : `node` 이전에 삽입
- `node.after` : `node` 다음에 삽입
- `node.replaceWith` : `node`를 새로운 노드로 대체

![[DOM_append.PNG]]

> 모든 삽입 메서드는 자동으로 기존 노드를 삭제하고 새로운 곳으로 노드 이동

### 1-2-2 insertAdjacentHTML/Text/Element

- 문자열 형태의 HTML/Text/Element를 삽입할 경우 사용

- `elem.insertAdjacentHTML(where, html)`
	- `where`
		- `beforebegin` : `elem`바로 앞에 HTML 삽입
		- `afterbegin` : `elem` 의 첫 번째 자식 요소 바로 앞에 HTML 삽입
		- `beforeend` : `elem` 의 마지막 자식 요소 바로 다음에 HTML 삽입
		- `afterend` : `elem` 의 바로 다음에 HTML 삽입

![[DOM_insertAdjacentHTML.PNG]]

### 1-2-3 remove

- `node.remove` : 노드 삭제하기

### 1-2-4 cloneNode

- `elem.clonNode(true)` : `elem`의 deepcopy 요소 생성
> `elem`의 속성 전부와 자손 요소 전부가 복사됨
> `false`를 인수로 받으면 후손 노드 복사 없이 `elem`만 복제

## 1-3 DocumentFragment

- 여러 노드로 구성된 그룹을 감싸는 특별한 래퍼 DOM 노드 타입
```
<body>
	<ul id="ul"></ul>
	
	<script>
		function getListContent() {
		  let fragment = new DocumentFragment();
		
		  for(let i=1; i<=3; i++) {
		    let li = document.createElement('li');
		    li.append(i);
		    fragment.append(li);
		  }
		  return fragment;
		}

		// Fragment 삽입
		ul.append(getListContent()); // (*)
	</script>
</body>
```

## 1-4 구식 DOM 조작 메서드

- `parentElem.appendChild(node)` : `parentElem`의 마지막 자식으로 `node` 추가하며 반환
- `parentElem.insertBefore(node, nextSibling)` : `node`를 `parentElem` 안의 `nextSibling` 앞에 추가
- `parenElem.reploaceChild(node, oldChild)` : `parentElem`의 `oldChild` 자식노드를 `node`로 교체
- `parentElem.removeChilde(node)` : `parentElem`의 자식노드 `node` 삭제

### 1-4-1 document.write(html)

- 문서 로딩이 끝나기전에 HTML 삽입하는 메서드
- 문서 로딩 이후 메서드 호출시 문서 전체 내용 삭제됨

---
# 2. 스타일과 클래스

## 2-1 className 과 classList

- 옛날 자바스크립트는 `class`같은 예약어는 객체의 프로퍼티가 될 수 없다는 제약사항 존재
>따라서 `class`에 해당하는 프로퍼티가 등장함

- `elem.className` : 클래스 문자열 전체 변경

- `elem.classList` : 메서드를 이용하여 클래스 하나만 조작 가능
	- 이터러블 객체이므로 `for...of` 순회 가능
	- 메서드
		- `add`
		- `remvoe`
		- `toggle`
		- `contains`

## 2-2 style 프로퍼티

- `elem.style` 프로퍼티는 스타일에 대응되는 객체

- 여러 단어를 조합하여 만든 프로퍼티는 카멜 표기법을 이용해 작명
```
background-color => elem.style.backgroundColor
z-index => elem.style.zIndex
```

- 프로퍼티 값은 문자열
>스타일을 지울 때에는 `delete elem.style` 대신 `elem.style.display = ""` 처럼 빈 문자열을 할당

 - 문자열을 이용해 스타일 지정시 `style.cssText` 사용
>기존의 스타일 전체를 교체하는 방식
>`div.setAttribute('style','color:red')`와 같은 방식으로 동작
```
<body>
	<div id="div">버튼</div>
	
	<script>
	  // cssText를 사용하면 'important' 같은 규칙도 설정할 수 있습니다.
	  div.style.cssText=`color: red !important;
	    background-color: yellow;
	    width: 100px;
	    text-align: center;
	  `;
	
	  alert(div.style.cssText);
	</script>
</body>
```

- 값 설정시 `px`등 단위를 붙이지 않으면 동작하지 않음

### 2-2-1 getComputedStyle

- `style` 프로퍼티는 CSS 종속 값을 읽을 수 없음
```
alert(document.body.style.margin) // 빈문자열
```

- `getComputedStyle(element, [pseudo])` : 스타일 정보와 CSS 클래스 정보를 함께 가진 객체 반환
	- `element` : 값을 읽을 요소
	- `pseudo` : `::before` 같은 의사 요소
```
let computedStyle = getComputedStyle(document.body);

// 이제 마진과 색 정보를 얻을 수 있습니다.
alert( computedStyle.marginTop ); // 5px
alert( computedStyle.color ); // rgb(255, 0, 0)
```

- `1rem, 125%`와 같은 CSS 계산 값을 `px` 단위의 결정 값으로 변환하여 제공

- 프로퍼티 이름을 정확하게 알고 있어야 함
```
.elem{
	padding-top : 10px;
	padding-left : 10px
}

// paddingLeft, paddingTop의 값을 가져올 것인가
// Chrome 브라우저는 값을 가져오지만 Firefox에서는 빈 문자열 출력
getComputedStyle(elem).padding 
```

- `:visited` 링크 관련 스타일은 숨겨져있음
>`getComputedStyle`을 이용하여 해당 스타일에 접근 불가
>방문 여부를 알아내어 악의적 행동을 하지 못하게 막기 위함
>*CSS에는 `:visited`에 변화를 가져오는 스타일 적용을 금지하는 제약 존재*

---
#append #insertAdjacentHTML #getComputedStyle