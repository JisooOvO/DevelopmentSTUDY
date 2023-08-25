# 프론트엔드 공부
> 프론트엔드 공부 기록입니다.

## TODO
- [ ] HTML
    - [ ] 역사
    - [ ] 특징
    - [ ] 구성요소
    - [ ] 태그
- [ ] CSS
- [ ] JavaScript
- [ ] React

## 1. HTML
> HTML 을 공부한 내용입니다.

<details>
<summary>0. 역사</summary>
| version   | year | doctype | contents |
|-----------|------|---------|----------|
| HTML 1.0  | 1991 |         |          |
| HTML 2.0  | 1995 |         |          |
| HTML 3.2  | 1997 |         |          |
| HTML 4.01 | 1999 |         |          |
| XHTML 1.0 | 2000 |         |          |
| HTML 5    | 2014 |         |          |
</details>

<details>
<summary>1. 특징</summary>
추가예정
</details>

<details>
<summary>2. 구성요소</summary>

>!DOCTYPE : 문서형 정의(Document Type Definition)
    
    - 사용 목적
        * 다양한 브라우저가 HTML 문서를 동일하게 인식하기 위함
        * 문서간 호환성 향상
        * 미 기입시 Quirks Mode(비표준모드) 상태로 렌더링

    - 태그와 속성
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
                        - charset : 인코딩 방식 명시 (HTML5에서 추가된 속성)
                            * UTF-8
                        - content : name/http-equiv 속성 관련 값
                        - http-equiv : Http 헤더 제공, 반드시 content 속성이 함께 명시되어야 함
                            * content-type
                            * default-style
                            * refresh : 리다이렉트
                        - name :
                            * application-name
                            * author : 문서 저자 정의
                            * description : 웹 페이지 설명
                            * generator
                            * keywords : 검색 엔진 키워드
                            * viewport : 뷰포트 설정
                        - scheme : content 속성 해석 스키마 (HTML5 지원 X)

                    <title> : HTML 문서 제목 지정 (존재하지 않을 경우 HTML 유효성 검사 통과 X)
                                * title이 여러개 일 경우 검색엔진 신뢰성 하락
                    
                    <link> : 외부 소스 관계 정의
                        - crossorigin : CORS 요청 처리방식
                            * anonymous
                            * use-credentials
                        - href : 외부 URL
                        - media : 미디어, 장치
                        - type : 미디어 타입
                        - rel : 필수속성, 외부 리소스 연관 관계 명시
                            * alternate
                            * author
                            * dns-prefetch
                            * help
                            * icon
                            * license
                            * next
                            * pingback
                            * preconnect
                            * prefetch
                            * preload
                            * prerender
                            * prev
                            * search
                            * stylesheet
                        - sizes : rel="icon"일 경우 크기 설정
                            * 높이 x 너비
                            * any
                        * HTML5 미지원 속성
                            - charset
                            - rev
                            - target

                    <style> : HTML 문서 스타일 정보 정의 (CSS)
                        - media
                        - type

                    <script> : 클라이언트 사이드 스크립트 정의 (JavaScript)
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
            HTML5
</details>

<details>
<summary>4. 태그</summary>
추가예정
</details>

### Reference
---
https://www.funyphp.com/archive/html/38

http://www.tcpschool.com/

https://developer.mozilla.org/