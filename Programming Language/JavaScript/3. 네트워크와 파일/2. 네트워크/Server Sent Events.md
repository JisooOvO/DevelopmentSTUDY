```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. Server Sent Events

- 서버와의 연결을 유지하고 서버로부터 이벤트를 수신할 수 있는 내장 클래스 `EventSource`
- WebSocket처럼 연걸이 끊기지 않지만 몇 가지 차이가 있음

|`WebSocket`|`EventSource`|
|---|---|
|Bi-directional: both client and server can exchange messages|One-directional: only server sends data|
|Binary and text data|Only text|
|WebSocket protocol|Regular HTTP|

- `EventSource`는 웹소켓보다 덜 유용한 통신방법이지만 더 간단하며 자동 재연결 기능이 있음
>웹소켓의 경우 자동 재연결을 수동으로 구현해야함

## 1-1 메시지 받기

- 메시지를 받기 위해서 `EventSource` 객체를 생성해야함
```
let message = new EventSource(url);

// 브라우저는 url과의 연결을 유지하며 이벤트를 기다림
// 서버는 상태코드 200과 함께 응답 헤더로
// 'Content-Type : text/event-stream'를 전송
```

- 다음과 같은 형식으로 메시지 작성
```
data : Message 1

data : Message 2

data : Message 3
data : of two lines
```

> 메시지는 `data:` 이후에 위치하며 `:` 사이 스페이스는 선택사항
> 메시지는 2번의 라인 엔터 `\n\n` 로 구분
> 1번의 엔터 `\n`는 데이터를 추가로 보내는 것을 의미

## 1-2 CORS

- `EventSource`는 CORS를 지원하며 자격 증명시 추가 옵션 필요
- `withCredentials` 옵션만 허용
```
let source = new EventSource("https://another-site.com/events", {
	withCredentials : true
});
```

## 1-3 재연결 및 중지

- `EventSource`는 자동으로 재연결을 지원하므로 신경 쓸 일은 없음
- 메시지에 `retry`를 사용하면 권장 지연 설정 가능
```
retry : 15000
data : hello, 난 15초의 재연결 지연을 설정헀어
```

- 서버에서 브라우저의 재연결 중지시 HTTP Status 204로 응답
- 브라우저에서 연결 종료시 `eventSource.close()` 호출

- `Content-Type`이 올바르지 않거나 HTTP 코드가 301, 307, 204가 아닌 경우 에러 이벤트 발생
>이 경우 브라우저는 재 연결을 하지 못 함, 새로운 EventSource 객체를 생성해야함

## 1-4 메시지 아이디

- id를 설정하면 연결이 중단되었다 재개될 경우 어떤 메시지를 받았는지 알 수 있음
- `eventSource.lastEventId` 프로퍼티를 통해 마지막으로 전달된 메시지 아이디 확인 가능
>데이터를 받은 이후 id를 저장해야하므로 id는 data 이후에 위치해야 함
```
data : Message 1
id : 1

data : Message 2
id : 2

data : Message 3
id : 3
```

## 1-5 readyState 프로퍼티

- `EventSource`는 `readyState` 프로퍼티를 제공하며 연결 상태를 확인
	- `EventSource.CONNECTING = 0`;
	- `EventSource.OPEN = 1`;
	- `EventSource.CLOSED = 2`;

## 1-6 이벤트 타입

- 기본적으로 3가지 이벤트 제공
	- `message` : 메시지 수신, `event.data` 통해 메시지 접근 가능
	- `open` : 연결
	- `error` : 연결 실패(HTTP Status 500 등)

- 추가로 메시지에 `event :`를 실어 추가 이벤트 생성 가능
```
event : join
data : Bob

data : Hello

event : leave
data Bob
```

```
eventSource.addEventListener('join', (e)=>{
	alert(`Joined ${e.data}`) // Bob
})

eventSource.addEventListener('message', (e)=>{
	alert(`message ${e.data}`) // Hello
})

eventSource.addEventListener('leave', (e)=>{
	alert(`leaved ${e.data}`) // Bob
})
```

---
#ServerSentEvents