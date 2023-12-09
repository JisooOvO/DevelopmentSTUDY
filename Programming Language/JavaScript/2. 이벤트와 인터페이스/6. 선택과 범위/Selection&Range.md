```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. Range

- 범위는 한 쌍의 시작점과 끝 점으로 이루어진 경계, 자바스크립트는 Range 객체를 제공
- Selection 객체를 관리하기 위한 수단
>더블 클릭 등으로 문서 조작시 텍스트 요소가 블럭 처리되는 것에 영향
```
// Range는 파라미터가 없음
let range = new Range();

// 시작점 설정
range.setStart(node, offset)

// 끝점 설정
range.setEnd(node, offset);
```

## 1-1 Range 예시

1. 텍스트 선택하기
```
<p id="p">Example: <i>italic</i> and <b>bold</b></p>
```

![[Range.PNG]]

![[RangeExam.PNG]]

```
// Example: <i>italic</i> 를 선택해봅시다.

<script>
	const p = document.querySelector("p");
	let range = new Range();

	range.setStart(p, 0); p의 0 번째 자식 텍스트 요소부터
	range.setEnd(p,2); 2 번째 미만의 자식 텍스트 요소까지
	
	alert(range) // Examle: italic

	document.getSelection().addRange(range);
</script>
```

2. 텍스트 노드의 일부 텍스트만 추출하기
```
<body>
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();

  range.setStart(p.firstChild, 2);
  range.setEnd(p.querySelector('b').firstChild, 3);

  alert(range); // ample: italic and bol

  window.getSelection().addRange(range);
</script>
</body>
```

## 1-2 Range 프로퍼티

![[RangeExam2.PNG]]

- `startContainer`, `startOffset` : 시작 노드 및 오프셋
- `endContainer`, `endOffset` : 끝의 노드 및 오프셋
- `collapsed` :  Range 범위가 동일한 지점에서 시작하고 끝나는 경우 `true`(빈 객체)
- `commonAncestorContainer` : Range 객체 내 모든 노드의 가장 가까운 공통된 조상

## 1-3 Range 메서드

- 시작 지점 메서드
	- `setStart(node, offset)` : 노드 내 offset 부터 시작
	- `setStartBefore(node)` 노드 바로 앞부터 시작
	- `setStartAfter(node)` 노드 바로 뒤부터 시작

- 끝 지점 메서드
	-  `setEnd(node, offset)`
	- `setEndBefore(node)` 
	- `setEndAfter(node)`

-  `selectNode(node)` : `node` 전체를 선택
- `selectNodeContents(node)` : `node`의 모든 내용을 선택

- `collapse(toStart)` : `toStart`가 `true`일 경우 `start = end`(범위 축소 메서드)
>`start = end`라는 것은 선택 없이 커서만 위치한다는 뜻

- `cloneRange()` : `start, end`가 같은 범위 객체 복사

- `deleteContents()` : document에서 Range content 제거
- `extractContents()` : document에서 Range content 제거 후 DocumentFragment 객체로 반환

- `cloneContents()` : Range 내용 복사하여 DocumentFragment 객체로 반환

- `insertNode(node)` : 문서 내 Range 객체 앞에 `node` 삽입
- `surroundContents(node)` : `node`를 Range content 안으로 감쌈(text node 존재시 에러)

---
# 2. Selection

- 문서에서 선택은 `Selection` 객체에 의해 이루어짐
- `document.getSelection()`을 통해 선택한 요소를 가져올 수 있음
>선택은 0을 포함한 다수의 범위를 허용하지만 Firefox에서만 다중 선택이 가능함
>Firefox를 제외한 다른 브라우저는 Range 객체를 1개로 제한

![[Selection.PNG]]

## 2-1 Selection 프로퍼티

- `anchorNode` : 선택이 시작된 노드
- `anchorOffset` : 선택이 시작된 노드의 오프셋
- `focusNode` : 선택이 끝난 노드
- `focusOffset` : 선택이 끝난 노드의 오프셋
- `isCollapsed` : Boolean 값 (`true`일 때 선택이 되지 않은 상태 의미)
- `rangeCount` : Range 객체의 갯수(Firefox 제외 1)

![[SelectionMouse.png]]
> `anchor`와 `focus`의 순서는 마우스 시작 위치에 따라 다름
> Range 객체의 경우 `start`는 반드시 `end` 앞에 위치함

## 2-2 Selection 이벤트

- `elem.onselectstart` : 선택 시작시 발생
>`event.preventDefault()`를 통해 선택을 방지할 수 있음

- `document.onselectionchange` : 선택 변경시 발생(`document`에서만 설정 가능)
```
// 선택한 내용을 복사하는 코드
<body>
	<p id="p">Select me: <i>italic</i> and <b>bold</b></p>
	Cloned: <span id="cloned"></span>
	<br>
	As text: <span id="astext"></span>

<script>
  document.onselectionchange = function() {
    let selection = document.getSelection();
    cloned.innerHTML = astext.innerHTML = "";

    // Clone DOM nodes from ranges (we support multiselect here)
    for (let i = 0; i < selection.rangeCount; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }

    // Get as text
    astext.innerHTML += selection;
  };
</script>
</body>
```

## 2-3 Selection 메서드

- 범위 삭제 / 추가 메서드
	- `getRangeAt(i)` : 0 부터 시작하여 i 번째 범위 객체를 가져옴(Firefox 제외 0으로 고정)
	- `addRange(range)` : 선택 객체에 `range` 객체 추가(Firefox에서만 사용)
	- `removeRange(range)` : 선택 객체에 `range` 객체 제거
	- `removeAllRanges()` : 모든 범위 객체 제거
	- `empty()` : `removeAllRanges()`와 같음

- `collapse(node, offset)` : `node`의 `offset`으로 범위 객체의 `start, end` 지정
- `setPosition(node, offset)` : `collapse()`와 동일

- `collapseToStart()` – Selection start로 범위 축소(빈 Range로 대체)
- `collapseToEnd()` – Selection end로 범위 축소

- `extend(node, offset)` – `node`의 `offset`으로 셀레트 포커스 이동

- `setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)` :
	`anchorNode/anchorOffset` 부터  `focusNode/focusOffset` 까지 모든 내용의 범위로 선택 변경

- `selectAllChildren(node)` : `node` 내 모든 자식 요소 선택

- `deleteFromDocument()` : 문서에서 셀렉트 content 제거

- `containsNode(node, allowPartialContainment = false)` : `node`가 선택되었는지 체크

### 2-3-1 Selection 핸들링 예시

```
// Range 객체 생성하지 않고 <p> 태그의 모든 내용 선택하기
<body>
	<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

<script>
  // select from 0th child of <p> to the last child
  document.getSelection().setBaseAndExtent(p, 0, p, p.childNodes.length);
</script>
</body>
```

```
// Range 객체 사용하기
<body>
	<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();
  
  range.selectNodeContents(p); // or selectNode(p) to select the <p> tag too

  // 모든 브라우저는 removeAllRanges()로 선택을 비워야 새로운 범위를 무시하지 않음
  // setBaseAndExtent() 메서드는 기존 선택 범위를 변경하므로 예외
  document.getSelection().removeAllRanges(); 
  document.getSelection().addRange(range);
</script>
</body>
```

## 2-4 form 요소에서의 Selection 

- `<input>, <textarea>`와 같은 폼 요소는 [특별한 Selection API](https://html.spec.whatwg.org/#textFieldSelection)가 존재함
>Selection / Range 객체가 없으며 해당 태그의 값은 HTML이 아닌 순수한 텍스트

### 2-4-1 form Selection 프로퍼티

- `input.selectionStart` : 선택 시작 위치(쓰기 가능)
- `input.selectionEnd` : 선택 종료 위치(쓰기 가능)
- `input.selectionDirection` : 선택 방향 
	- `“forward”`
	- `“backward”` 
	- `“none”`  : 더블 클릭으로 선택시

### 2-4-2 form Selection 이벤트

- `input.onselect`
>`document.onselectionchange`는 폼 요소와 관련이 없음

### 2-4-3 form Selection 메서드

- `input.select()` : `input / textarea` 내 모든 텍스트 선택

- `input.setSelectionRange(start, end, [direction])`  :  해당 범위의 텍스트 선택 

- `input.setRangeText(replacement, [start], [end], [selectionMode])` : 
	 - 텍스트를 `replacement` 로 대체
	 - 범위가 주어지지 않을 경우 유저가 선택한 범위로 설정
	 - `[selectionMode]` : 텍스트 교체 후 선택 방법
		-  `"select"` : 바뀐 텍스트 선택
		- `"start"` : 바뀐 텍스트 앞에 커서 위치
		- `"end"` : 바뀐 텍스트 뒤에 커서 위치
		- `"preserve"` : 기존 텍스트 범위 선택 그대로 유지(`default`)

## 2-5 선택 불가능하게 만들기

### 2-5-1 CSS 프로퍼티 사용

- `user-select : none` 사용
>해당 요소에서 선택 시작하는 것만을 허용하지 않음
>다른 요소에서 선택시 `document.getSelection()` 으로 선택 범위 내 포함됨
>단, 복사 붙여 넣기시에는 무시됨

### 2-5-2 이벤트 기본 동작 방지

- `onselectstart` 또는 `mousedown` 이벤트 사용
>`mousedown` 이벤트를 사용하는 다른 핸들러와의 충돌방지를 위해 사용(`ex) drag`)

---
#range #selection