
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