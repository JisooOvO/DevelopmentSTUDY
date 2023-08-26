# 프론트엔드 공부
> 프론트엔드 공부 기록입니다.

## TODO
- [x] HTML
    - [x] 역사
    - [x] 특징
    - [x] Doctype 
    - [x] Body Tag
- [ ] CSS
    - [x] 문법 및 스타일 적용방법
    - [x] 선택자 사용
    - [x] 특징
    - [x] 박스 모델
    - [x] 속성
    - [x] 폰트 적용
    - [ ] 레이아웃
    - [x] 전환 효과
    - [x] 애니메이션
    - [x] 변형 효과
    - [ ] 미디어 쿼리
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
            TTV(Time to View)와 
            TTI(Time to Interact)간 시간 간격 존재
            서버측 부하 발생
            응답시 화면 전체가 새로고침(깜빡임)
</details>

<details>
<summary>MPA vs SPA</summary>

- MPA : multi page application 의 약자

        인터렉션이 발생할 때마다 서버로부터 새로운 HTML을 받아와서 
        해당 링크로 이동하여 페이지 전체를 새로 렌더링하는 
        전통적인 웹 페이지 구성 방식

- SPA : Single Page Application의 약자로 하나의 페이지로 구성된 웹 어플리케이션

        브라우저에 최초에 한번 페이지 전체를 로드하고, 
        이후부터는 특정 부분만 Ajax를 통해 데이터를 바인딩하는 방식

        * SPA는 현재 웹개발의 트렌드(React 등)

</details>

<details>
<summary>SEO</summary>

추가 예정

</details>


## 1. HTML
> HTML 을 공부한 기록입니다.

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
> CSS 를 공부한 기록입니다.
<details>
<summary>0. 문법 및 스타일 적용방법</summary>

- 형식

        선택자 { 속성 : 값; }

- 적용 방법
    - 내부 스타일 시트

            <style>

            </style>

    - 외부 스타일 시트

            <link rel="stylesheet href="파일경로.css">

    - 인라인 시트

            <태그 style="css 코드">

</details>


<details>
<summary>1. 선택자 사용</summary>

- 전체 선택자

        * {
            /* code */
        }

- 태그 선택자

        태그명 {
            /* code */
        }

- 아이디 선택자

        #id속성{
            /* code */
        }

- 클래스 선택자
        
        .class{
            /* code */
        }
    
- 기본 속성 선택자

        [속성=값]{
            /* code */
        }

        * 아이디, 태그 선택자와 함께 사용가능
        * 값에는 문자열이 올 수 있음

- 조합 선택자
    - 그룹 선택자

            선택자1, 선택자2, ... {
                /* code */
            }

    - 자식 선택자

            부모 선택자 > 자식 선택자 {
                /* code */
            }

    - 하위 선택자

            선택자1 선택자2 ... {
                /* code */
            }

    - 인접 형제 선택자

            이전 선택자 + 대상 선택자 {
                /* code */
            }

    - 일반 형제 선택자

            이전 선택자 ~ 대상 선택자 {
                /* code */
            }

- 가상 요소 선택자
    
            기준 선택자 :: 가상 요소 선택자 {
                /* code */
            }

    
    * 종류
        
            ::before : 콘텐츠 앞의 공간
            ::after : 콘텐츠 뒤의 공간

- 가상 클래스 선택자    
            
            기준 선택자 : 가상 클래스 선택자 {
                /* code */
            }
    * 종류
        - 링크

                :link : 한번도 방문하지 않은 링크일 때
                :visited : 한 번 이상 방문한 링크일 때
        - 동적
                
                :hover : 요소에 마우스를 올릴 때
                :active : 요소를 마우스로 클릭하는 동안
        - 입력

                :focus : 입력 요소(input, textarea)에 커서 활성화시
                :checked : 체크박스 표시될 경우
                :disabled : 상호작용 요소 비활성화시
                :enabled : 상호작용 요소 활성화시
        - 구조적 가상클래스

                E:first-child
                E:last-child
                
                E:nth-child(n) : E 요소가 부모 요소의 n번째 자식일 때
                E:nth-last-child(n) : E 요소가 부모 요소의 뒤에서부터 n번째 자식일 때
                
                E:first-of-type
                E:last-of-type

                E:nth-of-type : 부모 요소의 n번째 자식 요소
                E:nth-of-last-type : 부모 요소의 뒤에서부터 n번째 자식 요소
</details>


<details>
<summary>2. 특징</summary>

- 적용 우선순위
    
        기본 스타일 시트보다 사용자 정의 스타일이 우선
        단계적 적용(마지막 스타일만 적용)

- 개별성 규칙

| 선택자           | 예시 | 점수 |
|-----------------|------|-----|
| 전체 선택자      | * |0|
| 태그 선택자      | div, p, h1 |1|
| 가상 요소 선택자 | ::before |1|
| 클래스 선택자    | .box |10|
| 가상 클래스 선택자 | :hover |10|
| 아이디 선택자    | #title |100|
| 인라인 스타일    | style="color:red" | 1000 |
| !important      | color:blue !important; | 10000|

- 상속(inherit)

- 단위
    - 절대 단위

            px(pixel)

    - 상대 단위 

            - % : 상위 요소값의 상대적 크기
            - em : 부모요소 텍스트에 대한 상대적 크기
            - rem : html 태그에 대한 상대적 크기 
                [ html 텍스트 크기 = 16px = 1rem ]
            - vw : 뷰포트 너비에 대한 상대적 크기
            - vh : 뷰포트 높이에 대한 상대적 크기

- 색상
        
        - rgba (red, green, blue, alpha)
        - HEX #RRGGBB
</details>


<details>
<summary>3. 박스 모델 </summary>
<br>
<img
src="https://images.velog.io/images/realryankim/post/6ed03b0b-f9f5-429f-a5e4-debe15c088ed/css-box-model.png"
alt="박스모델"
width=700
height=370><br><br>

- margin : 블록 외부 여백

        * 형식
        - margin-top/right/bottom/left
        - margin : <top> <right> <bottom> <left>
                   <top & bottom> <right & left>
                   < top & right & bottom & left>
        
        * margin collapse : 인접 margin 중 더 큰 값으로 통일
        * margin : auto 일 경우 뷰포트 기준 요소를 센터로 정렬

- border : 테두리

        * 형식
        - border : <width> <style> <color>
            <style>
                * none
                * hidden
                * solid
                * double
                * dotted
                * dashed
                * groove
                * ridge
                * inset
                * outset

- padding : 요소 내부 여백

        * margin 과 형식 동일

- content : 태그 사이에 작성된 내용
        
        * 형식
        - width / height

* width / height 특징

        박스 모델 내 콘텐츠가 없으면 width/height 제대로 적용 X

        웹 브라우저가 화면을 렌더링할 때 border + padding + content 영역의
        모든 너비와 높이를 종합적 계산하여 블록에 할당
        따라서 다음 속성을 사용

        - box-sizing : <속성>
            * 속성
                - content-box
                - border-box : border 너비/높이에 맞게 컨텐츠 영역 조절

* 박스 모델의 성격

        - 블록 : 항상 페이지의 모든 너비를 차지 (줄 바꿈)
            - 적용 가능 속성 : width/height, margin/padding
                * <hn>, <p>, <div>

        - 인라인 : 너비를 콘텐츠 크기만큼 차지
            - 적용 가능 속성 : margin/padding 의 왼쪽,오른쪽 방향
                * <a>, <span>, <strong>
        
        - 인라인 블록 : 너비를 콘텐츠 크기만큼 차지 + 블록의 성격(width/height 적용)
                * <img>

        * 다음 속성으로 변경 가능
        - display: <속성>
            * 속성
                - block
                - inline
                - inline-block

</details>


<details>
<summary>4. 속성</summary>
<br>
<img
src="https://velog.velcdn.com/images/wlgp1335/post/f8b664d2-1a73-4a3c-a6fd-a5fadb590f3a/image.png" 
alt="텍스트 상세" 
width=700
height=370><br><br>

- 텍스트
    - 폰트

            - font-family : <글꼴1>, <글꼴 유형>
                * 글꼴 유형 : 글꼴을 불러오지 못 할 경우 텍스트가 해당 형태로 나타남 => 사용자 경험 유지
                    - serif
                    - sans-serif
                    - monospace
                    - fantasy
                    - cursive
            - font-size : <크기> [초기 값=16px]
            - font-weight : <굵기 숫자(100~900)> | <키워드>
                * 키워드
                    - lighther
                    - normal : 400
                    - bold : 700
                    - bolder
            - font-style : <글꼴 속성>
                * 속성
                    - normal
                    - italic : 이탤릭체
                    - oblique : 기울임꼴
            -font-variant : <속성>
                * 속성
                    - normal
                    - small-caps : 텍스트를 크기가 작은 대문자로 변환
    
    - 스타일

            - text-align : <속성>
                * 속성
                    - left / center / right
                    - justify : 양쪽 정렬(브라우저 크기에 맞춰 텍스트 사이 간격 늘림)
            - text-decoration : <속성>
                * 속성
                    - none
                    - line-through
                    - overline / underline
            - letter-spacing : <자간>
            - line-height : <텍스트 높이>

- 배경 (padding/content)
 
        -background-color : <색상값>
        -background-image : url('이미지 경로')
            * 반드시 배경 너비/높이 지정
            * 이미지 사이즈와 너비/높이가 다를 경우 잘리거나 반복됨
        -background-repeat : <속성>
            * 속성
                - no-repeat
                - repeat-x
                - repeat-y
                - repeat
                - round : 이미지 크기 자동 조절
                - space : 이미지 잘리지 않음
        -background-size : <속성>
            * 속성
                - auto : 이미지 크기 유지
                - cover : 이미지 종횡비 유지하며 크기 조절(배경 크기에 딱 맞게)
                - contain : 이미지 종횡비 유지하며 크기 조절
                            (가로 세로중 한 방향이 맞으면 멈춤, 못 채운 부분 반복)
                - 너비 높이
        -background-position : <x> <y>
            * 속성
                - <x> : left / center / right
                - <y> : top / center / bottom
                - px, %
        -background-attachment : <속성> 이미지 스크롤 형식
            * 속성
                - local : 웹 브라우저와 함께 스크롤
                - scroll : 요소 고정, 브라우저 스크롤
                - fixed : 요소, 브라우저 고정

- 위치
    
        - position : <속성>
            * 속성
                - static : 기본 흐름
                - relative : 기본 흐름 따라 배치하지만 좌표 속성 사용
                    * top / right / bottom / left
                - absolute : 절대 좌표 위치
                    * top / bottom 속성 미 지정시 원래 위치에서 x축으로만 이동
                    * 원래 요소의 공간을 빈 공간으로 인식
                - fixed : 뷰포트 기준 절대 좌표 위치
                - sticky : 일정 좌표까지 기본흐름 이후 fixed

        - z-index : <정수>
            * 나중 요소가 앞에 표시
            * 정수 값이 클 수록 위에 표시
</details>


<details>
<summary>5. 폰트 적용</summary>

- 텍스트 폰트

        - Google Font 등 웹 폰트를 제공하는 사이트에서 @import 하여 사용

- 아이콘 폰트

        - Font Awesome 등 아이콘을 제공하는 사이트에서 라이브러리를 다운받거나
          CDNJS 방식으로 연결 후 아이콘 <i class> 를 복사하여 HTML에 붙여넣음

</details>


<details>
<summary>6. 레이아웃</summary>

- float : 대상 요소를 공중에 띄움(인라인 성격), 대상의 위치를 빈 공간으로 인식

        - float : <속성>
            * 속성
                - none
                - left / right
            * width 미 지정시 콘텐츠 만큼 너비 조절
            * float 으로 지정된 자식 요소는 부모 요소가 인식 X
        
        - clear : <속성> => 이전 요소의 float 속성 해제
            * 속성
                - left / right / both
            * 부모 요소가 float 자식 요소를 인식하는 법
                .container::after{
                    content: "";
                    display: block;
                    clear: both;
                }

- flex : 1차원 방식 레이아웃
    - flex layout

            - display : flex

                * flex 선언된 블록 컨텐츠의 정렬은 다음과 같음
                    - justify-content: center (row)
                    - align-items: center (column)
                    * flex 아닌 경우 -> margin : auto 등으로 적용가능
            - flex-direction : <속성>
                * 속성
                    - row : 왼쪽 -> 오른쪽
                    - reow-reverse : 오른쪽 -> 왼쪽
                    - column : 위 -> 아래
                    - coloumn-reverse : 아래 -> 위
            - flex-wrap : <속성> -> 플렉스 아이템이 컨테이너를 벗어날 경우
                * 속성
                    - nowrap : 무시(컨테이너 뚫고 나감)
                    - wrap : 영역을 벗어나면 줄 바꿈
                    - wrap-reverse : wrap의 역 방향으로 줄 바꿈(기본 값일 때 위로 줄이 올라감)
            - flex-flow : <direction> <wrap>
    
    - flex layout 정렬

            - justify-content : <속성> -> 주 축 방향 정렬(row)
                * 속성
                    - flex-start : 주축 방향 시작
                    - flex-end : 주축 방향 끝
                    - center : 중앙
                    - space-between : 플렉스 아이템 간격 균일(양 끝 간격 X)
                    - space-around : 플렉스 아이템 둘레 균일 (한 아이템 양쪽 둘레 균일)
                    - space-evenly : 플렉스 아이템 사이와 양 끝 간격 균일 (IE, edge 동작 X)

            - align-items : <속성> -> 교차 축 방향 정렬 (column)
                * 속성
                    - stretch : 교차축 방향 아이템 너비/높이가 블록 크기에 맞게 확대
                    - flex-start 
                    - flex-end
                    - center
                    - baseline
            - align-content : <속성> -> wrap 속성으로 2줄 이상일 때 사용
            - align-self : <속성> -> 단일 정렬

- grid : 2차원 방식 레이아웃
    
        - 추가 예정

</details>

<details>
<summary>7. 전환 효과</summary>

- Transition : 가상 클래스 선택자 등에 의해 기존 속성 값이 변경

        - transition-property : <속성 값> -> 전환 효과
            * 속성
                - none
                - all
            * 전환 가능한 속성이 정해져 있음
        - transition-duration : <시간> -> 전환 효과 지속 시간
        - transition-delay : <지연 시간>
        - transition-timing-function : <속성> -> 전환 효과의 진행 속도
            * 속성
                - linear : 일정
                - ease : 빨라지다가 느려짐
                - ease-in : 느리다가 점점 빨라짐
                - ease-out : 빠르다가 점점 느려짐
                - ease-in-out : 느리다가 빨라졌다가 느려짐
                - cubic-bezier : 사용자 정의 속도
                    * 개발자 도구에서 속도 조절

</details>


<details>
<summary>8. 애니메이션</summary>

- @keyframes 정의하여 실행

        - @keyframes <키 프레임명>{
            0%{ /* 시작 코드 */ }
            n%{}
            100%{ /* 종료 코드 */ }
            }

        - @keyframes <키 프레임명>{ 
            from{ /* 시작 코드 */ }
            to{ /* 종료 코드 */ }
            }

- 키 프레임명 지정 및 속성

        - animation-name : <키 프레임명>
        - animation-duration : <지속 시간>
            * 키 프레임, 애니메이션 네임, 듀레이션은 필수 (없으면 동작 X)
        - animation-delay : <지연 시간>
        - animation-fill-mode : <속성> -> 애니메이션 종료 시점의 상태 설정
            * 속성
                - none : 
                    실행 전 : 시작 지점 스타일 적용X 대기
                    실행 후 : 실행 전 스타일 적용 상태로 돌아감
                - forwards :
                    실행 전 : 시작 지점 스타일 적용X 대기
                    실행 후 : 종료 지점 스타일 적용 상태로 대기
                - backwards
                    실행 전 : 시작 지점 스타일 적용O 대기
                    실행 후 : 실행 전 스타일 적용 상태로 돌아감
                - both
                    실행 전 : 시작 지점 스타일 적용O 대기
                    실행 후 : 종료 지점 스타일 적용 상태로 대기
        - animation-play-state : <속성> -> 애니메이션 재생 상태 지정 (실행 도중 조작 가능 with JS)
            * 속성
                - paused
                - running
        - animation-diretion : <속성> -> 진행 방향
            * 속성
                - normal : 키 프레임 정의 순서(from -> to)
                - reverse
                - alternate : 홀수 번째 normal, 짝수 번째 reverse
                - alternate-reverse : 홀수 번째 reverse, 짝수 번째 normal
        - animation-timing-function

</details>


<details>
<summary>9. 변형 효과</summary>

- 요소의 크기 변경, 위치 이동, 회전

        - transform : <함수>
            * 함수
                - translate(x,y) : 현 위치에서 x, y 축 만큼 이동
                - translateX(n)
                - translateY(n)

                - scale(x,y) : x, y 축 만큼 확대/축소
                - scaleX(n)
                - scaleY(n)

                - skew(xdeg, ydeg) : x, y 각도 만큼 기울임
                - skewX(deg)
                - skewY(deg)

                - rotate(deg) : deg 만큼 회전
                    * deg > 0 -> 시계방향 회전
                    * deg < 0 -> 반시계방향 회전

- 기준점 변경

        - transform-origin : <x> <y> -> 변형 기준점 변경
            * 속성
                - x : left / center / right
                - y : top / center / bottom

</details>


<details>
<summary>10. 미디어 쿼리</summary>

        - 추가 예정

</details>

## 3. JavaScript

## 4. React

## 5. Tailwind CSS

## #Reference
---
[Font]

[Google Font](https://fonts.google.com/)

[Font Awesome](https://cdnjs.com/libraries/font-awesome)


[gitignore]

[gitignore](https://www.toptal.com/developers/gitignore)

[HTML/CSS/JavaScript]

https://www.funyphp.com/archive/html/38

https://webdir.tistory.com/308

http://www.tcpschool.com/

https://developer.mozilla.org/

[Rendering]

https://miracleground.tistory.com/entry/SSR%EC%84%9C%EB%B2%84%EC%82%AC%EC%9D%B4%EB%93%9C-%EB%A0%8C%EB%8D%94%EB%A7%81%EA%B3%BC-CSR%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%82%AC%EC%9D%B4%EB%93%9C-%EB%A0%8C%EB%8D%94%EB%A7%81

https://joooing.tistory.com/entry/rendering


[도서]

[코딩 자율학습 HTML + CSS + 자바스크립트](https://www.gilbut.co.kr/book/view?bookcode=BN003377)
<img src="https://gimg.gilbut.co.kr/book/BN003377/rn_view_BN003377.jpg" width="700" height="370">