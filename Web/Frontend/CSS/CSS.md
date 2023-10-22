
```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. 문법 및 스타일 적용

## 1-1 형식

- 선택자이름 { 속성 : 값; }

```
body a {
	text-decoration : none;
}
```

## 1-2 적용 방법

- 내부 스타일 시트
```
<style>
	h {
		color : red;
	}
</style>
```
    
- 외부 스타일 시트
```
<link rel="stylesheet href="파일경로.css">
```

- 인라인 시트
```
<h1 style="color:red";>
```

##  1-3 적용 우선순위

- 기본 스타일 시트보다 사용자 정의 스타일이 우선
- 단계적 적용(마지막 스타일만 적용)
- 개별성 규칙

| 선택자           | 예시 | 점수 |
|-----------------|------|-----|
| 전체 선택자      | * |0|
| 태그 선택자      | div, p, h1 |1|
| 가상 요소 선택자 | ::before |1|
| 클래스 선택자    | .box |10|
| 가상 클래스 선택자 | :hover |10|
| 아이디 선택자    | `#title` |100|
| 인라인 스타일    | style="color:red" | 1000 |
| !important      | color:blue !important; | 10000|


## 1-4 단위 및 색상

### 1-4-1 단위

- 절대 단위
	- px(pixel)

- 상대 단위 
	- % : 상위 요소값의 상대적 크기
	- em : 부모요소 텍스트에 대한 상대적 크기
	- rem : html 태그에 대한 상대적 크기 
		- 16px = 1rem 
	- vw : 뷰포트 너비에 대한 상대적 크기
	- vh : 뷰포트 높이에 대한 상대적 크기

### 1-4-2 색상

- rgba (red, green, blue, alpha)
- HEX (`#RRGGBB`)

---
# 2. 선택자

## 2-1 전체 선택자

```
* {
	/* code */
}
```

## 2-2 태그 선택자

```
태그명 {
	/* code */
}

```
 
## 2- 3 아이디 선택자

```
#id속성이름 {
	/* code */
}

```

## 2-4 클래스 선택자

```
.class이름 {
	/* code */
}
 
```
      
## 2-5 기본 속성 선택자

```
[속성=값]{
	/* code */
}
```

* 아이디, 태그 선택자와 함께 사용가능
* 값에는 문자열이 올 수 있음

## 2-6 조합 선택자

- 그룹 선택자
```
선택자1, 선택자2, ... {
	/* code */
}
```

- 자식 선택자
```
부모 선택자 > 자식 선택자 {
	/* code */
}
```

- 하위 선택자
```
선택자1 선택자2 ... {
	/* code */
}
```

- 인접 형제 선택자
```
이전 선택자 + 대상 선택자 {
	/* code */
}
```

- 일반 형제 선택자
```
이전 선택자 ~ 대상 선택자 {
	/* code */
}
```

## 2-7 가상 요소 선택자

* 종류
	- ::before : 콘텐츠 앞의 공간
	- ::after : 콘텐츠 뒤의 공간
```
기준 선택자 :: 가상 요소 선택자 {
	/* code */
}

```
 
## 2-8 가상 클래스 선택자    

* 종류
	- 링크
		- `:link` : 한번도 방문하지 않은 링크일 때
		- `:visited` : 한 번 이상 방문한 링크일 때
	- 동적
		-`:hover` : 요소에 마우스를 올릴 때
		- `:active` : 요소를 마우스로 클릭하는 동안
	- 입력
		- `:focus` : 입력 요소(input, textarea)에 커서 활성화시
		- `:checked` : 체크박스 표시될 경우
		- `:disabled` : 상호작용 요소 비활성화시
		- `:enabled` : 상호작용 요소 활성화시
	- 구조적 가상클래스
		- 자식 기준
			- `E:first-child` : 첫 번째 자식 요소
			- `E:last-child` : 마지막 자식 요소
			- `E:nth-child(n)`` : E 요소가 부모 요소의 n번째 자식일 때
				- `E:nth-child(2n)` : E 요소가 부모의 짝수 번째 자식 
			- `E:nth-last-child(n)` : E 요소가 부모 요소의 뒤에서부터 n번째 자식일 때
		- 부모 기준
			- `E:first-of-type` : 부모의 첫 번째 자식 요소
			- `E:last-of-type` : 부모의 마지막 자식 요소
			- `E:nth-of-type` : 부모 요소의 n번째 자식 요소
			- `E:nth-of-last-type` : 부모 요소의 뒤에서부터 n번째 자식 요소
```
기준 선택자 : 가상 클래스 선택자 {
	/* code */
}  
```

---
# 3. 폰트 사용하기

## 3-1 텍스트 폰트

- Google Font 등 웹 폰트를 제공하는 사이트에서 @import 하여 사용

## 3-2 아이콘 폰트

- Font Awesome 등 아이콘을 제공하는 사이트에서 라이브러리를 다운받거나
>  CDNJS 방식으로 연결 후 아이콘 `<i class>` 를 복사하여 HTML에 붙여넣음

---
# 4. CSS 박스모델

![[css-box-model.png]]

## 4-1 margin 

- 블록 외부 여백
* 형식
	- `margin-top/right/bottom/left`
	- `margin : <top> <right> <bottom> <left>`
			   `<top & bottom> <right & left>`
			  `< top & right & bottom & left>`

* `margin collapse` : 인접 margin 중 더 큰 값으로 통일
* `margin : auto` 일 경우 뷰포트 기준 요소를 센터로 정렬

## 4-2 border 

- 테두리
* 형식
	- `border : <width> <style> <color>`
		- style 속성
			* `none`
			* `hidden`
			* `solid`
			* `double`
			* `dotted`
			* `dashed`
			* `groove`
			* `ridge`
			* `inset`
			* `outset`

## 4-3 padding 

- 요소 내부 여백
* margin 과 형식 동일

## 4-4 content 

- 태그 사이에 작성된 내용
* 형식
	- `width / height`

### 4-4-1 width / height 특징

- 박스 모델 내 콘텐츠가 없으면 width/height 제대로 적용 X
>웹 브라우저가 화면을 렌더링할 때 border + padding + content 영역의
>모든 너비와 높이를 종합적 계산하여 블록에 할당
>따라서 다음 속성을 사용
- `box-sizing` : <속성>
	* 속성
		- `content-box`
		- `border-box` : border 너비/높이에 맞게 컨텐츠 영역 조절

## 4-5 박스 모델의 성격

- `block` : 항상 페이지의 모든 너비를 차지 (줄 바꿈)
	- 적용 가능 속성 : width/height, margin/padding
		* `<hn>`, `<p>`, `<div>`

- `inline` : 너비를 콘텐츠 크기만큼 차지
	- 적용 가능 속성 : margin/padding 의 왼쪽,오른쪽 방향
		* `<a>`, `<span>`, `<strong>`, `button`

- `inline-block` : 너비를 콘텐츠 크기만큼 차지 + 블록의 성격(width/height 적용)
	-  `<img>`

### 4-5-1 박스 모델 성격 변경

* 박스 모델의 성격은 다음 속성으로 변경 가능
- `display: <속성>`
	* 속성
		- `block`
		- `inline`
		- `inline-block`

---
>[[Frontend]]
#css