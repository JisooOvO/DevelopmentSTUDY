```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. CORS

- 오리진(origin) :
>도메인이나 서브도메인, 프로토콜, 포트에 의해 결정되는 개념
>해당 요소가 다른 곳에 요청을 보낼 경우 Cross-Origin Request(COR)라 함

## 1-1 다른 웹 사이트에 요청을 보내기 위한 트릭들

- 초기 네트워크 요청시 CORS 요청은 불가능

### 1-1-1 폼 사용하기

```
<form target="iframe" method="POST" action="http://another.com/...">
	...
</from>

<iframe name="iframe"></iframe>
```

> 폼은 어디든 데이터를 보낼 수 있었기에 폼으로 다른 사이트에 요청을 보내고
> `iframe`에 스크립트를 심어 콘텐츠 읽기 제약을 피하여 사이트간 양방향 통신을 수행함

### 1-1-2 스크립트 사용하기

- 스크립트의 `src` 속성 값에 도메인 제약이 없음
- 어디서든 스크립트를 실행 가능
- JSONP 프로토콜을 이용해 데이터를 가져옴
```
let script = document.createElement('script');
script.src = `http://...`; // JSONP 프로토콜에 의해 데이터 받음
document.body.append(script);
```

## 1-2 CORS 요청

- CORS 요청을 허가하는 헤더 전송시 CORS 가능
- CORS 요청은 2가지 경우로 나뉨

### 1-2-1 안전한 요청

- 2가지 조건을 충족해야함
	- 안전한 메서드(`GET, POST, HEAD`) 를 사용한 요청
	- 안전한 헤더를 사용한 요청
		-  `Accept`
		- `Accept-Language`
		- `Content-Language`
		- 값이 `application/x-www-form-urlencoded`이나 `multipart/form-data`, `text/plain`인 `Content-Type`

- CORS 요청 헤더는 다음과 같은 형태
```
GET /request
Host : another.com
Origin : here.com
```

>Origin 헤더에는 요청이 이루어지는 페이지 경로가 아닌 오리진(도메인, 프로토콜, 포트) 정보가 담김
>서버는 요청 헤더의 Origin을 검사하고 수락시 `Access-Control-Allow-Origin`헤더를 응답에 추가
>이 헤더에는 오리진 정보나 `*`이 명시되어있음
>브라우저는 서버로부터의 응답에 이 헤더가 있는지를 확인하는 중재인의 역할

![[CORS.PNG]]

- 서버 응답 헤더는 다음과 같은 형태
```
200 OK
Content-Type : text/html; charset=UTF-8
Access-Control-Allow-Origin : here.com
```

~ 응답헤더부터 ~

### 1-2-2 안전하지 않은 요청

- 그 외 모든 요청(`PUT, DELETE, API_KEY 명시된 요청 등`)
> 브라우저는 안전하지 않은 요청을 서버에 전송하기전 
> `preflight` 요청을 먼저 전송해 서버가 CORS 준비가 되어있는지 확인

