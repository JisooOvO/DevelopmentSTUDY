```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. DOM 트리

## 1-1 DOM 특징

- DOM에 따르면 모든 HTML 태그는 객체, 문자(text) 역시 객체
>태그 하나가 감싸고 있는 자식 태그는 중첩태그(nested tag)

- 자바스크립트를 통해 객체에 접근가능
```
document.body.style.background = 'red'; // 배경을 붉은색으로 변경하기
setTimeout(() => document.body.style.background = '', 3000); // 원상태로 복구하기
```

- DOM은 HTML을 태그 트리 구조로 표현
>태그 각각은 `element node`이고 `<html>`은 루트 노드가 됨

- 문자는 `text node`이며 자식노드를 가질 수 없음(`leaf node`)
>공백(space)과 새줄(newline) 역시 텍스트 노드
>`<head>` 이전의 공백과 새줄은 무시

- 모든 컨텐츠는 `body`내부에 존재해야 함 
>따라서 `</body>` 뒤 쪽의 콘텐츠는 자동으로 `body`로 이동

## 1-2 브라우저 DOM 자동 교정

- 브라우저는 이상한 HTML을 만나면 DOM 생성과정에서 자동으로 교정
	- 닫는 태그가 없을 경우
	- `<html>, <body>, <head>` 등이 없을 경우
	- `<tbody>`가 없을 경우

## 1-3 주석도 노드이다

- 주석은 주석 노드(`comment node`)로 취급
- 화면 출력에는 영향을 주지 않음
>HTML에 있는 모든 것은 DOM으로 구성해야한다는 규칙

## 1-4 노드 타입

- 프로퍼티 `elem.nodeType` 을 통해 DOM 노드의 타입을 알 수 있음
	- element : 요소
	- attribute : 속성
	- text : 텍스트
	- cdata section : 문자 데이터
	- entity refference
	- entity
	- processing instruction
	- comment : 주석
	- document : 문서
	- document type
	- document fragment
	- notation

---
# 2. DOM 탐색

## 2-1 DOM 트리

- DOM 에서 `null`은 존재하지 않는 노드

![[DOM.PNG]]

- `<html>` 태그는 `document.documentElement` 해당함
- `<body>` = `document.body`
- `<head>` = `document.head`

## 2-2 자식노드 탐색

- 후손 노드(`descendants`) : 중첩 관계 내 모든 요소 (자식요소, 자식요소의 자식..)
- 자식 노드(`children`) : 바로 아래의 자식 요소

### 2-2-1 document.body.childNodes

- 텍스트 노드를 포함한 모든 자식 노드
- 배열의 형태를 하지만 이터러블한 유사 배열 객체 컬렉션(`collection`)
	-  `for..of`로 탐색 가능
	-  배열 메서드 사용 불가(`Array.from()`으로 배열 만들면 가능)
- DOM 컬렉션 탐색용 프로퍼티는 읽기 전용

### 2-2-2 firstChilde / lastChild

- 첫 번째/ 마지막 자식 노드 접근

### 2-2-3 hasChildNodes()

- 자식 노드의 존재 여부 검사

## 2-3 형제 노드(Sibling), 부모노드(Parent)

- 형제 노드간 참조시 `nextSibling / previousSibling` 프로퍼티 사용

## 2-4 요소(Element) 탐색

- Node 와 Element는 약간의 차이가 있음
	- Node
		- `<html>` `<head> ...`
	- Element
		- `<div>, <ul> ...`

---
# 3. 자바스크립트로 DOM 요소 접근하기

## 3-1 document.getElementById(id)

- `id` 만으로 요소 접근 가능
>같은 이름의 변수가 존재할 경우 덮어짐
>`id`는 유일해야함
```
<div id="elem">
	...
</div>

<script>
	elem.style.background = 'red';
</script>
```

- 안정성을 위해 `getElementById()` 사용
> `document` 객체만을 대상으로 함
```
<!doctype html>
<body>
<div id="elem">
  <div id="elem-content">Element</div>
</div>
<script>
  // 요소 얻기
  let elem = document.getElementById('elem');

  // 배경색 변경하기
  elem.style.background = 'red';
</script>
</body>
```

## 3-2 querySelectorAll(css)

- `css` 선택자에 해당하는 요소 모두를 배열 형태로 반환
- 가상 클래스도 사용 가능

## 3-3 querySelector

- `css` 선택자에 해당하는 첫 번째 요소 반환

## 3-4 matches

-  `css`와 일치하는지 여부 판단(`true/false`)

## 3-5 closest

- 자기 자신을 포함하여 `css`와 일치하는 가장 가까운 조상(`ancestor`) 요소 반환

## 3-6 getElementsBy

- 태그 , 클래스, 이름을 이용해 노드 검색하여 해당하는 컬렉션 반환
	- `elem.getElementsByTagName(tag)`
	- `elem.getElementsByClassName(className)`
	- `elem.getElementsByByName(name)`

- 동적인 컬렉션 반환
>스크립트 추가 등 문서에 변경이 있으면 컬렉션이 자동 갱신되어 최신 상태를 ㅇ지
>`querySelectorAll`은 정적인 컬렉션 반환

---
# 4. DOM 노드 프로퍼티

## 4-1 DOM 노드 클래스

![[DOM_tree.PNG]]

- `EventTarget` : 루트에 있는 추상 클래스(`abstract class`),
>모든 DOM 노드에서 이벤트 사용 가능

- `node` : 추상 클래스, DOM 노드의 베이스 역할
>`parentNode, nextSibling, childNOdes` 등 주요 트리 탐색 기능 제공

- `Element` : DOM 요소를 위한 베이스 클래스
>`nextElementSibling`, `children` ,`getElementsByTagName`, `querySelector` 등 요소 전용 탐색 프로퍼티 / 메서드 제공
>XML, SVG 관련  `SVGElement`, `XMLElement`, `HTMLElement` 클래스 베이스 역할도 제공

- `HTMLElement` : HTML 요소 노드의 베이스 역할
	- `HTMLInputElement` : `<input>`
	- `HTMLBodyElement` : `<body>`
	- `HTMLAnchorElement` : `<a>`

## 4-2 nodeName과 tagName

- `tagName` : 요소 노드에만 존재
- `nodeName` : 모든 노드에 존재
> HTML 모드에서는 항상 대문자로 받음
```
<body><!-- 주석 -->
  <script>
    // 주석 노드를 대상으로 두 프로퍼티 비교
    alert( document.body.firstChild.tagName ); // undefined (요소가 아님)
    alert( document.body.firstChild.nodeName ); // #comment

    // 문서 노드를 대상으로 두 프로퍼티 비교
    alert( document.tagName ); // undefined (요소가 아님)
    alert( document.nodeName ); // #document
  </script>
```

## 4-3 innerHTML 프로퍼티

- `innerHTML` 프로퍼티를 사용하면 요소 내 HTML을 수정 가능
-  문법이 틀릴경우 브라우저가 자동으로 고침
-  `<script>` 태그는 동작하지 않음

```
<body>
	<p>p 태그</p>
	<div>div 태그</div>
	  
	<script>
	  alert( document.body.innerHTML ); // 내용 읽기
	  document.body.innerHTML = '새로운 BODY!'; // 교체
	</script>
</body>
```

- `innerHTML += 코드` 로 HTML를 추가할 경우 기존 내용이 삭제되고 기존 내용에 새로운 내용을 합친 내용이 쓰여짐
> 따라서 리소스 전부가 다시 로딩됨

## 4-4 outerHTML

- 요소 전체 HTML이 담겨있음
- `outerHTML`로 HTML 조작시 기존 내용을 수정하지 않고 해당 요소로 삽입됨
```
<body>
	<div>Hello, world!</div>
	
	<script>
	  let div = document.querySelector('div');
	  
	  // div.outerHTML를 사용해 <p>...</p>로 교체
	  div.outerHTML = '<p>새로운 요소</p>'; // (*)
	  
	  // 어! div가 그대로네요!
	  alert(div.outerHTML); // <div>Hello, world!</div> (**)
	</script>
</body>
```

## 4-5 nodeValue/data

- 요소가 아닌 다른 타입의 노드(텍스트, 주석)의 값은 `nodeValue` 또는 `data`로 접근 가능
```
<body>
  안녕하세요.
  <!-- 주석 -->
  
  <script>
    let text = document.body.firstChild;
    alert(text.data); // 안녕하세요.

    let comment = text.nextSibling;
    alert(comment.data); // 주석
  </script>
</body>
```

## 4-6 textContent

- `<태그>` 제외 요소 내의 텍스트에만 접근 가능
```
<body>
<div id="news">
  <h1>주요 뉴스!</h1>
  <p>화성인이 지구를 침공하였습니다!</p>
</div>

<script>
  // 주요 뉴스! 화성인이 지구를 침공하였습니다!
  alert(news.textContent);
</script>
</body>
```

## 4-7 hidden

- HTML 속성, 요소 프로퍼티로 존재
>따라서 태그내에서도 프로퍼티로도 접근 가능

## 4-8 기타 프로퍼티

- `value` : `<input>, <select>, <textarea>` 의 값을 저장
>`HTMLInputElement, HTMLSelectElement` 클래스에 대응

- `href` : `<a>`의 `href` 속성 값
>`HTMLAnchorElement`

- `id`
>`HTMLElement`

[HTML 명세서](https://html.spec.whatwg.org/)

## 4-9 속성과 프로퍼티 심화

### 4-9-1 DOM 프로퍼티 추가

- 자바스크립트처럼 DOM의 프로퍼티 조작 가능
```
document.body.myData = {
  name: 'Caesar',
  title: 'Imperator'
};

alert(document.body.myData.title); // Imperator
```

- DOM 프로퍼티는 항상 문자열이 아님
	- `input.checked` 프로퍼티는 `boolean`
	- `style` 프로퍼티는 객체
	- `<a>` 의 `href`

### 4-9-2 HTML 속성

- 브라우저가 HTML을 파싱해 DOM 객체 생성시 HTML 표준 속성만을 프로퍼티로 인식
```
<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
    // 비표준 속성은 프로퍼티로 전환되지 않습니다.
    alert(document.body.something); // undefined
  </script>
</body>
```

- 비표준 속성 접근시 사용 메서드
	 - `elem.hasAttribute(name)` : 속성 존재 여부 확인
	- `elem.getAttribute(name)` : 속성값을 가져옴
	- `elem.setAttribute(name, value)` : 속성값을 변경함
	- `elem.removeAttribute(name)` : 속성값을 지움
	- `elem.attributes` : 속성 전체 나열
```
<body>

  <div id="elem" about="Elephant"></div>

  <script>
    alert( elem.getAttribute('About') ); // (1) 'Elephant', 속성 읽기
    elem.setAttribute('Test', 123); // (2) 속성 추가하기
    alert( elem.outerHTML ); // (3) 추가된 속성 확인하기 <div id="elem" about="Elephant" test="123"></div>
    
    for (let attr of elem.attributes) { // (4) 속성 전체 나열하기
      alert( `${attr.name} = ${attr.value}` ); // id, about, test
    }
  </script>
</body>
```

- HTML 속성은 대소문자 구분이 없음 -> 모두 소문자가 됨
- 속성 값은 항상 문자열로 반환

#### 4-9-2-1 비표준 속성의 사용법, dataset

```
<body>
	<!-- 이름(name) 정보를 보여주는 div라고 표시 -->
	<div show-info="name"></div>
	
	<!-- 나이(age) 정보를 보여주는 div라고 표시 -->
	<div show-info="age"></div>
	
	<script>
	  // 표시한 요소를 찾고, 그 자리에 원하는 정보를 보여주는 코드
	  let user = {
	    name: "Pete",
	    age: 25
	  };
	
	  for(let div of document.querySelectorAll('[show-info]')) {
	    // 원하는 정보를 필드 값에 입력해 줌
	    let field = div.getAttribute('show-info');
	    div.innerHTML = user[field]; // Pete가 'name'에, 25가 'age'에 삽입됨
	  }
	</script>
</body>
```

- 속성은 `setAttribute, removeAttribute` 메서드를 이용하여 클래스보다 쉽게 상태 변경 가능
- `data-` 로 시작하는 속성은 개발자 용도에 맞게 사용하도록 예약된 속성
>`dataset` 프로퍼티를 통해 접근 가능
```
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
  body.dataset.about = dog;
  alert(document.body.dataset.about); // dog
</script>
```

#### 4-9-2-2 프로퍼티 속성 동기화

- 표준 속성이 변하면 대응하는 프로퍼티는 자동 갱신, 프로퍼티가 변해도 속성 갱신(동기화)
- 단 `input.value` 의 경우 속성->프로퍼티 동기화는 되나 프로퍼티->속성 동기화는 안됨
```
<body>
	<input>
	
	<script>
	  let input = document.querySelector('input');
	
	  // 속성 추가 => 프로퍼티 갱신
	  input.setAttribute('value', 'text');
	  alert(input.value); // text (갱신)
	
	  // 프로퍼티를 변경해도 속성이 갱신되지 않음
	  input.value = 'newValue';
	  alert(input.getAttribute('value')); // text (갱신 안됨!)
	</script>
</body>
```


---
#DOM