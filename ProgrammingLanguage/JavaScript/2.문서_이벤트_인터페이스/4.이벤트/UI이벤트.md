```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. 마우스 이벤트

- 마우스 이벤트는 핸드폰, 태블릿같은 다른 장치에도 발생

- 사용자는 동작을 하나만 했어도 실행되는 이벤트는 여러 개일 수 있음
>실행순서는 내부 규칙에 따라 결정

## 1-1 종류

- `mousedown, mouseup` : 마우스 왼쪽 버튼 누르고있을 때, 뗄 때 발생
- `mouseover, mouseout` : 마우스 커서가 요소 밖에서 안으로 이동시, 안에서 밖으로 이동시 발생
- `mousemove` : 마우스 이동시 발생
- `click` : 클릭(`mousedown, mouseup` 이벤트 연속발생)
- `dbclick`
- `contextmenu` : 마우스 오른쪽 버튼

### 1-1-1 mouseover/out

- `mouseover/mouseout` 이벤트는 마우스가 요소에 접근하거나 나갈 때 발생
> 한 요소에서 다른 요소로 마우스 이동시 이동한 요소는 
> `target` 프로퍼티가 되고 원요소는 `relatedTarget` 프로퍼티가 됨
> `mouseover(relatedTarget -> target)`
> `mouseout(target -> relatedTarget)`

- 창 밖에서 접근시 `relatedTarget`은 `null`이 됨
>`event.relatedTarget.tagName`으로 접근시 에러를 발생 할 수 있음을 염두해야함

- 마우스가 빠르게 요소 위를 날아다니면 해당 요소에서 이벤트를 건너뛸 수 있음

- 부모요소에서 자식요소로 마우스 이동시 부모요소에서 `mouseout` 이벤트 발생
>브라우저 내에서 마우스 커서는 단일 요소 위에만 있을 수 있음
>따라서 가장 많이 중첩된 요소(자식 요소) 중 z-index가 가장 큰 값인 요소가 선택됨

### 1-1-2 mouseenter/leave

- `mouseover/out` 와 동일한 경우 발생하나 몇 가지 차이가 존재함
	- 요소 내부의 하위 항목 간 전환 계산하지 않음
	- 버블링되지 않음 -> 따라서 Event Delegation 불가

## 1-2 마우스 버튼 프로퍼티

|버튼|`event.button`|
|---|---|
|왼쪽(주요 버튼)|0|
|가운데(보조 버튼)|1|
|오른쪽 (두 번째 버튼)|2|
|X1(뒤로 가기 버튼)|3|
|X2(앞으로 가기 버튼)|4|

- `event.which` : 어떤 버튼을 클릭했는지 알려주는 비표준 프로퍼티(현재 사용하지 않음)

## 1-3 보조키 프로퍼티

- `shiftKey` : shift
- `altKey` : alt / opt(MAC)
- `ctrlKey` : Ctrl
- `metaKey` : Cmd(MAC)

> MAC OS의 경우 Ctrl 키를 Cmd키로 대체하는 경우가 잦음
> 모바일의 경우 보조키가 없으므로 유의하여 사용

## 1-4 드래그 앤 드롭(DND)

### 1-4-1 DND 알고리즘

1. `mousedown` 이벤트 발생시 기존 요소의 복사본을 생성하거나 해당 요소에 클래스를 추가
2. `mousemove` 이벤트에서 `position:absolute`의 `left, top` 변경
3. `mouseup` 이벤트에서 완료된 작업 수행

- DND 예시
```
// 공을 DND 해봅시다
// 마우스 왼쪽 버튼 누를경우 발생
ball.onmousedown = function(event){
	// 공을 선택한 정확한 포인터 위치 계산
	let shiftX = event.clientX - ball.getBoundingClientRect().left;
	let shiftY = event.clientY - ball.getBoundingClientRect().top;

	// 공을 절대 좌표로 계산
	ball.style.position = 'absolute';
	ball.style.zIndex = 1000;

	// 공을 body 영역에 추가
	document.body.append(ball);

	// 초기 포인터 위치를 계산한 이동 함수
	function moveAt(pageX, pageY){
		ball.style.left = pageX - shiftX + 'px';
		ball.style.top = pageY - shiftY + 'px';		
	}

	// 마우스 이동 이벤트 함수
	function onMouseMove(event){
		moveAt(event.pageX, event.pageY);
	}

	// 마우스 이동 이벤트 발생
	document.addEventListener('mousemove', onMouseMove);

	// 드래그 종료
	ball.onmouseup = function(){
		document.removeEventListener('mousemove', onMouseMove);
		ball.onmouseup = null;
	};
};

// 불필요한 브라우저 기본 드래그 이벤트 제거
ball.ondragstart = function(){
	return false;
}
```

- DND를 사용할 경우 드래그 가능한 요소를 드롭 가능한 위치에 이동해야함
>이 때 이미 한 요소를 드래그 중이므로 드롭 가능한 위치에 `mouseover/up` 이벤트가 발생하지 않음
>`document.elementFromPoint` 메서드는 가장 많이 중첩된 요소(최하위 요소)를 반환
>윈도우 밖에서는 `null`을 반환하므로 주의
```
...
// hidden 프로퍼티를 잠시 설정하여 공 아래의 요소(body)를 반환 후 해제
ball.hidden = true;
let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
ball.hidden = false;
```

- 슬라이더 구현
```
  <script>
    let thumb = slider.querySelector('.thumb');

	// 드래그 이벤트 시작
    thumb.onmousedown = function(event) {
      event.preventDefault();
  
      let shiftX = event.clientX - thumb.getBoundingClientRect().left;

	  // 마우스 이동 및 드래그 종료 이벤트 호출
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

        if (newLeft < 0) {
          newLeft = 0;
        }

        let rightEdge = slider.offsetWidth - thumb.offsetWidth;

        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }
        
        thumb.style.left = newLeft + 'px';
      }

      function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      }
    };

	// 불필요 이벤트 제거
    thumb.ondragstart = function() {
      return false;
    };
  </script>
```

## 1-5 선택적 이벤트 막기

- 드래그나 더블클릭시 글자가 선택되는 뷸쾌한 경험을 막기 위한 방법이 존재

1. 해당 이벤트 프로퍼티 값 `false`로 설정
```
onmousedown = "return false"
```

---
# 2. 포인터 이벤트

- 마우스, 펜, 터치스크린과 같은 다양한 포인팅 장치의 입력을 처리하는 현대적인 이벤트
>마우스 이벤트만 있던 예전과 달리 터치 장치를 사용하는 기기의 등장으로 터치 이벤트가 도입됨
>하지만 터치와 마우스 이벤트를 따로 작성하는 것의 불편함이 발생, 이를 해결하기 위해 포인터 이벤트가 도입

- 현재 [포인터 이벤트 레벨2](https://www.w3.org/TR/pointerevents2/)단계의 경우 모든 주요 브라우저에서 지원 가능

## 2-1 포인터 이벤트 유형


|포인터 이벤트|유사한 마우스 이벤트|
|---|---|
|`pointerdown`|`mousedown`|
|`pointerup`|`mouseup`|
|`pointermove`|`mousemove`|
|`pointerover`|`mouseover`|
|`pointerout`|`mouseout`|
|`pointerenter`|`mouseenter`|
|`pointerleave`|`mouseleave`|
|`pointercancel`|-|
|`gotpointercapture`|-|
|`lostpointercapture`|-|

## 2-2 포인터 이벤트 속성

- `clientX/Y`
- `target`
- `pointerId` : 이벤트 발생시키는 포인터 ID
- `pointerType` : 포인팅 장치 유형(mouse, pen, touch) 중 하나의 문자열
- `isPrimary` : 멀티 터치시 첫 번째 손가락
- `width/height` : 포인터가 장치에 닿는 영역의 너비/높이(마우스의 경우 항상 1)
- `pressure` : 포인터 압력(`0 ~ 1 사이` , 마우스의 경우 0 또는 0.5)
- `tangentialPressure` : 정규화된 접선 압력
- `tiltX`, `tiltY`, `twist` : 펜 관련 속성

> 대부분의 장치에서 이러한 프로퍼티는 지원하지 않음
> [명세서](https://w3c.github.io/pointerevents/#pointerevent-interface)


## 2-3 멀티 터치

- `pointerId, isPrimary` 프로퍼티를 사용하여 멀티 터치 관련 수행 가능
```
// 첫 번째 터치된 손가락
isPrimary = true, pointerId = 1

// 두 번째 터치된 손가락
isPrimary = false, pointerId = 2
```

## 2-4 포인터 취소

- 포인터 장치가 물리적으로 비활성화된 경우, 장치 방향이 변경된 경우 등에서 포인터 이벤트가 중단
- 브라우저에서 DND 작업 수행시 이벤트를 하이재킹하여 포인터 이벤트 취소(`pointercancel`)
>이를 방지하기 위해서 CSS 에서 `touch-action : none` 을 설정가능
```
<script>
  ball.ondragstart = () => false
</script>

<style>
  #ball{
    touch-action : none;
  }
</style>
```

## 2-5 포인터 캡처

- `elem.setPointerCapture(pointerId)` :  특정 이벤트를 `pointerId`에 맞춰 바인딩하는 메서드
> `pointerup, pointercancel` 이벤트 발생시, `elem` 요소 삭제시
> `elem.releasePointerCapture(pointerId)` 호출시 바인딩 제거
```
// 슬라이더 포인터 이벤트 구현
thumb.onpointerdown = function(event){
	//해당 pointerId에만 포인터 이벤트를 바인딩
	//따라서 thumb가 아닌 문서 어딘가에서 포인트 이벤트가 발생하여도 슬라이더는 움직이지 않음
	thumb.setPointerCapture(event.pointerId);
}

thumb.onpointermove = function(event){
	...
}

// pointerup 이벤트 발생시 자동으로 이벤트 바인딩 해제
```

- `gotpointercapture` : `setPointerCapture` 메서드 호출시 생성되는 관련 이벤트
- `lostpointercapture` : 포인터 캡처 종료시 생성되는 이벤트(`releasePointerCapture, pointerup/cancel`)

---
# 3. 키보드 이벤트

- 키보드 이벤트는 가상키보드 액션을 포함
- 현재 장치들은 다양한 입력 방식이 존재(음성인식, copy/paste 등) 따라서 다양한 입력 방식에 대한 처리 필요

## 3-1 keydown / keyup

- 키보드 입력 이벤트
- 아래 프로퍼티를 지님
	- `code` : 물리적으로 입력된 키보드 값(소문자 z, 대문자 Z 구분 없음)
	- `key` : 실제 동작하는 키보드 값(대소문자 구분)
- `Fn` 키의 경우 키보드 이벤트가 없음

|Key|`event.key`|`event.code`|
|---|---|---|
|Z|`z` (lowercase)|`KeyZ`|
|Shift+Z|`Z` (uppercase)|`KeyZ`|

```
// 문자 키
Key<letter> // KeyA, KeyB ...

// 숫자 키
Digit<number> // Digit1 ...

// 특수 키
Backspace, Enter, Tab, F1 ...

// Shitft 처럼 두 개의 버튼 존재시 정확히 구분되는 프로퍼티 존재
ShiftRight, ShiftLeft
```

### 3-1-1 물리적 키 위치 code, 레이아웃 키 위치 key

- 국가별로 같은 키보드 위치에 다른 키가 배치되어있음
>미국에서 `Z`가 할당된 위치는 독일의 경우, `Y`가 배치되어있음

![[keyboard.PNG]]

- 명세서에 기반하여`event.code === 'KeyZ'`에 해당하는 미국 키보드 입력은 `Z`이지만 독일의 경우 `Y`
>실제 키보드 위치에 따라 값이 결정됨, 특수 키는 해당 없음

- `event.key`의 경우 실제 입력 값에 따라 감(미국과 독일이 동일하게 `Z` 입력시)

## 3-2 자동 반복

- 키를 오랫동안 누르고 있을 경우 자동 반복이 시작됨
>`keydown` 이벤트가 계속 발생되며 `event.repeat = true` 프로퍼티 설정

## 3-3 기본 동작

- `keydown` 이벤트에서 `event.key` 값을 제한하여 키보드 동작을 제어할 수 있음
- 단, OS-based의 특수 키는 자바스크립트로 동작 제어 불가능
	- Alt + F4 등

## 3-4 Legacy

- `keypress, keyCode, charCode, which` 등 오래된 이벤트 객체가 존재
>브라우저 비호환성이 높기 때문에 현대에는 사용하지 않음

---
# 4. 스크롤 이벤트

- 스크롤시 `scroll` 이벤트 발생
- `pageXOffset, pageYOffest` 으로 스크롤 할 위치 제어 가능
- `scrollTo(pageXOffset, pageYOffset)

## 4-1 현재 스크롤 표시

```
window.addEventListener('scroll',()=>{
  document.getElementById('showScroll').innerHTML = windwo.pageYOffset + 'px';
})
```

## 4-2 스크롤 방지

- `onscroll` 이벤트 발생시 이미 스크롤 이벤트가 발생하였기 때문에 `event.preventDefault()`로는 방지 불가
>`pageUp/Down`과 같은 `keydown` 이벤트는 방지 가능

## 4-3 스크롤에 따른 문서 위치

```
// 문서의 높이가 2000px 이고 500px 만큼 스크롤시

// 문서 상단의 위치
document.documentElement.getBoundingClientRect().top = -500

// 문서 하단의 위치
// 문서 하단의 위치는 0 이 절대로 될 수 없음
document.documentElement.getBoundingClientRect().top = 1500

```

## 4-4 주문형 이미지 출력

```
  // 모든 이미지를 placeholder 이미지로 설정 후 스크롤이 해당 요소에 위치하면 data-src 이미지로 변경
  // 모바일 트래픽 향상 효과
  <figure>
    <img 
      src="placeholder.svg" 
      data-src="https://en.js.cx/clipart/solar/neptune.jpg" 
      width="390" height="390">
  </figure>

  <script>
    // 해당 요소가 보이는지 체크하는 함수
    function isVisible(elem) {
      // 요소의 위치
      let coords = elem.getBoundingClientRect();

	  // 문서의 높이
      let windowHeight = document.documentElement.clientHeight;

	  // 요소가 보이는지 체크
	  let topVisible = coords.top > 0 && coords.top < windowHeight;
      let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

      return topVisible || bottomVisible;
    }

	// 이미지를 교체하는 함수
    function showVisible() {
      for (let img of document.querySelectorAll('img')) {
      
        let realSrc = img.dataset.src;

        if (!realSrc) continue;

        if (isVisible(img)) {
          // disable caching
          // this line should be removed in production code
          realSrc += '?nocache=' + Math.random();

          img.src = realSrc;
          img.dataset.src = '';
        }
      }
    }

    window.addEventListener('scroll', showVisible);
    showVisible();	
  </script>
```

---
#UIevent #DND #keydown #mouseenter