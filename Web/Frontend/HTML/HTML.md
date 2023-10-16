```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 0. 역사

| version   | year | contents |
|-----------|------|----------|
| HTML 1.0  | 1991 |팀 버나스리(Tim Berners-Lee)가 발표한 최초의 HTML|
| HTML 2.0  | 1995 |국제 표준으로 제정된 최초의 HTML|
| HTML 3.2  | 1997 |W3C에 의해 제정된 최초의 HTML|
| HTML 4.01 | 1999 |Stylesheet 지원|
| XHTML 1.0 | 2000 |확장성 있는 HTML+XML|
| HTML 5    | 2014 |간결한 코드|

---
# 1. 특징

- HTML : HyperText Markup Language 의 약자, 태그와 속성으로 구성

## 1-1 태그

- HTML 문법을 이루는 가장 작은 단위, 요소(element)와 같은 의미
>홑화살괄호(<>) 사이 태그명 입력
>시작 태그(<>), 종료 태그(`</>`)의 한 쌍으로 구성
>시작태그에는 속성명과 속성 값이 올 수 있음

* 빈 태그(Empty Tag) : 시작 태그만 가짐
>`<img>`,`<br>`,`<hr>` `...`

## 1-2 속성

- 태그의 의미나 기능을 보충 (속성명은 소문자 권장)
>class : 같은 유형의 태그를 분류 (CSS .)
>id : 태그에 유일한 이름 지정, 단 하나의 요소에만 지정 (CSS #, 우선적용)

## 1-3 상속

-  태그 위치에 따라 부모, 자식 형제 관계가 형성되며 CSS에 영향을 미침

## 1-4 콘텐츠 레벨 요소

- 블록 : 부모 요소의 전체 공간을 차지
- 인라인 : 콘텐츠의 흐름을 끊지 않고, 요소를 구성하는 태그에 할당된 공간만 차지

---
# 2. Doctype

- 문서형 정의(Document Type Definition)

## 2-1 사용 목적

- 다양한 브라우저가 HTML 문서를 동일하게 인식하기 위함
- 문서간 호환성 향상
- 미 기입시 Quirks Mode(비표준모드) 상태로 렌더링

## 2-2 DOCTYPE 선언

### 2-2-1 HTML 4.01(Legacy)

-  SGML 기반으로 DTD 참조 필요

```
1. 최상위 엘리먼트 네임 (Root Element Name) 
	* HTML
2. 국제적,공용 || 내부적,제한용 (Public || SYSTEM)
	* Public
3. ISO공인인증기관 || ISO비공인인증기관 ("+" || "-")
4. 기관명
	*  W3C : 비공인 인증기관
5. DTD 타입
	- Strict : W3C 권장 문서 타입 (문법을 정확하게 준수하지 않으면 오류)
		* center, iframe, 새창 띄우기 등 제한
	- Transitional : 호환성 위한 중간단계 문서 타입 (문법에 오류가 있어도 허용)
	- Frameset : Frameset 사용을 위한 태그,속성 추가한 문서 타입 (현재 거의 사용 X)
6. 인코딩언어(ISO)
7. DTD 참조 문서
```


### 2-2-2 HTML 5

- 최소한의 코드 작성 기반

```
<!DOCTYPE html> 
<html>
  <head> : 메타데이터 정의 영역
	<meta> : 항상 head 내부 위치
	  속성
		- charset : 인코딩 방식 명시 (HTML5에서 추가된 속성)
			* UTF-8
		- content : name/http-equiv 속성 관련 값
		- http-equiv : Http 헤더 제공, 반드시 content 속성이 함께 명시되어야 함
			* content-type : 인코딩 방식
			* default-style : 우선 적용 스타일 시트
			* refresh : 문서 새로고침 간격(리다이렉트)
			* X-UA-Compatible : 최신 표준엔진 렌더링
		- name :
			* application-name : 웹 어플리케이션 이름 정의
			* author : 문서 저자 정의
			* description : 웹 페이지 설명
			* generator : 저작 도구
			* keywords : 검색 엔진 키워드
			* viewport : 뷰포트 설정
				content
					* user-scalable=no : 사용자의 확대보기 허용 여부(yes/no)
					* intial-scale=1.0 : 페이지 로딩시 확대비율
					* maximum-scale=1.0 : 최대 확대 비율
					* minimum-scale=1.0 : 최소 축소 비율
					* width=device-width : 플랫폼 가로 크기에 맞춤
					* target-densitydpi=medium-dpi : dpi([dots per inch])
			* HTML5 미지원 속성
				- scheme : content 속성 해석 스키마 

	<title> : HTML 문서 제목 지정 (존재하지 않을 경우 HTML 유효성 검사 통과 X)
			* title이 여러개 일 경우 검색엔진 신뢰성 하락
			* 툴바, 즐겨찾기, 결과페이지 제목

	<link> : 외부 소스 관계 정의
	  속성
		- crossorigin : CORS 요청 처리방식
			* anonymous : 인증정보 전송 X
			* use-credentials : 인증정보(쿠키, X.609 인증서, HTTP Basic 인증) 전송
		- href : 외부 URL
		- media : 미디어, 장치
		- type : 미디어 타입
		- rel : 필수속성, 외부 리소스 연관 관계 명시
			* alternate : 해당 문서의 대체 버전 링크
			* author : 문서의 저자
			* dns-prefetch : DNS 확인 작업 미리 수행
			* help : 도움말
			* icon : 아이콘
			* license : 저작권 정보
			* next : 다음문서 링크
			* pingback : 핑백서버 주소
			* preconnect : 브라우저가 대상 리소스 원본에 미리 연결
			* prefetch : 브라우저가 대상 리소스를 미리 캐시 (비표준)
			* preload/preload : 탐색에 사용될 리소스 미리 캐시 (preload : 우선순위 적용)
				* as : 콘텐츠 유형 지정
			* prev : 이전문서 링크
			* search : 검색 리소스
			* stylesheet : 스타일시트 (CSS)
		- sizes : rel="icon"일 경우 크기 설정
			* 높이 x 너비
			* any
		* HTML5 미지원 속성
			- charset
			- rev
			- target

	<style> : HTML 문서 스타일 정보 정의 (CSS)
	  속성
		- media
		- type

	<script> : 클라이언트 사이드 스크립트 정의 (JavaScript)
	  속성
		* 외부 스크립트 참조시 사용가능
			- async : 비동기 실행 (HTML 5 추가)
			- charset : 인코딩 방식
			- defer : 페이징 파싱 후 스크립트 실행
		- scr : 외부 스크립트 파일 URL
		- type : 미디어 타입
		* HTML5 미지원 속성
			-xml:space
	</head>

	<body> : HTML 모든 컨텐츠 영역 정의, 단 하나만 존재 가능
	  * HTML5에서는 body의 모든 속성을 지원하지 않음
		-alink
		-background
		-bgcolor
		-link
		-text
		-vlink
	</body>
</html>
```

## 2-3 Doctype 선언 종류

### 2-3-1  Legacy

- HTML 4.01 Strict
```
 <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

-  HTML 4.01 Transitional
```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

-  HTML 4.01 Frameset
```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" http://www.w3.org/TR/html4/frameset.dtd">
```

-  XHTML 1.0 Strict
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

- XHTML 1.0 Transitional
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

- XHTML 1.0 Frameset
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

- XHTML 1.1
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
```

### 2-3-2 HTML5

- HTML5
```
<!DOCTYPE html>
```


---
>[[Frontend]]
#HTML