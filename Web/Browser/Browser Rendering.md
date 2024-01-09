```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```

---
# 보완이 필요한 문서
# MPA vs SPA

## MPA
-  multi page application 의 약자
>인터렉션이 발생할 때마다 서버로부터 새로운 HTML을 받아와서 
>해당 링크로 이동하여 페이지 전체를 새로 렌더링하는 
>전통적인 웹 페이지 구성 방식

## SPA
-  Single Page Application의 약자로 하나의 페이지로 구성된 웹 어플리케이션
>브라우저에 최초에 한번 페이지 전체를 로드하고, 
>이후부터는 특정 부분만 Ajax를 통해 데이터를 바인딩하는 방식
> SPA는 현재 웹개발의 트렌드(React 등)

---
# CSR vs SSR

## Client side Rendering 

- 사용자 측(웹 브라우저) 스크립트 처리(SPA의 동작 방식)
- 장점 :
>요청에 따라 필요한 부분만 렌더링
>빠른 속도, 서버 부하 감소

- 단점 :
>초기 로딩 시간이 긺

## Server side Rendering 

- 서버에서 스크립트를 처리하여 그 결과를 HTML로 만들어 전달(MPA의 동작 방식)

- 장점 : 
>초기 로딩 속도 빠름
>검색엔진 최적화 유리

- 단점 :
>TTV(Time to View)와 TTI(Time to Interact)간 시간 간격 존재
>서버측 부하 발생
>응답시 화면 전체가 새로고침(깜빡임)

---
> [[Browser]]
#BrowserRendering