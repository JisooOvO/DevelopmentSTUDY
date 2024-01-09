```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. XML 개요
## 1-1 XML 특징
- EXtensible Markup Language의 약자로 1998년에 W3C 표준 권고안에 포함
- 다른 시스템간 다양한 종류의 데이터를 교환 가능한 다목적 마크업 언어
- 데이터를 텍스트 형식으로 저장하며 유니코드 문자로만 이루어짐
## 1-2 HTML 과 차이점
- HTML은 데이터를 보여주는 목적이지만 XML은 데이터 저장 및 전달 목적으로 만들어짐
- XML 태그는 HTML 태그처럼 미리 정의된 것이 아니라 사용자가 직접 정의할 수 있음

### 1-2-1 XML 데이터를 자바스크립트로 전달하기

```
// korean_major_cities.xml 
<?xml version="1.0" encoding="UTF-8"?>
<korean_cities>
    <city>
        <name>서울</name>
        <class>특별시</class>
    </city>
    <city>
        <name>부산</name>
        <class>광역시</class>
    </city>
    <city>
        <name>인천</name>
        <class>광역시</class>
    </city>
    <city>
        <name>대전</name>
        <class>광역시</class>
    </city>
    <city>
        <name>광주</name>
        <class>광역시</class>
    </city>
    <city>
        <name>대구</name>
        <class>광역시</class>
    </city>
    <city>
        <name>울산</name>
        <class>광역시</class>
    </city>
    <city>
        <name>수원</name>
        <class>시</class>
    </city>
    <city>
        <name>청주</name>
        <class>시</class>
    </city>
    <city>
        <name>목포</name>
        <class>시</class>
    </city>
</korean_cities>
```

```
<script>
function loadDoc() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == this.DONE) {
            displayData(xmlHttp);
        }
    };
    xmlHttp.open("GET", "/examples/media/korean_major_cities.xml", true);
    xmlHttp.send();
}

function displayData(xmlHttp) {
    var xmlObj, cityList, result, idx;
    xmlObj = xmlHttp.responseXML; // 요청한 데이터를 XML DOM 객체로 반환함.
    result = "<table><tr><th>도시 이름</th><th>행정구역</th></tr>";
    cityList = xmlObj.getElementsByTagName("city");
    for(idx = 0; idx < cityList.length; idx++) {
        result += "<tr><td>" +
            cityList[idx].getElementsByTagName("name")[0].childNodes[0].nodeValue + "</td><td>" +
            cityList[idx].getElementsByTagName("class")[0].childNodes[0].nodeValue + "</td></tr>";
    }
    result += "</table>";
    document.getElementById("text").innerHTML = result;
}
</script>

<body>
	<h1>HTML로부터 데이터 분리</h1>
	<button onclick="loadDoc()">XML 데이터 불러오기!</button>
	<p id="text"></p>
</body>
```

## 1-3 XML 구조
- HTML과 동일한 트리형태 계층 구조

```
<?xml version="1.0" encoding="UTF-8"?> // xml 문서 명시
<shop city="서울" type="마트"> // 태그의 이름으로 데이터 내용 짐작 가능
    <food>
        <name>귤</name>
        <sort>과일</sort>
        <cost>3000</cost>
    </food>
    <food>
        <name>상추</name>
        <sort>야채</sort>
        <cost>2000</cost>
    </food>
</shop>
```

## 1-4 XML 문법
### 1-4-1 프롤로그(prolog)
- XML 문서 첫 줄에 해당하는 태그

```
<?xml version="XML문서버전" encoding="문자셋" standalone="yes|no"?>
```

- `version` :  버전
- `encoding` :  문자셋 명시
- `standalone` : XML문서가 외부 소스에 의존하고 있는지 알림(`default : no`)

### 1-4-2 태그
- 모든 xml 요소는 종료 태그를 반드시 가져야하며 없을 경우 에러 발생
- 태그 이름에 대소문자를 구분하며 시작 태그와 종료 태그는 일치해야함
- 태그의 속성 값는 반드시 따옴표(`" "`)로 감싸야함
- HTML에서는 띄어쓰기를 인식하지 않으나 XML에서는 인식함

### 1-4-3 요소
- XML은 프롤로그와 요소 부분으로 나누어짐
- XML 요소는 하나 이상의 다른 요소를 포함 가능
```
<요소이름 속성="속성값" ...>텍스트</요소이름>
```

#### 1-4-1 요소 이름 규칙
- 영문자, 숫자, 하이픈(`-`), 언더스코어(`_`), 점(`.`) 허용하며 공백 포함 불가
- 영문자는 대소문자 구분
- 첫 글자는 반드시 영문자 / 언더스코어(`_`)
- 예약어 `xml, XML, Xml` 등은 사용 불가

#### 1-4-2 속성
- 요소의 추가 정보 제공
- 속성 값은 반드시 따옴표(`" "` 또는 `' '`)로 감싸야함
- 속성 이름은 하나의 요소 내에서 고유 값을 가짐

##### 1-4-2-1 요소와 속성의 차이점
- 데이터 전달 측면에서는 같은 효과
- 속성은 여러 개의 값을 가질 수 없고 확장성이 낮음
- 속성은 XML 트리에 포함되지 않아 활용도가 낮음
```
// 두 요소는 같음

1.
<student name="홍길동">
  <year>3</year>
  <major>컴퓨터공학</major>
</student>

2.
<student>
  <name>홍길동</name>
  <year>3</year>
  <major>컴퓨터공학</major>
</student>
```

### 1-4-4 엔티티
- 예약되어있는 특별한 기호
- 수 많은 엔티티가 존재하는 HTML과 달리 XML은 5개의 엔티티가 존재

| 기호 | 엔티티 이름 | 16진수 엔티티 | 설명 |
| :--: | :--: | :--: | :--: |
| < | `&lt;` | `&#60;` | 보다 작은 |
| > | `&gt;` | `&#62;` | 보다 큰 |
| & | `&amp;` | `&#38;` | and 기호 |
| " | `&quot;` | `&#34;` | 큰따옴표 |
| ' | `&apos;` | `&#39;` | 작은따옴표 |
### 1-4-5 주석(comment)

```
<!-- 주석 내용 -->
```

- 프롤로그 부분과 속성값 내부에 주석 작성 불가
- 주석 내부에 새로운 주석 작성 불가

> 주석 내용을 감싸는 하이픈(`-`)의 개수에는 제한이 없지만 
> 주석 내용에 하이픈이 2개 연속으로 오는 것을 허용하지 않음

```
<!--- 주석 -- 이 아닙니다 --->
```

## 1-5 네임스페이스
- 요소의 이름, 속성을 하나의 그룹으로 묶어 XML 요소간 이름 충돌 방지
- URI(Uniform Resource Identifiers)로 식별 가능

```
1. HTML
<body>
  <h1>제목</h1>
  <p>단락</p>
</body>

2. XML 사용자 정의 태그
<body>
  <arm>70</arm>
  <leg>110</leg>
</body>
```

- 두 요소는 다른 의미를 지녔지만 XML은 두 요소의 차이점을 알 수 없음

> 이 때, 네임스페이스를 선언하여 두 이름의 충돌 방지

### 1-5-1 선언 방법

```
<요소이름 xmlns:prefix="URI">
```

- `xmlns` 또는 `xmlns:` 로 시작하며 `prefix` 속성 값에 네임스페이스 접두사를 명시

```
<root>
  // a 접두사를 이용
  <a:body xmlns:a="https://www.w3.org/TR/html5/">
	<a:h1>제목</a:h1>
	<a:p>단락</a:p>
  </a:body>

  // b 접두사를 이용
  <b:body xmlns:b="http://codingsam.com/xml/physical/">
	<b:arm>70</b:arm>
	<b:leg>110</b:leg>
  </b:body>
</root>
```

- 또는 XML 루트 요소에서 네임스페이스 선언 가능

```
<root
    xmlns:a="https://www.w3.org/TR/html5/"
    xmlns:b="http://codingsam.com/xml/physical/">
    ...
</root>
```

## 1-6 XML 문서 종류

### 1-6-1 문법에 맞는 문서(well-formed XML)
- XML이 가져야 할 최소 필수 요건을 충족한 XML
	- root 요소는 하나만 존재
	- 모든 XML 요소는 종료 태그를 지님
	- 시작 태그와 종료 태그가 완벽히 일치하며 여닫는 순서가 정확함
	- 속성 값이 따옴표로 둘러쌓임
- 필수 요건 미 충족시 에러 발생
- XML의 모든 구문을 허용하지만 DTD나 스키마 사용하지 않음

### 1-6-2 유효한 문서(valid XML)
- 더 엄격한 XML 문서
- DTD 또는 XML 스키마(XSD)를 가짐

## 1-7 XML Parser
- 응용 프로그램이 XML을 읽을 수 있도록 인터페이스를 제공하는 라이브러리 / 패키지
- 대부분의 현재 웹 브라우저는 XML 파서를 내장

- 종류
	 - MSXML(Microsoft Core XML Services)
	 - System.Xml.XmlDocument
	 - Java built-in parser
	 - Saxon
	 - Xerces


---
#xml #namespace #prolog