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

- CORS 요청을 허가하는 헤더 전송 필요
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
Referer : here.com/some/url..
```

>Origin 헤더에는 요청이 이루어지는 페이지 경로가 아닌 오리진(도메인, 프로토콜, 포트) 정보가 담김
>서버는 요청 헤더의 Origin을 검사하고 수락시 `Access-Control-Allow-Origin`헤더를 응답에 추가
>브라우저는 서버로부터의 응답에 이 헤더가 있는지를 확인하는 중재인의 역할

- Origin 헤더에는 오리진 정보나 `*`이 명시되어있음
>`Referer`는 명세서상 선택 사항, 콘텐츠 보안 정책 등으로 생략이 될 수 있음
>따라서 신뢰할 수 있는 정보를 담은 Origin이 필요함

![[CORS.PNG]]

- 서버 응답 헤더는 다음과 같은 형태
```
200 OK
Content-Type : text/html; charset=UTF-8
Access-Control-Allow-Origin : here.com
```

#### 1-2-1-1 안전한 응답헤더

- CORS 요청이 이뤄진 경우 자바스크립트는 안전한 응답 헤더에만 접속 가능
	- `Cache-Control`
	- `Content-Language`
	- `Content-Type`
	- `Expires`
	- `Last-Modified`
	- `Pragma`
> 이 외의 응답 헤더에 접근시 에러 발생

#### 1-2-1-2 안전하지 않은 응답 헤더

- `Access-Control-Expose-Headers` 헤더를 통해 접근 가능
```
200 OK
Content-Type : text/html; charset=UTF-8
Content-Length : 12345
API-Key : ...
Access-Control-Allow-Origin : Https;//...
Access-Control-Expose-Headers : Content-Length, API-Key
```

### 1-2-2 안전하지 않은 요청

- 그 외 모든 요청(`PUT, DELETE, API_KEY 명시된 요청 등`)
> 브라우저는 안전하지 않은 요청을 서버에 전송하기전 
>  `preflight` 요청을 먼저 전송해 서버가 CORS 준비가 되어있는지 확인

- `preflight` 요청은 `OPTIONS` 메서드를 사용하며 두 헤더를 포함
	- `Access-Control-Request-Method` : 안전하지 않은 요청에서 사용하는 메서드 정보
	- `Access-Control-Request-Headers` : 안전하지 않은 요청에서 사용하는 헤더 목록

- 서버에서 안전하지 않은 요청 허용시 다음 헤더를 브라우저로 보냄
	- `Access-Control-Allow-Origin` : `*`이나 오리진
	- `Access-Control-Allow-Methods` 
	- `Access-Control-Allow-Headers`
	- `Access-Control-Max-Age` : 퍼미션 체크 여부 몇 초간 캐싱여부(일정 기간 동안 `preflight` 요청 생략 가능)

![[CORSunsafe.PNG]]

#### 1-2-2-1 안전하지 않은 CORS 요청 예시

```
1. 안전하지 않은 요청 전송
// PATCH, 안전하지 않은 Content-Type, API-Key 사용
let response = await fetch(url, {
	method : 'PATCH',
	headers : {
		'Content-Type' : 'application/json',
		'API-Key' : ...
	}
})

2. peflight 요청
OPTIONS /service.json
Host : site.com
Origin : url
Access-Control-Request-Method : PATCH
Access-Control-Request-Headers : Content-Type, API-Key

3. preflight 응답
200 OK
Access-Control-Allow-Methods : PATCH
Access-Control-Allow-Headers : Content-Type, API-Key
Access-Control-Allow-Headers
Access-Control-Max-Age

4. 실제 요청 (안전한 요청일때와 동일)
PATCH /service.json
Host : site.com
Content-Type : application/json
API-Key : secret
Origin : url

5. 실제 응답
Access-Control-Allow-Origin : url
```

- `preflight` 요청은 자바스크립트를 통해 관찰 불가, 응답을 받는 일만 가능

## 1-3 자격 증명(credential)

- 자바스크립트로 CORS 요청시 쿠키나 HTTP 인증 같은 자격 증명이 함께 전송되지 않음
>HTTP 요청은 보통 쿠키가 함께 전송되지만 자바스크립트를 통한 요청은 예외

- 자바스크립트로 자격 증명 정보를 함께 전송시 `fetch OPTIONS`에 `credentials : "include"` 추가
 >자격 증명 요청시 오리진 헤더에 `*`을 쓸 수 없음
```
fetch(url, {
	credentials : "include"
})
```

- 자격 증명 정보가 담긴 요청 승인시 응답에 다음 헤더 추가
```
200 OK
Access-Control-Allow-Origin : url
Access-Control-Allow-Credentials : true
```

---
#CORS