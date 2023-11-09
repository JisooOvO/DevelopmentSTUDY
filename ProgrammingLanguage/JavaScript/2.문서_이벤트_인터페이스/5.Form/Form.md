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

웅앵