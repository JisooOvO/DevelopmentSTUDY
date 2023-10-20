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

- `css` 선택자에 해당하는 첫 번째
---
>[[JavaScript]]
#DOM