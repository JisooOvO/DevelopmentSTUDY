```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. 웹소켓

- [RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455)에 정의 된 프로토콜
- 서버와 브라우저간 연결을 유지한 상태로 데이터 교환 가능
>데이터는 패킷 형태로 전달되며 전송은 양방향으로 이루어짐

- `ws`라는 특수 프로토콜 사용
```
// npm install ws
let socket = new WebSocket("wss://homepage.com");
```

- `ws://`와 `wss://`의 차이 :
>`ws`는 데이터를 암호화하지 않은채로 전송
>`wss`는 TSL 계층을 통과하여 전송되므로 데이터 암복호화가 이루어짐

## 1-1 웹소켓 이벤트

```
let socket = new WebSocket(url);

// open : 커넥션이 연결되었을때 발생
socket.onopen = function (e) {
	// send : 데이터 전송
	socket.send("Hello!");
}

// message : 데이터 수신시 발생
socket.onmessage = function(e) {
	alert(`데이터 : ${e.data}`);
}

// close : 커넥션 종료시 발생
socket.onclose = function(e) {
	// 정상적인 경우
	if (event.wasClean) { alert(`정상 종료, code=${e.code} reason=${e.reason}`) }
	// 프로세스 죽거나 네트워크 장애시 code = 1006
	else { alert(`커넥션이 죽었습니다`) }
}

// error : 에러 발생시
socket.onerror = function(e){
	alert(e);
}
```

## 1-2 웹소켓 핸드세이크

![[WebSocket.PNG]]

- `new WebSocket()`을 호출하여 소켓 생성시 즉시 연결 시작
>커넥션 유지되는 동안 브라우저는 헤더를 통해 서버에 웹소켓 지원하는지 물어봄
>서버가 OK 응답을 하면 서버-브라우저간 통신은 HTTP가 아닌 웹소켓을 통해 진행

- 웹소켓은 기본적으로 CORS 요청을 지원
- 오래된 서버는 웹소켓 통신 지원하지 않음 -> 호환성 문제 X

### 1-2-1 브라우저측 웹소켓 요청 헤더

```
GET /chat
Host : homepage.com
Origin : https://homepage.com
Connection : Upgrade // 클라이언트 측에서 프로토콜 변경 요청
Upgrade : websocket // 변경 요청한 프로토콜이 websocket
Sec-WebSocket-Key : Iv8io/92... // 서버가 웹소켓 프로토콜 지원하는지 확인
Sec-WebSocket-Version : 13 // 웹소켓 프로토콜 버전
Sec-WebSocket-Extensions // 웹소켓 프로토콜 기능 확장
Sec-WebSocket-Protocol // 서브프로토콜 사용
```

> XMLHttpRequest , fetch로 유사한 헤더를 가진 HTTP 요청 생성 불가

- Extensions :
	- `deflate-frame` : 브라우저에서 데이터 압축 지원

- Protocol :
	- `soap, wamp` : SOAP, WAMP 프로토콜을 준수하는 데이터 전송
	- [서브프로토콜 목록](https://www.iana.org/assignments/websocket/websocket.xml) 

- `new WebSocket()`의 두 번째 매개변수에 Extension, Protocol 설정 가능
```
let socket = new WebSocket("wss://...", ["soap","wamp"])
```

### 1-2-2 서버측 웹소켓 동의 응답 헤더(상태코드 101)

```
101 Switching Protocols
Upgrade : websocket
Connection : Upgrade
Sec-WebSocket-Accept : hsBlsjul.... // 알고리즘을 통해 만든 Sec-WebSocket-Key
Sec-WebSocket-Extensions : defalte-frame
Sec-WebSocket-Protocol : soap
```

## 1-3 데이터 전송

- 웹소켓 통신은 프레임(frame)이라 불리는 데이터 조각을 사용해 이루어짐
	- 프레임 종류
		- 텍스트 프레임
		- 이진 데이터 프레임
		- 핑퐁 프레임 : 커넥션이 유지되는지 확인하는 프레임(자동 생성)
		- 커넥션 종료 프레임 등

- 브라우저 환경에서 개발자는 텍스트나 이진 데이터 프레임만 다룸
>WebSocket의 `send()` 메서드는 텍스트나 이진 데이터만 보낼 수 있기 때문

- 데이터를 받을 때 텍스트는 항상 문자열 형태
>이진데이터의 경우 Blob 또는 ArrayBuffer 중 하나 선택 가능
>`socket.binaryType` 프로퍼티를 사용하여 선택(기본 값 Blob)
>Blob은 `<a>, <img>` 태그와 바로 사용 가능
>개별 데이터 바이트에 접근해야할 경우 ArrayBuffer로 사용
```
socket.binaryType = "arraybuffer";
socket.onmessage = (e) => {
	...
}
```

## 1-4 전송 제한

- 브라우저에서 `send()` 메서드를 계속 호출 할 수는 있음
>하지만 데이터가 버퍼 메모리에 쌓이면서 
>네트워크 속도가 데이터를 송신하기에 충분할 때만 송신

- `socket.bufferedAmout` 프로퍼티를 사용하여 메모리에 쌓인 바이트 수 확인 가능
```
// 100ms마다 소켓에 쌓여있는 바이트가 없는 경우 데이터 전송
setInterval(()=>{
	if(socket.bufferedAmount == 0){
		socket.send(moreData());
	}
}, 100);
```

## 1-5 커넥션 닫기

- 연결 주체(서버, 브라우저) 중 한쪽에서 커넥션 닫기를 원할 경우 `close()` 메서드 사용
```
// 닫기 요청 주체
socket.close([code], [reason])

// 다른 주체
socket.onclose = (e) => {
	e.code = code
	e.reason = reason
}
```
- `code` : 커넥션 종료시 사용하는 특수코드(옵션)
- `reason` : 커넥션 종료 사유 문자열(옵션)

- [코드 목록](https://datatracker.ietf.org/doc/html/rfc6455#section-7.4.1)
	- `1000` : 정상 종료(기본 값)
	- `1006` : 커넥션이 유실된 경우(no close frame)
	- `1001` : 연결 주체 중 한쪽이 떠남(서버 셧 다운, 브라우저 페이지 종료)
	- `1009` : 메시지가 너무 커서 처리 불가
	- `1011` : 서버 측 비정상적인 에러 발생
> `1000` 보다 작은 값은 예약 값이라서 설정시 에러 발생

## 1-6 커넥션 상태

- `socket.readyState` 프로퍼티의 값을 확인하면 커넥션 상태 확인
	- 0 : CONNECTING
	- 1 : OPEN
	- 2 : CLOSING
	- 3 : CLOSED

## 1-7 채팅 앱 만들기

- 웹소켓 API와 Node.js의 웹소켓 모듈을 이용한 채팅 앱
- 재연결, 인증 등 고급 매커니즘이 포함되어 있지 않음
```
// 📁 index.html
// 메시지 폼
<form name="publish">
	<input type="text" name="message">
	<input type="submit" value="전송">
</form>

// 메시지 받을 요소
<div id="messages"></div>
```

```
// 📁 Browser.js
<script>
	// 커넥션
	let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

	// 메시지 전송
	document.forms.publish.onsubmt = function() {
		let outgoingMessage = this.message.value;

		socket.send(outgoingMessage);
		return false;
	};

	// 메시지 수신 및 출력
	socket.onmessage = function(event) {
		// 메시지 데이터
		let message = event.data;
		
		let messageElem = document.createElement('div');
		messageElem.textContent = message;
		document.getElementById('messages').prepend(messageElem);
	}
</script>
```

```
// 📁 Node.js
<script>
	const ws = new require('ws');
	const wss = new ws.Server({noServer : true});
	
	const clients = new Set();
	
	http.createServer((req, res) => {
		wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
	});
	
	function onSocketConnect(ws){
		clients.add(ws);
	
		ws.on('message', function(message){
			// 최대 메시지 길이는 50
			message = message.slice(0,50);
		})
	
		for(let client of clients){
			client.add(message);
		}
	};
	
	ws.on('close',function(){
		clients.delete(ws);
	})
</script>
```

---
#websocket