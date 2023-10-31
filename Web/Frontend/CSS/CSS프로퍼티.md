```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---

# 1. 텍스트

## 1-1 폰트

- `font-family : <글꼴1>, <글꼴 유형>`
	* 글꼴 유형 : 글꼴을 불러오지 못 할 경우 텍스트가 해당 형태로 나타남 => 사용자 경험 유지
		- `serif`
		- `sans-serif`
		- `monospace`
		- `fantasy`
		- `cursive`
- `font-size : <크기> [초기 값=16px]`
- `font-weight : <굵기 숫자(100~900)> | <키워드>`
	* 키워드
		- `lighther`
		- `normal : 400`
		- `bold : 700`
		- `bolder`
- `font-style : <글꼴 속성>`
	* 속성
		- `normal`
		- `italic : 이탤릭체`
		- `oblique : 기울임꼴`
- `font-variant : <속성>`
	* 속성
		- `normal`
		- `small-caps` : 텍스트를 크기가 작은 대문자로 변환
    
## 1-2 스타일

- `text-align : <속성>`
	* 속성
		- `left / center / right`
		- `justify` : 양쪽 정렬(브라우저 크기에 맞춰 텍스트 사이 간격 늘림)
- `text-decoration : <속성>` : 텍스트에 줄 넣기
	* 속성
		- `none`
		- `line-through`
		- `overline / underline`
		- 
- `letter-spacing : <자간>`
- `line-height : <텍스트 높이>`
- `white-space : <속성>`  : 텍스트 줄 바꿈 설정
	- 속성
		- `normal
		- `nowrap` : 자동으로 줄 바꿈 X
- `text-overflow : <속성>` : 텍스트가 콘텐츠를 넘어갈 경우
	- 속성
		- `clip`
		- `ellipsis` : 넘어가는 부분 `...`으로 처리
- `overflow : <속성>` : 콘텐츠가 부모요소를 넘어가 경우 처리 방법
	- 속성
		 -`visible` : 컨텐츠가 부모요소에서 넘쳐 출력
		 -`hidden` : 컨텐츠가 부모요소를 넘어가지 못함, 넘칠 경우 컨텐츠 아래쪽이 보이게 출력
		 -`clip`: 컨텐츠가 부모요소를 넘어가지 못함, 넘칠 경우 컨텐츠 위쪽이 보이게 출력
		 -`scroll` : 부모요소에 스크롤 기능이 생김
		 -`auto`

---

# 2. 배경 (padding/content)
 
- `background-color : <색상값>`
- `background-image : url('이미지 경로')`
	* 반드시 배경 너비/높이 지정
	* 이미지 사이즈와 너비/높이가 다를 경우 잘리거나 반복됨
- `background-repeat : <속성>`
	* 속성
		- `no-repeat`
		- `repeat-x`
		- `repeat-y`
		- `repeat`
		- `round` : 이미지 크기 자동 조절
		- `space` : 이미지 잘리지 않음
- `background-size : <속성>`
	* 속성
		- `auto` : 이미지 크기 유지
		- `cover` : 이미지 종횡비 유지하며 크기 조절(배경 크기에 딱 맞게)
		- `contain` : 이미지 종횡비 유지하며 크기 조절, 
			- 가로 세로중 한 방향이 맞으면 멈춤, 못 채운 부분 반복
		- `width/height`
- `background-position : <x> <y>`
	* 속성
		- `<x> : left / center / right`
		- `<y> : top / center / bottom`
		- `px, %`
- `background-attachment : <속성>` : 이미지 스크롤 형식
	* 속성
		- `local` : 웹 브라우저와 함께 스크롤
		- `scroll` : 요소 고정, 브라우저 스크롤
		- `fixed` : 요소, 브라우저 고정

---

# 3. 위치

- `position : <속성>`
	* 속성
		- `static` : 기본 흐름
		- `relative` : 기본 흐름 따라 배치하지만 좌표 속성 사용
			* `top / right / bottom / left`
		- `absolute` : 절대 좌표 위치
			* `top / bottom` 속성 미 지정시 원래 위치에서 x축으로만 이동
			* 원래 요소의 공간을 빈 공간으로 인식
		- `fixed` : 뷰포트 기준 절대 좌표 위치
		- `sticky` : 일정 좌표까지 기본흐름 이후 fixed

- `z-index : <정수>`
	* 정수 값이 클 수록 위에 표시
	* z-index가 지정된 요소간에만 적용

---
# 4. 레이아웃

## 4-1 float 

- 대상 요소를 공중에 띄움(인라인 성격), 대상의 위치를 빈 공간으로 인식

- `float : <속성>`
	* 속성
		- `none`
		- `left / right`
	* width 미 지정시 콘텐츠 만큼 너비 조절
	* float 으로 지정된 자식 요소는 부모 요소가 인식 X

- `clear : <속성>` : 이전 요소의 float 속성 해제
	* 속성
		- `left / right / both`
	* 부모 요소가 float 자식 요소를 인식하는 법
```
.container::after{
	content: "";
	display: block;
	clear: both;
}
```

## 4-2 flex 

- 1차원 방식 레이아웃

### 4-2-1 flex layout

- `display : flex`
	* flex 선언된 블록 컨텐츠의 정렬은 다음과 같음
		- `justify-content: center` : 가로방향 정렬
		- `align-items: center` 세로방향 정렬
		* flex 아닌 경우 -> `margin : auto` 등으로 적용가능
		* flex 는 1 줄에 몇 개의 content 가 오는 것을 정의 X

- `flex-direction : <속성>`
	* 속성
		- `row` : 왼쪽 -> 오른쪽
		- `row-reverse` : 오른쪽 -> 왼쪽
		- `column` : 위 -> 아래
		- `coloumn-reverse` : 아래 -> 위

- `flex-flow : <direction> <wrap>`
	- direction과 wrap을 동시에 지정

- `flex-grow : 숫자` : flex container 내 아이템이 할당 가능한 공간의 정도
- `flex-shrink : 숫자` : flex item이 container보다 클 때 아이템 크기가 축소( 0일때 축소 X)
	- 기본값 1이므로 미설정시 자동으로 콘테이너 크기에 맞게 아이템 크기 조절
- `flex-basis : 숫자` : 아이템의 초기 크기
	- 값이 `auto`가 아닌경우 `width`보다 우선순위가 높음
	- `content` 를 값으로 설정 가능
- `flex : <grow> <shrink> <basis>` : 3가지 프로퍼티를 동시에 설정 가능

- `flex-wrap : <속성>` : 플렉스 아이템이 컨테이너를 벗어날 경우 설정
	* 속성
		- `nowrap` : 컨테이너 뚫고 나감, 기본 값
		- `wrap` : 영역을 벗어나면 줄 바꿈
		- `wrap-reverse` : wrap의 역 방향으로 줄 바꿈(기본 값일 때 위로 줄이 올라감)
### 4-2-2 flex layout 정렬

- `justify-content : <속성>` : 주 축 방향 정렬(row)
	* 속성
		- `flex-start` : 주축 방향 시작
		- `flex-end` : 주축 방향 끝
		- `center` : 중앙
		- `space-between` : 플렉스 아이템 간격 균일(양 끝 간격 X)
		- `space-around` : 플렉스 아이템 둘레 균일 (한 아이템 양쪽 둘레 균일)
		- `space-evenly` : 플렉스 아이템 사이와 양 끝 간격 균일 (IE, edge 동작 X)

- `align-items : <속성>` : 교차 축 방향 정렬 (column)
	* 속성
		- `stretch` : 교차축 방향 아이템 너비/높이가 블록 크기에 맞게 확대
		- `flex-start` 
		- `flex-end`
		- `center`
		- `baseline`

- `gap` : 플렉스 컨테이너에서 내부 컨텐츠 간격 조절

- `align-content : <속성>` : wrap 속성으로 2줄 이상일 때 사용
- `align-self : <속성>` : 단일 정렬

## 4-3 grid

- 2차원 방식 레이아웃 
- row / column 같이 사용

### 4-3-1 grid layout

- `display : grid`
	* 해당 속성 지정 요소가 그리드 컨테이너
- `grid-template-columns : <1열값> <2열값> ...`
- `grid-template-rows : <1행값> <2행값> ...`
	* 값으로 행/열의 크기 결정
	* `repeat(), minmax()` 함수 사용 가능
- `row-gap : <크기>`
- `column-gap : <크기>`

### 4-3-2 grid 정렬

- Y축 정렬
	- `align-items : <속성>` 
		* 속성
			- `stretch`
			- `start`
			- `center`
			- `end`
	- `align-self`
- X축 정렬
	- `justify-items : <속성>`
	- `justify-self`
- X, Y축 한번에 정렬
	- `place-items : <align-items> <justify-items>`
	- `place-self : <align-self> <justify-self>`

### 4-3-3 grid 배치

#### 4-3-3-1 grid 템플릿 

- `grid-template-areas : <이름>`
	* 이름 예시
```
"header header header"
"sidebar content content"
"footer footer footer"
```


- `grid-area : <행/열 이름>`
	* grid-template-area 로 정한 이름을 부여
	* 코드 예시
```
#header {
	grid-area : header
}
```

#### 4-3-3-2 grid 아이템

- 열 
	- `grid-column-start : <start grid number>`
	- `grid-column-end : <end grid number>`
		* 그리드 넘버로 구분
- 행
	- `grid-row-start`
	- `grid-row-end`
- 한 번에 설정
	- `grid-column : <start> <end> || <start>/span <열 개수>`
	- `grid-row : <start> <end> || <start>/span <행 개수>`

---
# 5. 전환효과(Transition)

-  가상 클래스 선택자 등에 의해 기존 속성 값이 변경
- `transition-property : <속성 값>` : 전환 효과
	* 속성
		- `none`
		- `all`
	* 전환 가능한 속성이 정해져 있음
- `transition-duration : <시간>` : 전환 효과 지속 시간
- `transition-delay : <지연 시간>`
- `transition-timing-function : <속성>` : 전환 효과의 진행 속도
	* 속성
		- `linear` : 일정
		- `ease` : 빨라지다가 느려짐
		- `ease-in` : 느리다가 점점 빨라짐
		- `ease-out` : 빠르다가 점점 느려짐
		- `ease-in-out` : 느리다가 빨라졌다가 느려짐
		- `cubic-bezier` : 사용자 정의 속도
			* 개발자 도구에서 속도 조절 가능

```
.heart-icon:hover{
	// 0.7배만큼 작아짐
    transform: scale(0.7);
    // transform 효과를 0.25초동안 딜레이
    transition: transform 0.25s ease;
}
```

---

# 6. 애니메이션

- @keyframes 정의하여 실행
```
@keyframes <키 프레임명>{
	0%{ /* 시작 코드 */ }
	n%{}
	100%{ /* 종료 코드 */ }
}
```

```
@keyframes <키 프레임명>{ 
	from{ /* 시작 코드 */ }
	...
	50%{ /* 중간 코드 */ }
	...
	to{ /* 종료 코드 */ }
}
```

- `animation` : 아래 모든 속성 적용 가능

- `animation-name : <키 프레임명>`

- `animation-duration : <지속 시간>`
	* `keyframes, animation-name, animation-duration`은 필수 (없으면 동작 X)

- `animation-delay : <지연 시간>`

- `animation-fill-mode : <속성>` : 애니메이션 종료 시점의 상태 설정
	* 속성
		- `none` : 
			- 실행 전 : 시작 지점 스타일 적용X 대기
			- 실행 후 : 실행 전 스타일 적용 상태로 돌아감
		- `forwards` :
			- 실행 전 : 시작 지점 스타일 적용X 대기
			- 실행 후 : 종료 지점 스타일 적용 상태로 대기
		- `backwards`
			- 실행 전 : 시작 지점 스타일 적용O 대기
			- 실행 후 : 실행 전 스타일 적용 상태로 돌아감
		- `both`
			- 실행 전 : 시작 지점 스타일 적용O 대기
			- 실행 후 : 종료 지점 스타일 적용 상태로 대기

- `animation-play-state : <속성>` : 애니메이션 재생 상태 지정 (실행 도중 조작 가능 with JS)
	* 속성
		- `paused`
		- `running`

- `animation-diretion : <속성>` : 진행 방향
	* 속성
		- `normal` : 키 프레임 정의 순서(from -> to)
		- `reverse`
		- `alternate` : 홀수 번째 `normal`, 짝수 번째 `reverse`
		- `alternate-reverse` : 홀수 번째 `reverse`, 짝수 번째 `normal`

- `animation-timing-function` : 시간 간격

- `animation-iteration-count : <속성>` : 반복 횟수
	- 속성
		- `infinite` : 무한

## 6-1 스크롤 효과

- `scroll-behavior : <속성>` : 페이지 스크롤 동작 방식 명시. `HTML`의 CSS로 지정
	- 속성
		- `smooth` : 부드럽게 스크롤(default)
		- `auto` : 즉시 스크롤


---
# 7. 변형효과(transform)

- 요소의 크기 변경, 위치 이동, 회전

- `perspective : <거리>` : 사용자와 요소 사이의 거리
>`translateZ()`와 사용하면 Parallax Scrolling 구현

- `transform : <함수>`
	* 함수
		- `translate(x,y)` : 현 위치에서 x, y 축 만큼 이동
		- `translateX(n)`
		- `translateY(n)`
		- `translateZ(perspective)

		- `scale(x,y)` : x, y 축 만큼 확대/축소
		- `scaleX(n)`
		- `scaleY(n)`

		- `skew(xdeg, ydeg)` : x, y 각도 만큼 기울임
		- `skewX(deg)`
		- `skewY(deg)`

		- `rotate(deg)` : deg 만큼 회전
			* `deg` > 0 -> 시계방향 회전
			* `deg` < 0 -> 반시계방향 회전

- `matrix( scaleX, scaleY, skewX, skewY, translateX, translateY )` : 한번에 설정 

- 기준점 변경
	- `transform-origin : <x> <y>` : 변형 기준점 변경
		* 속성
			- `x : left / center / right`
			- `y : top / center / bottom`

	- `transfrom-box : <속성>
		- 속성
			- `content-box`
			- `border-box`
			- `fill-box` : `referenece box`를 해당 Element box로 변경
			- `stroke-box`
			- `view-box`

---
# 8. 미디어쿼리

- 반응형 웹(responsive web)을 만드는 주요 기술
> 사이트에 접속하는 미디어 타입, 특징, 해상도에 따라 다른 스타일 속성을 적용하는 기술

- 뷰포트(viewport) : 웹 페이지가 접속한 기기에서 보이는 실제 영역 크기

* HTML 문서는 어떤 기기에서 접속하더라도 980px 크기 기준으로 보여줌
>  따라서 HTML의 metadata 를 설정해야 함
```
<meta 
name="viewport
content="width=device-width,
initial-scal=1.0">
```

* 메타 content 속성 값
	- `width / height`
	- `initial-scale` : 초기 배율
	- `minimum-scale` : 최소 축소 비율 ( 기본값 = 0.25 )
	- `maximum-scale` : 최대 확대 비율 ( 기본값 = 5.0 )
	- `user-scalable` : 뷰포트 확대/축소 여부 ( yes || no )

- 문법
```
@media 
	not | only 
	- not : 뒤의 모든 조건 부정
	- only : 미디어 쿼리 지원 기기만 해석
	
	mediatype : 미디어 타입
		- all : 모든 기기 ( 기본 값 )
		- print : 인쇄 장치
		- screen : 컴퓨터 화면 장치, 스마트 기기
		- speech : 스크린 리더기, 보조 프로그램
	
	and  : mediatype 생략하지 않으면 다음에 and 연산자 필수
	
	( <media feature> ) : 미디어 조건
		- min-width : 미디어 쿼리 적용 하한값( 최소 너비 ~ )
		- max-width : 미디어 쿼리 적용 상한값( ~ 최대 너비 )
		- orientation :
			- portrait : 세로모드, 세로 높이 > 가로 너비
			- landscape : 가로모드, 가로 너비 > 세로 높이
		- width / height
		- device-width / device-height
		- resolution : 해상도

	< and | or | not > 

	( <media feature> ) {
		/* CSS 코드 */
	}
	...
```

```
@media (min-height: 680px), screen and (orientation: portrait) { ... }
```

## 8-1 스타일 방법

- Mobile first : 작은 뷰포트 우선 설계
```
#something {
	...
}

@media(min-width:680px){
	...
}
```

- Desktop first : 큰 뷰포트 우선 설계
```
#something {
	...
}

@media(max-width:680px){
	...
}
```


---
# 9. 상속

- `unset` :
>부모로부터 상속값이 존재시 상속값을, 그렇지 않으면 초기값

- `initial` :
> 브라우저가 지정한 초기값

- `inherit` :
> 부모 요소로부터 해당 속성의 계산 값 사용

- `revert` :
> 브라우저 속성이 있다면 커스텀 스타일로, 커스텀 스타일이 있다면 브라우저 기본 스타일로 변경

- `all` :
> 모든 요소에 `inital, inherit, unset, revert` 중 하나를 사용

---
# 10. filter

>다양한 그래픽 효과를 제공하는 함수 기능을 제공
>일부 브라우저는 필터 사용시 하드웨어 가속 사용

- `url()` : URL이미지 또는 SVG 필터요소에 대한 참조 
- `blur()` : 가우시안 블러를 적용, 혼합할 픽셀 수를 지정하며 높을 수록 흐려짐이 큼
- `brightness()` : 이미지의 밝기를 조절(`0%(완전히 검은색) ~ 100%(원본)`)
- `contrast()` : 이미지 대비 조절(`0%(완전히 회색) ~ 100%(원본)`)
- `drop-shadow() : <offset-x> <offset-y> <blur-radius> <color>` : 그림자 효과 적용
- `grayscale()` : 이미지 흑백 변환(`0%(원본) ~ 100%(흑백)`)
- `hue-rotate() : deg` : 이미지 색조 회전
- `invert()` : 색 반전(`0%(원본) ~ 100%(색반전)`)
- `opacity()` : 불투명도 설정(`0%(완전 투명) ~ 100%(원본)`)
- `saturate()` : 이미지 채도 변경(`0%(무채색) ~ 100%(원본)`)
- `sepia()` : 이미지를 세피아로 변환(`0%(원본) ~ 100%(세피아)`)

---
>[[CSS]]
#css