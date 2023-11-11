```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. Form

## 1-1 form 요소에 접근하기

- `document.forms`의 구성원으로 이름과 순서가 존재
- `form.elements[name]` 또는 짧은 형식 `form.name` 으로 요소에 접근 가능
```
<body>
<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
</form>

<form>
  <input type="radio" name="age" value="10">
  <input type="radio" name="age" value="20">
</form>

<script>
  // 폼 얻기
  let form = document.forms.my; // <form name="my"> 요소

  // 요소 얻기
  let elem = form.elements.one; // <input name="one"> 요소

  alert(elem.value); // 1

  let form2 = document.forms[1]
  let ageElems = form2.elements.age;

  alert(ageElems[0]); // [objsct HTMLInputElement]
</script>
</body>
```

- `fieldset` 요소 또한 `elements` 프로퍼티 지원
```
<form>
  <fieldset name="useField">
  ...
...
let fieldset = form.elements.userField
```

- `elements`는 `form` 프로퍼티를 지원하여 폼에 역참조 가능

![[form.PNG]]

## 1-2 폼 요소

### 1-2-1 input / textarea

- `textarea.value`, `input.value / input.checked` 로 요소의 값에 접근 가능

### 1-2-2 select / option

#### 1-2-2-1 select

- `select.options` : `<option>` 하위 요소를 담은 컬렉션(배열 아님)
- `select.value` : 현재 선택된 옵션 값
- `select.selectedIndex` : 현재 선택된 옵션의 인덱스
- `select.options[i].selected` : 해당 옵션이 선택되었는지 체크

- 다중 선택 속성 `multipe` 사용시 `select.options` 컬렉션 순회
```
let selected = Array.from(select.options)
					.filter(opt => opt.selected)
					.map(opt => opt.value);
```

- `<option>`은 다음과 같이 생성 가능
```
option = new Option(text, value, defaultSelected, selected);

	- defaulttSelected : true 일 때 HTML 속성 selected 생성
	- selected : true 일 때 해당 옵션 선택
```

#### 1-2-2-2 option

- `option.selected`
- `option.index`
- `option.text`

## 1-3 focus / blur

- `focus` : 사용자가 폼 요소를 클릭하거나 `Tab`키로 해당 요소 이동시 발생
- `blur` :  해당 폼에서 포커스를 잃을 때 발생
- 현재 포커스된 요소는 `document.activeElement`를 통해 확인 가능
```
// 이메일에 @ 이 있는지 검증하는 코드
<body>

이메일: <input type="email" id="input">

<div id="error"></div>

<script>
input.onblur = function() {
  if (!input.value.includes('@')) { // @ 유무를 이용해 유효한 이메일 주소가 아닌지 체크
    input.classList.add('invalid');
    error.innerHTML = '올바른 이메일 주소를 입력하세요.'
  }
};

input.onfocus = function() {
  if (this.classList.contains('invalid')) {
    // 사용자가 새로운 값을 입력하려고 하므로 에러 메시지를 지움
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
</body>
```

> 모던 HTML Validation을 이용하여 검증할 수도 있지만 
> 자바스크립트를 사용하면 `onblur` 이벤트를 통해 자동으로 서버에 값을 보낼 수 있음

- `focus(), blur()` 메서드를 이용하여 해당 폼 요소에 이벤트 발생 가능
>`alert` 등의 추가 이벤트 발생시 `focus` 해제되므로 주의

## 1-4 tabindex

- `div, span, table` 등의 요소는 focus를 지원하지 않음
- `tabindex : <숫자>` 속성을 사용하면 요소의 종류와 상관없이 포커스가 가능
> Tab 키를 눌렀을 때 숫자가 1인 요소부터 큰 수로 이동
> 0일 경우 `tabindex`가 없는 것처럼 동작(`tabindex` 값 설정된 요소 이후에 포커스)
> 음수일 경우 Tab으로 이동할 경우 무시됨

- `tabindex`로 포커스된 요소는 `:focus`를 이용하여 스타일 변경 가능

## 1-5 focusin / focusout

- `focus, blur`는 버블링되지 않고 캡처링됨
>따라서 form에 focus 이벤트를 설정시 form 내부의 input 요소가 focus될 경우 해당 이벤트 발생 X

- `focusin, focus` 이벤트의 경우 버블링이 됨
>단 `on<event>` 방식으로 핸들러 추가하면 안됨

```
<form id="form" onfocus="this.className='focused'"> // focus는 버블링되지 않음!
	<input type="text" name="surname" value="성">
	<input type="text" name="name" value="이름">
</form>

<script>
	const form = document.querySelector('form')
	
	// 2 번째 인자로 true를 주면 캡처링에서 동작
	form.addEventListener("focus", ()=>form.classList.add('focused'),true)

	// focusin 이벤트 발생
	form.addEventListener("focusin", ()=>form.classList.add('focused'))
</script>
```

---
# 2. 데이터 조작 이벤트

## 2-1 change

- 요소 변경이 끝나면(focus 상실) 이벤트 발생
```
<select onchange=...>
...
```

## 2-2 input

- 사용자가 값을 수정할 때마다 발생
- 화살표 버튼과 같은 값을 변경시키지 않는 동작에는 반응 X
- 값이 수정되자마자 발생하므로 `event.preventDefault()`로 동작을 막을 수 없음
```
<input type="text" id="input"> ...

<script>
	input.oninput = function(){
		...
	}
</script>
```

## 2-3 cut, copy, paste

- ClipboardEvent 클래스의 하위 클래스
- `event.clipboardData` 프로퍼티를 통해 클립보드에 저장된 데이터 읽고 쓰기 가능
- 텍스트뿐만 아니라 모든 것을 복사, 붙여넣기 가능
>모든 브라우저에서 `dispatchEvent`를 사용하여 커스텀 클립보드 이벤트 생성하는 것을 금지

## 2-4 submit

- 폼을 서버에 전송할 때, 검증, 취소시 사용하는 이벤트

### 2-4-1 폼 전송 방법

- `<input type="submit"> , <input type="image">` 클릭
- `<input>` 필드 내에서 Enter 클릭
>Enter 키를 누를 경우  `click` 이벤트가 트리거

- 데이터에 에러 존재할 경우 에러 출력 및 `event.preventDefault()` 호출

### 2-4-2 submit 메서드

- `form.submit()` 메서드 호출시 자바스크립트로 직접 폼을 서버에 전송 가능
> `submit` 이벤트는 따로 발생하지 않음

---
#form #focus #blur #tableindex
