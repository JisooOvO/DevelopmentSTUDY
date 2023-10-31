```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. FormData 객체

- HTML 폼(form) 데이터를 쉽게 보내도록 도와주는 [객체](https://xhr.spec.whatwg.org/#interface-formdata)
```
let formData = new FormData([form]);
```

- HTML에 form 요소가 있는 경우 해당 폼 요소의 필드 전체가 자동 반영
- `fetch`등의 네트워크 메서드는 `FormData` 객체를 body로 받음
- 브라우저 HTTP 메시지 인코딩, 헤더는 `Content-Type : multipart/form-data`로 지정된 후 전송

## 1-1 폼 전송하기

- 폼 전송시 헤더는 항상 `Content-Type : multipart/form-data` 
```
<body>
<form id="formElem">
  <input type="text" name="name" value="Bora">
  <input type="text" name="surname" value="Lee">
  <input type="submit">
</form>

<script>
  const formElem = document.querySelector("#formElem")
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    // POST 방식으로 폼 데이터 전송
    let response = await fetch('/article/formdata/post/user', {
      method: 'POST',
      body: new FormData(formElem)
    });

    let result = await response.json();
    alert(result.message);
  };
</script>
</body>
```

## 1-2 FormData 메서드

- `formData.append(name,value)` : `name`과 `value`를 가진 폼 필드 추가
- `formData.append(name,blob,fileName)` : `<input type="file">` 형태의 필드 추가
- `formData.delete(name)` : `name`에 해당하는 필드 삭제
- `formData.get(name)
- `formData.has(name)
- `formData.set(name,value)`
- `formData.set(name,blob,fileName)`

>폼은 이름이 같은 필드를 허용함
>`append`는 이름이 같은 필드를 여러번 추가 가능
>`set`은 `name`과 동일한 이름의 필드를 모두 제거하고 새로운 필드를 추가

---
# 2. URL 객체

## 2-1 URL 객체 생성

- URL 객체는 `fetch` 등 문자열 url이 사용되는 곳에서 사용 가능
```
let new URL(url, [base])
```

- `url` : 전체 URL 또는 경로
- `base` : `url`에 경로만 명시될 경우 `base`에 연관된 URL 생성
```
let url = new URL('/profile/admin', 'https://base.com')
alert(url) // https://base.com/profile/admin
```

## 2-2 URL components

- `url.protocol` 등 URL의 컴포넌트에 접근 가능

![[URLcomponents.PNG]]

## 2-3 SearchParams "?..."

- `url.searchParams` 를 통해 접근 가능
> 매개 변수에 스페이스나 라틴언어가 아닌 경우 인코딩 필요

- 파라미터를 위한 몇 가지 메서드를 제공(Map과 유사함)

|Method|Content|
|---|---|
|`append(name,value)`|파라미터 추가|
|`delete(name)`|파라미터 삭제|
|`get(name)`|`name`인 파라미터 반환|
|`getAll(name)`|`name`인 파라미터 전체 반환|
|`has(name)`|`name`인 파라미터 존재 유무 확인|
|`set(name)`|파라미터 추가, 변경|
|`sort()`|파라미터 정렬|


## 2-4 Encoding

- [RFC3986](https://datatracker.ietf.org/doc/html/rfc3986)에서 URL에 허용되는 문자 정의, 정의되지 않은 문자는 인코딩 필요
>URL 객체는 인코딩을 자동으로 수행

- 문자열로 url을 생성할 때, 자바스크립트는 인코딩을 위한 몇 가지 메서드를 제공

- `encodeURI`  : URL 전체 인코딩
- `decodeURI`
- `encodeURIComponent` : 파라미터, 해쉬, 경로와 같은 URL 컴포넌트를 인코딩
- `decodeURIComponent`
>`encodeURI`는 URL에서 허용되지 않은 문자만 인코딩
>`#`, `$`, `&`, `+`, `/`, `:`, `;`, `=`, `?`, `@`,`,` 은 URL에서 허용하는 문자이므로 `encodeURI` 메서드는 인코딩 X
>`encodeURICompoent`는 해당 문자들까지 인코딩
```
let url = encodeURI('Rock&Roll') // Rock&Roll
let url2 = encodeURIComponent('Rock&Roll') // Rock%26Roll
```

> URL, URLSearchParams 객체는 RFC3986 URI 명세서 기반이나
> `encode` 관련 메서드는 RFC2396 URI 명세서 기반임

---
# 3. XMLHttpRequest

- 자바스크립트에서 HTTP 요청을 할 수 있는 객체
- 모든 데이터 형식에 대해 동작하며 파일 업로드 / 다운로드, 진행 상황 추적 등의 기능 제공
> 최신 자바스크립트는  `fetch` 메서드를 지원하여 몇 가지 경우가 아니면 사용하지 않음

## 3-1 XMLHttpRequest 객체 생성

- XMLHttpRequest는 비동기 / 동기 모드로 나뉘어 동작
```
1. XMLHttpRequest 객체 생성
let xhr = new XMLHttpRequest();

2. open 메서드 호출 (아직 연결X)
xhr.open(method, URL, [async,user,password])
// method : "GET", "POST", ...
// URL
// async : false 시 동기적으로 동작
// user, password : HTTP auth 로그인 정보

3. Send(연결)
xhr.send([body])
// "POST"인 경우 request body를 함께 보냄

4. 수신
// 3가지 이벤트 존재
// onload : 요청이 완료시(HTTP status 400,500 등) 또는 응답 완료시
// onerror : 네트워크 에러 등으로 요청이 완료되지 않음
// onprogress : 응답이 다운로드 중 일 때
xhr.onload = function(){
	alert(`Loded : ${xhr.status} ${xhr.response}`)
}

xhr.onerror = function(){
	alert(`Networt Error`)
}

xhr.onprogress = function(event){
	alert(`Received ${event.loaded} of ${event.total}`)
}
```

## 3-2 XMLHttpRequest 프로퍼티

- 서버에서 응답 완료 시, 프로퍼티를 얻을 수 있음

|Property|Content|
|---|---|
|`status`|HTTP 상태 코드(200,404,403)|
|`statusText`|HTTP 상태 메시지(OK, Not Found)|
|`response`|response body|
|`timeout`|요청 제한 시간|
|`responseType`|응답 포맷 형식 설정|
|`readyState`|진행 상태 반환|

- `responseType` : response body의 형식을 설정
	- `""` : default
	- `text`
	- `arraybuffer`
	- `blob`
	- `document`
	- `json`
> 오래된 자바스크립트 버전은 `responseText, reponseXML` 프로퍼티에서 응답 형태와 포맷 형식 지정

- `readyState` : 진행 상태 표시
	- 0 : UNSENT(초기화)
	- 1 : OPENED(`open()` 호출)
	- 2 : HEADERS_RECEIVED(응답 헤더 도착)
	- 3 : LOADING(응답 데이터 도착)
	- 4 : DONE(완료)
> 데이터 패킷이 도착할 때마다 상태 3번을 반복
> `readystatechange()`라는 오래된 메서드 존재

## 3-3 요청 중단

- 요청 종료시 `xhr.abort()` 메서드 호출
>중단 메서드 트리거시 Status 는 0

## 3-4 동기적 요청

- `open()` 메서드의 `async` 속성을 `false`로 설정시 요청은 동기적으로 진행
>자바스크립트는 `send()` 메서드의 실행을 중단하며 응답이 도착할 때, 메서드 재개
>이러한 동기적 동작은 로딩 완료시까지 자바스크립트의 동작을 멈추므로 잘 사용되지 않음

## 3-5 HTTP-headers

- XMLHttpRequest 객체는 커스텀 헤드를 전송할 수 있고 응답 헤더를 읽을 수 있음
>몇 가지 헤더는 브라우저만 배타적으로 설정 가능

- `setRequestHeader(name, value)` : 헤더 생성
```
xhr.setRequestHeader('Content-Type', 'application/json')

// setRequestHeader는 덮어쓰기가 불가능
xhr.setRequestHeader('Content-Type', 'application/text')

// 헤더의 내용
"Content-Type" : "application/json", "application/text"
```

- `getResponseHeader(name)` : `Set-Cookie`를 제외한 헤더 반환
- `getAllResponseHeaders()` : `Set-Cookie`를 제외한 모든 헤더 반환

## 3-6 POST, FormData

- POST 요청을 만들기 위해 FormData 객체를 이용
```
<form name="person">
	<input name="name" value="John"<
	...
</form>

<script>
	1. 객체 생성
	let formData = new FormData(document.forms.person);

	2. 필드 추가
	formData.append("middle", "lee")

	3. Send
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "/article/xmlhttprequest/post/user");
	xhr.send(formData);
	xhr.onload = () => alert(xhr.response);
</script>
```

> Form은 `multipart/form-data` 헤더를 보내 인코딩

> JSON의 경우 `JSON.stringfy(object)`메서드를 통해 JSON 변환
> `Content-Type : application/json; charset=utf-8` 헤더를 정의하면 프레임워크에서 자동으로 JSON 변환

## 3-7 업로드 절차

- 업로드시에만 트리거되는 `xhr.upload` 이벤트를 통해 업로드 추적 가능
	- `loadstart`
	- `progress`
	- `abort`
	- `error`
	- `load`
	- `timeout`
	- `loadend`
```
xhr.upload.onprogress = function(){ ... }
xhr.upload.onload = function(){ ... }
xhr.upload.onerror = function(){ ... }
```

## 3-8 Cross-Origin 요청

- XMLHttpRequest 객체 또한 CORS 요청이 가능
>`fetch`와 동일하게 default로 HTTP 자격 증명을 보내지 않음
>`xhr.withCredentials : true`일 떄 자격 증명 보냄
```
let xhr = new XMLHttpRequest();
xhr.withCredentials = true;
...
```

## 3-9 파일 업로드 재개하기


1. 업로드 재개시 서버에서 수신받은 바이트의 정확한 숫자를 파악
```
// 업로드 할 파일
let fileId = ...

// X-File-id 헤더에서 파일 업로드 추적
let response = await fetch('status', {
	headers : {
		'X-File-Id' : fileId
	}
]});

// 서버가 가진 파일 바이트 수 반환(= 서버에 업로드 된 파일 크기)
let startByte = +await response.text();
```

2. XMLHttpRequest 객체를 통해 남은 파일 전송
```
xhr.open("POST", "upload", true);

// 업로드 파일 명시
xhr.setRequestHeader('X-File-id', fileId);

// 업로드 시작할 바이트 명시
xhr.setRequestHeader('X-Start-Byte',startByte);

// 업로드 된 바이트 제외하고 파일 전송
xhr.send(file.slice(startByte));
```

---
#FormData #url #XMLHttpRequest