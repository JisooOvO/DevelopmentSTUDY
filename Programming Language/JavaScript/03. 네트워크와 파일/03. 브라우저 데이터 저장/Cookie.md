---

---
```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. 쿠키

- 브라우저에 저장되는 작은 크기의 문자열
- [RFC 6265](https://tools.ietf.org/html/rfc6265)에서 정의한 HTTP 프로토콜의 일부

> 서버가 HTTP 응답 헤더의 `Set-Cookie`에 내용을 넣어 전달하면 브라우저는 이를 저장
> 사용자가 쿠키를 생성하기로 한 동일 서버에 접속할 때마다 해당 쿠키를 요청 헤더에 함께 보냄

## 1-1 쿠키 읽기

- `document.cookie`를 통해 현재 사이트에 저장된 쿠키를 읽을 수 있음
- `name=value` 쌍으로 구성되어 각 쌍마다 `;`로 구분함

## 1-2 쿠키 쓰기

- `document.cookie`는 접근자 프로퍼티
- `document.cookie`에 값을 할당하면 해당 쿠키를 갱신함(다른 쿠키의 값은 변경되지 않음)
- 쿠키의 이름, 값에는 특별한 제약이 없으나 형식의 일관성을 위해 `encodeURIComponent()` 사용

> 단,  `name=value` 쌍의 값은 4KB를 넘을 수 없으며
> 도메인 하나 당 저장 가능한 쿠키의 개수는 브라우저마다 다르지만 20개 정도로 제한됨

```
let name = "my name";
let value = "John Smith";

document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)
```

## 1-3 옵션

 ![[Cookie.PNG]]

- 쿠키의 값에는 몇 가지 옵션이 존재

### 1-3-1 path
- `path=/mypath`(절대 경로)
- 해당 경로나 하위 경로의 페이지만 쿠키에 접근 가능
- 미 지정시 기본 값은 현재 경로

### 1-3-2 domain
- `domain=site.com`
- 접근 가능한 `domain` 지정
- `domain`에 값을 지정하지 않았다면 해당 도메인에서만 쿠키 접근 가능(서브 `domain`에서도 접근 불가)
> `domain`에 루트 `domain` 설정 시 서브 `domain`에서 접근 가능

### 1-3-3 expires / max-age
- `expires=Tue, 19 Jan 2038 03:14:07 GMT`
- 유효일자와 만료 기간 미 지정시 브라우저 종료시 쿠키도 함께 삭제됨(세션 쿠키)
- 유효일자는 반드시 GMT 포맷으로 설정
- 과거 값 지정시 쿠키 삭제
```
let date = new Date(Date.now() + 86400e3) // 유효일자 24시간
date = date.toUTCString() // GMT 포맷으로 변경
document.cookie = "user=John; expires" + date;
```

- `max-age`는 쿠키 만료기간을 초 단위로 설정

### 1-3-4 secure
- 옵션 설정시 `HTTPS`로 통신하는 경우에만 쿠키 전송

### 1-3-5 samesite
- XSRF(크로스 사이트 요청 위조) 공격을 막기 위한 옵션

> XSRF는 정상적인 사이트에서 쿠키를 통해 로그인을 진행 한 뒤 로그아웃을 하지 않고
> 악의적인 사이트에 접근할 경우 해당 사이트에서 정상적인 사이트로 폼 요청을 보냄
> 요청시 쿠키가 함께 전송되므로 민감한 기능(결제 등)이 작동 할 수 있음 

- 옵션
	- `samesite=strict` : 사이트 외부에서 요청될 경우 쿠키 전송되지 않음(메일 링크 클릭 등)
	- `samesite=lax` : `strict`와 동일하게 외부 요청시 쿠키 전송하지 않으나 예외 사항 존재
								  안전한 HTTP 메서드(`GET`)일 경우
								  최상위 레벨 탐색에서 작업이 이루어질 경우 -> 브라우저 주소창에서 URL 변경
								  (`<iframe>`, AJAX 요청은 최상위 탐색 레벨 행위가 아님)

- 구식 브라우저(2017년 이전)에서는 `samesite` 옵션을 지원하지 않음

### 1-3-6 httpOnly

- 웹 서버에서 `Set-Cookie` 헤더를 이용해 쿠키를 설정 가능
- 클라이언트 측 스크립트가 쿠키를 사용할 수 없음(`document.cookie`로 접근 및 조작 불가능해짐)

## 1-4 쿠키 함수

- `cookie.js` 등 라이브러리를 이용하지 않고 쿠키를 조작하는 방법

- getCookie(name)
```
function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? deocodeURIComponent(matches[1]) : undefined;
}
```

- setCookie(name, value, option)
```
function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
```

- deleteCookie(name)
```
function deleteCookie(name) {
	setCookie(name, "", {
		'max-age' : -1
	})
}
```

## 1-5 서브 파티 쿠키

- 사용자가 방문 중인 도메인이 아닌 다른 도메인에서 설정한 쿠키
- 주로 광고회사에서 서드 파티 쿠키를 사용

![[3rdPartyCookie.PNG]]

> 서드 파티 도메인에서 `document.cookie` 로 쿠키를 설정하는 스크립트를 생성할 경우
> 이 쿠키는 현재 페이지의 도메인에 속함(서드 파티 쿠키가 아님)

## 1-6 GDPR

- 유럽 연합(EU)에서 사용자 개인 정보 보호를 강제하는 법령
- 쿠키를 이용한 사용자 추적, 식별에 대한 내용을 명시
- 쿠키를 통해 사용자를 추적(인증 등)할 경우 사용자로부터 명시적인 허가를 얻어야함

---
#cookie