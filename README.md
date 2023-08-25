# 학습용 Repository

> HTML/CSS 및 GitHub 학습장입니다.


## 0. GitHub 사용법

<details>
<summary>GitHub에 저장소 등록시 사용</summary>

```
$ git init 
$ git add README.md
$ git commit -m "init"
$ git branch -M main
$ git remote add origin https://github.com/Hu3Hu3man/front.git
$ git push -u origin main
```
</details>

## 1. HTML
> HTML 을 공부한 내용입니다.

<details>
<summary>0. 역사</summary>
추가예정
</details>

<details>
<summary>1. 구성요소</summary>

> <sapn style="color:#ffd33d">!DOCTYPE : 문서형 정의(Document Type Definition)</span>
    
    - 사용 목적
        * 다양한 브라우저가 HTML 문서를 동일하게 인식하기 위함
        * 문서간 호환성 향상
        * 미 기입시 Quirks Mode(비표준모드) 상태로 렌더링

    - 속성 
        - HTML 4.01 (SGML 기반으로 DTD 참조 필요)
            * 1.최상위 엘리먼트 네임 (Root Element Name)
                * 대체로 HTML
            * 2.국제적,공용 || 내부적,제한용 (Public || SYSTEM)
                * 대체로 Public
            * 3.ISO공인인증기관 || ISO비공인인증기관 ("+" || "-")
            * 4.기관명
                *  W3C : 비공인 인증기관
            * 5.DTD 타입
                * Strict : W3C 권장 문서 타입 (문법을 정확하게 준수하지 않으면 오류)
                    * center, iframe, 새창 띄우기 등 제한
                * Transitional : 호환성 위한 중간단계 문서 타입 (문법에 오류가 있어도 허용)
                * Frameset : Frameset 사용을 위한 태그,속성 추가한 문서 타입 (현재 거의 사용 X)
            * 6.인코딩언어(ISO)
            * 7.DTD 참조 문서

        - HTML 5
            * <!DOCTYPE html>    
                - <html>
                    - <head>
                    - </head>

                    - <body>
                    - </body>
                - </html>

</details>


### Reference
https://www.funyphp.com/archive/html/38

http://www.tcpschool.com/html-tags/doctype

https://developer.mozilla.org/ko/docs/Glossary/XHTML