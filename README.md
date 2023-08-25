# 프론트엔드 공부
> 프론트엔드 공부 기록입니다.

## TODO
- [x] HTML
    - [x] 역사
    - [x] 특징
    - [x] Doctype 
    - [x] Body Tag
- [ ] CSS
- [ ] JavaScript
- [ ] React
- [ ] Tailwind CSS

## 0. 미분류
> 필요한 내용을 정리합니다.

<details>
<summary>브라우저 렌더링</summary>
추가예정
</details>

<details>
<summary>SSR vs CSR</summary>

- Client side Rendering : 사용자 측(웹 브라우저) 스크립트 처리(SPA의 동작 방식)

        장점 :
            요청에 따라 필요한 부분만 렌더링
            빠른 속도, 서버 부하 감소
        단점 :
            초기 로딩 시간이 긺

- Server side Rendering : 서버에서 스크립트를 처리하여 그 결과를 HTML로 만들어 전달(MPA의 동작 방식)

        장점 : 
            초기 로딩 속도 빠름
            검색엔진 최적화 유리
        단점 :
            TTV(Time to View)와 TTI(Time to Interact)간 시간 간격 존재
            서버측 부하 발생
            응답시 화면 전체가 새로고침(깜빡임)
</details>

<details>
<summary>MPA vs SPA</summary>

- MPA : multi page application 의 약자

        인터렉션이 발생할 때마다 서버로부터 새로운 HTML을 받아와서 해당 링크로 이동하여 페이지 전체를 새로 렌더링하는 전통적인 웹 페이지 구성 방식

- SPA : Single Page Application의 약자로 하나의 페이지로 구성된 웹 어플리케이션

        브라우저에 최초에 한번 페이지 전체를 로드하고, 이후부터는 특정 부분만 Ajax를 통해 데이터를 바인딩하는 방식

        *SPA는 현재 웹개발의 트렌드(React 등)

</details>

<details>
<summary>SEO</summary>

추가 예정

</details>


## 1. HTML
> HTML 을 공부한 내용입니다.

<details>
<summary>0. 역사</summary>
<br>

| version   | year | contents |
|-----------|------|----------|
| HTML 1.0  | 1991 |팀 버나스리(Tim Berners-Lee)가 발표한 최초의 HTML|
| HTML 2.0  | 1995 |국제 표준으로 제정된 최초의 HTML|
| HTML 3.2  | 1997 |W3C에 의해 제정된 최초의 HTML|
| HTML 4.01 | 1999 |Stylesheet 지원|
| XHTML 1.0 | 2000 |확장성 있는 HTML+XML|
| HTML 5    | 2014 |간결한 코드|

<br>
</details>

<details>
<summary>1. 특징</summary>

>HTML : HyperText Markup Language 의 약자, 태그와 속성으로 구성

- 태그 : HTML 문법을 이루는 가장 작은 단위, 요소(element)와 같은 의미

        홑화살괄호(<>) 사이 태그명 입력
        시작 태그(<>), 종료 태그(</>)의 한 쌍으로 구성
        시작태그에는 속성명과 속성 값이 올 수 있음

        * 빈 태그(Empty Tag) : 시작 태그만 가짐
            - <img>,<br>,<hr> 등

- 속성 : 태그의 의미나 기능을 보충 (속성명은 소문자 권장)

        - class : 같은 유형의 태그를 분류 (CSS .)

        - id : 태그에 유일한 이름 지정, 단 하나의 요소에만 지정 (CSS #, 우선적용)

- 상속 : 태그 위치에 따라 부모, 자식 형제 관계가 형성되며 CSS에 영향을 미침

- 콘텐츠 레벨 요소 :

        - 블록 : 부모 요소의 전체 공간을 차지

        - 인라인 : 콘텐츠의 흐름을 끊지 않고, 요소를 구성하는 태그에 할당된 공간만 차지


<br>
</details>

<details>
<summary>2. Doctype</summary>

>문서형 정의(Document Type Definition)
    
- 사용 목적

        - 다양한 브라우저가 HTML 문서를 동일하게 인식하기 위함
        - 문서간 호환성 향상
        - 미 기입시 Quirks Mode(비표준모드) 상태로 렌더링

- DOCTYPE 선언과 Head 태그 및 속성
    - HTML 4.01 (SGML 기반으로 DTD 참조 필요)
        
            1.최상위 엘리먼트 네임 (Root Element Name)
                * HTML
            2.국제적,공용 || 내부적,제한용 (Public || SYSTEM)
                * Public
            3.ISO공인인증기관 || ISO비공인인증기관 ("+" || "-")
            4.기관명
                *  W3C : 비공인 인증기관
            5.DTD 타입
                - Strict : W3C 권장 문서 타입 (문법을 정확하게 준수하지 않으면 오류)
                    * center, iframe, 새창 띄우기 등 제한
                - Transitional : 호환성 위한 중간단계 문서 타입 (문법에 오류가 있어도 허용)
                - Frameset : Frameset 사용을 위한 태그,속성 추가한 문서 타입 (현재 거의 사용 X)
            6.인코딩언어(ISO)
            7.DTD 참조 문서

    - HTML 5 (최소한의 코드 작성 기반)

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
                                        * width=device-width : 플랫폼 가로 크기에 맞춤, 수치를 넣으면 그 수치에 맞게 맞춰짐
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

- Doctype 선언 종류
    * HTML 4.01 Strict
        
            <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    * HTML 4.01 Transitional
        
            <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    * HTML 4.01 Frameset
        
            <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" http://www.w3.org/TR/html4/frameset.dtd">
    * XHTML 1.0 Strict
        
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    * XHTML 1.0 Transitional
        
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    * XHTML 1.0 Frameset
        
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
    * XHTML 1.1
        
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
    * HTML5
        
            <!DOCTYPE html>
</details>

<details>
<summary>3. Body Tag</summary>

- 텍스트

        <hn> : 제목, 주제 텍스트 표현
            <h1> ~ <h6> 순으로 중요도 설정
                * 검색엔진의 경우 <h1>부터 단계적으로 검색하며 
                  중간 단계가 없을 경우 검색종료
                  따라서 숫자를 순차적으로 사용해야함

        <p> : 본문의 문단

        <br> : 줄 바꿈

        <strong> : 텍스트 의미 강조, 중첩 가능

        <em> : 글자 기울임

        <ins> : 밑줄

        <del> : 취소선

        <sub> : 아래 첨자

        <sup> : 위 첨자

- 인용구

        <blockquote> : 출처에서 인용한 텍스트
        
        <q> : 짧은 인용문

        * 속성
                cite : 출처 경로

- 그룹

        <div> : 블록 요소 그룹

        <span> : 인라인 요소 그룹

- 목록

        <ul> : 비순서형 목록
            <li> : 목록 내용

        <ol> : 순서형 목록
            <li> : 목록 내용

        <dl> : 정의형 목록
            <dt>용어
            <dd>용어 설명

- 링크와 이미지

        <a> : 링크 생성
            * 속성
                - href : 경로
                    * 불분명한 경로시 href="#"
                - target : 연결 방식
                    _blank : 새 창으로 열림
                    _parent
                    _sefl
                    _top
                - title : 링크 설명

        <img> : 이미지 객체 삽입
            * 속성
                - src : 이미지 경로
                    * 경로 기준 (상대 경로)
                        ./ : 현재 폴더
                        ../ : 상위 폴더
                - alt : 이미지 설명
                    * 웹 접근성 보장

- 폼

        <form> : 폼 양식
            * 속성
                - action : 상호작용할 서버 URL
                - method : 송신 방식
                    * get : 보안 요구 X
                    * post : 보안 요구 정보
        
        <input> : 사용자 입력 정보(id,password) 요소 생성
            * 속성
                - type : 상호작용 요소 종류, 필수 속성
                    * text
                    * password
                    * tel
                    * number
                    * url
                    * search
                    * email
                    * checkbox
                    * radio : 라디오 박스
                    * file : 파일 업로드
                    * button
                    * image : 이미지 버튼, src 속성 사용
                    * hidden
                    * date
                    * datetime-local
                    * month
                    * week
                    * time
                    * range
                    * color
                    * submit
                    * reset
                - name : 서버에 전송될 요소의 이름
                - value : 초깃값

        <textarea> : 여러 줄의 입력 요소
            * 콘텐츠 영역에 초깃값 정의

        <label> : 상호작용 요소에 이름 생성
            * 스크린 리더기 식별 능력 향상 -> 웹 접근성 향상
            * 속성
                - for : 이름
                    => label for 속성과 input id 이름을 같은 값으로 설정

        <fieldset> : 박스 모양의 테두리 생성
            <legend> : 그룹 이름

        <select> : 콤보박스 생성
            * 속성
                - size : 화면 노출 항목 개수
                - multiple : 다중 선택
                - selected : 기본 선택 항목
            <optgruop> : 항목 그룹화
                <option> : 항목
                    * 속성
                        - value : 서버에 전송할 값, 미입력시 텍스트 값 전송
        
        <button> : 버튼 생성
            * input 과 달리 이미지, 태그 포함 가능
            * 속성
                - type 
                    * submit
                    * reset
                    * button

        * 추가 속성
            - disabled : 비활성화
            - readonly : 읽기 전용 (서버에 값 전송)
            - maxlength : 입력 글자 수 제한
            - checked : 요소를 선택된 상태로 표시(checkbox, radio)
            - placeholder : 입력 요소의 힌트

- 표(table)

        <table>
            <caption> : 표 제목
            <col> : 1개의 열 그룹화
            <colgroup> : 2개 이상의 열 그룹화
                * span : [값 = 그룹화 열 개수]
                * 병합과 다름 (주로 스타일 설정)
            <thead>
                <tr> : 행 생성 
                    <th> : 제목 열 생성
            <tfoot>
            <tbody>
                <tr>
                    <td> : 내용 열 생성
            
            *<thead>, <tfoot>, <tbody> => 웹 접근성 향상

        * 속성
            - rowspan / colspan : 셀 병합, [값 = 병합할 셀 개수]
            - scope : 웹 접근성 향상
                * row / col
                * rowgroup / colgroup

- 멀티미디어

        <audio>
            <source src="#" type="audio/wav">
            <source src="#" type="audio/mp3">
            ...

        <video>
            <source>

        * 속성
            - src
            - type : 미디어 타입
                * 웹 지원 형식을 설정 가능 => 웹 접근성 향상
            - controls : 컨트롤 패널

- 시맨틱 태그

        검색 엔진에 맞춰 웹 구조화

        <header>, <nav>, <section>, <article>, <aside>, <footer>, <main> 

* 글로벌 속성

        - class
        - id
        - style
        - title : 추가 정보 (커서를 대면 툴팁 정보 표시)
        - lang
        - hidden : 화면에서 감춤
        - data-* : 커스텀 속성
</details>

## 2. CSS

## 3. JavaScript

## 4. React

## 5. Tailwind CSS

## #Reference
---
https://www.funyphp.com/archive/html/38

https://webdir.tistory.com/308

http://www.tcpschool.com/

https://developer.mozilla.org/

https://miracleground.tistory.com/entry/SSR%EC%84%9C%EB%B2%84%EC%82%AC%EC%9D%B4%EB%93%9C-%EB%A0%8C%EB%8D%94%EB%A7%81%EA%B3%BC-CSR%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%82%AC%EC%9D%B4%EB%93%9C-%EB%A0%8C%EB%8D%94%EB%A7%81

https://joooing.tistory.com/entry/rendering