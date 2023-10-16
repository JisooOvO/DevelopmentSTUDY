```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. 텍스트

## 1-1 h 

- 제목, 주제 텍스트 표현

- `<h1>` ~ `<h6>` 순으로 중요도 설정
>검색엔진의 경우 `<h1>`부터 단계적으로 검색하며 중간 단계가 없을 경우 검색종료
>따라서 숫자를 순차적으로 사용해야함

```
<h1>Title</h1>
```

## 1-2 p 

- 본문의 문단
```
<p>Hello</p>
```
## 1-3 br

- 줄 바꿈
```
<br/>
```

## 1-4 strong

- 텍스트 의미 강조, 중첩 가능
```
<strong>찐한 글자</strong>
```

## 1-5 em

- 글자 기울임
```
<em>기울여짐</em>
```

## 1-6 ins

 - 밑줄
```
<ins>밑줄</ins>
```

## 1-7 del

- 취소선
```
<del>취소</del>
```

## 1-8 sub

- 아래 첨자
```
<sub>2</sub>
```
## 1-9 sup

- 위 첨자
```
<sup>e</sup>
```

## 1-10 인용구

### 1-10-1 blockquote

- 출처에서 인용한 텍스트

### 1-10-2 q

- 짧은 인용문

* 속성
>cite : 출처 경로

---
# 2. 그룹

## 2.1 div

- 블록 요소 그룹
```
<div><p>글자</p></div>
```
## 2.2 span

- 인라인 요소 그룹
```
<span><strong>예스</strong></span>
```

---
# 3. 목록

## 3-1 ul 

- 비순서형 목록
> li : 목록 내용

## 3-2 ol

- 순서형 목록
> li : 목록 내용

## 3-3 dl

- 정의형 목록
> dt :용어
> dd :용어 설명

---
# 4. 링크와 이미지

## 4-1 a

- 링크 생성
	* 속성
		- `href` : 경로
			* 불분명한 경로시 href="#"
		- `target` : 연결 방식
			- `_blank` : 새 창으로 열림
			- `_parent`
			- `_self`
			- `_top`
		- `title` : 링크 설명

## 4-2 img

- 이미지 객체 삽입
	* 속성
		- `src` : 이미지 경로
			* 경로 기준 (상대 경로)
				- `./` : 현재 폴더
				- `../` : 상위 폴더
		- `alt` : 이미지 설명
			* 웹 접근성 보장

---
# 5 폼

## 5-1 form

-  폼 양식
	* 속성
		- `action` : 상호작용할 서버 URL
		- `method` : 송신 방식
			* `get` : 보안 요구 X
			* `post` : 보안 요구 정보

## 5-2 input

- 사용자 입력 정보(id,password) 요소 생성
	* 속성
		- `type` : 상호작용 요소 종류, 필수 속성
			* `text`
			* `password`
			* `tel`
			* `number`
			* `url`
			* `search`
			* `email`
			* `checkbox`
			* `radio` : 라디오 박스
			* `file` : 파일 업로드
			* `button`
			* `image` : 이미지 버튼, src 속성 사용
			* `hidden`
			* `date`
			* `datetime-local`
			* `month`
			* `week`
			* `time`
			* `range`
			* `color`
			* `submit`
			* `reset`
		- `name` : 서버에 전송될 요소의 이름
		- `value` : 초깃값

## 5-3 textarea

- 여러 줄의 입력 요소
* 콘텐츠 영역에 초깃값 정의

## 5-4 label

- 상호작용 요소에 이름 생성
* 스크린 리더기 식별 능력 향상 -> 웹 접근성 향상
	* 속성
		- `for` : 이름
		- label for 속성과 input id 이름을 같은 값으로 설정

## 5-5 fieldset

- 박스 모양의 테두리 생성

## 5-6 legend

- 그룹 이름

## 5-7 select

- 콤보박스 생성
	* 속성
		- `size` : 화면 노출 항목 개수
		- `multiple` : 다중 선택
		- `selected` : 기본 선택 항목

### 5-7-1 optgroup

- 항목 그룹화

### 5-7-2 option

- 항목
	* 속성
		- `value` : 서버에 전송할 값, 미입력시 텍스트 값 전송

## 5-8 button

- 버튼 생성
* input 과 달리 이미지, 태그 포함 가능
	* 속성
		- `type` 
			* `submit`
			* `reset`
			* `button`

## 5-9 추가 속성

- `disabled` : 비활성화
- `readonly` : 읽기 전용 (서버에 값 전송)
- `maxlength` : 입력 글자 수 제한
- `checked` : 요소를 선택된 상태로 표시(checkbox, radio)
- `placeholder` : 입력 요소의 힌트
- `required` : 반드시 입력이 존재해야 함

---

# 6. 표(table)

### 6-1 caption

- 표 제목

## 6-2 col

- 1개의 열 그룹화
* 속성
	- `rowspan / colspan` : 셀 병합, 값 = 병합할 셀 개수
	- `scope` : 웹 접근성 향상
		* `row / col`
		* `rowgroup / colgroup`

## 6-3 colgroup

- 2개 이상의 열 그룹화

## 6-4 thead, tbody,  tfoot

- 웹 접근성 향상 목적의 시맨틱

### 6-4-1 tr

- 테이블의 행

### 6-4-2 th

- 테이블 의 열

---
# 7. 멀티미디어

## 7-1 audio

```
<audio>
	<source src="#" type="audio/wav">
	<source src="#" type="audio/mp3">
	...
```

## 7-2 video

```
<video>
	<source>
```

* 속성
	- `src` : 비디오 url
	- `type` : 미디어 타입
		* 웹 지원 형식을 설정 가능 => 웹 접근성 향상
	- `controls` : 컨트롤 패널

---
# 8. 시맨틱 태그

- 검색 엔진에 맞춰 웹 구조화
- `<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<main>` 등이 시맨틱 태그 

---

# 9. 태그 글로벌 속성

- 모든 태그에서 사용가능한 속성
	- `class`
	- `id`
	- `style`
	- `title` : 추가 정보 (커서를 대면 툴팁 정보 표시)
	- `lang`
	- `hidden` : 화면에서 감춤
	- `data-*` : 커스텀 속성

---
>[[HTML]]
#HTMLtag