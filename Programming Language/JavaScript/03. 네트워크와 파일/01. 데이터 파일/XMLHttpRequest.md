```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. XMLHttpRequest

- 자바스크립트에서 HTTP 요청을 할 수 있는 객체
- 모든 데이터 형식에 대해 동작하며 파일 업로드 / 다운로드, 진행 상황 추적 등의 기능 제공
> 최신 자바스크립트는  `fetch` 메서드를 지원하여 몇 가지 경우가 아니면 사용하지 않음

## 1-1 XMLHttpRequest 객체 생성

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

## 1-2 XMLHttpRequest 프로퍼티

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

## 1-3 요청 중단

- 요청 종료시 `xhr.abort()` 메서드 호출
>중단 메서드 트리거시 Status 는 0

## 1-4 동기적 요청

- `open()` 메서드의 `async` 속성을 `false`로 설정시 요청은 동기적으로 진행
>자바스크립트는 `send()` 메서드의 실행을 중단하며 응답이 도착할 때, 메서드 재개
>이러한 동기적 동작은 로딩 완료시까지 자바스크립트의 동작을 멈추므로 잘 사용되지 않음

## 1-5 HTTP-headers

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

## 1-6 POST, FormData

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

## 1-7 업로드 절차

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

## 1-8 Cross-Origin 요청

- XMLHttpRequest 객체 또한 CORS 요청이 가능
>`fetch`와 동일하게 default로 HTTP 자격 증명을 보내지 않음
>`xhr.withCredentials : true`일 떄 자격 증명 보냄
```
let xhr = new XMLHttpRequest();
xhr.withCredentials = true;
...
```

## 1-9 파일 업로드 재개하기

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
#XMLHttpRequest