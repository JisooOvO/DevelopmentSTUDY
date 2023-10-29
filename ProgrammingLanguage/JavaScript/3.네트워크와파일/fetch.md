```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. fetch

- 서버에 네트워크 요청을 보내는 메서드
- `fetch` 호출시 프라미스가 반환
```
let promise = fetch(url, [options])
```
- `url`
- `options` : 메서드나 헤더를 지정 가능 (default `GET`)

## 1-1 응답 시퀀스

1. 서버에서 응답 헤더를 받을 때 `fetch` 호출시 프라미스 생성
> 내장 클래스 `Response`의 상태 인스턴스가 함께 호출됨
> 본문(body)은 아직 도착하기 전이지만 응답 헤더를 통해 요청 성공 여부를 파악 가능
```
let response = await fetch(url);

if(response.ok){
	let json = await response.json();
}else{
	...
}
```

2. `response`객체의  메서드를 호출하여 본문(body)을 받음
	- 응답 메서드는 단 하나만 사용 가능
	- `response.text()` : 응답을 텍스트 형태로 반환
	- `response.json()` : 응답을 JSON 형태로 파싱 
	- `response.formData()`
	- `response.blob()`
	- `response.arrayBuffer()`
	- `response.body`
```
let response = await fetch(url);
let commits = await response.json();
```

## 1-2 응답 헤더

- `response.headers`에 `Map`과 유사한 형태로 저장
>`Map`은 아니지만 맵과 유사한 메서드를 지원, 순회가능
```
let response = await fetch(url)

// application/json; charset=utf-8
// ...
```

- `headers`옵션을 통해 `fetch`에 요청 헤더 설정 가능
```
let response = fetch(url, {
	headers : {
		Authentication : 'secret'
		...
	}
})
```

- `headers`를 통해 설정할 수 없는 [금지헤더](https://fetch.spec.whatwg.org/#forbidden-header-name)가 존재함
	- - `Accept-Charset`, `Accept-Encoding`
	- `Access-Control-Request-Headers`
	- `Access-Control-Request-Method`
	- `Connection`
	- `Content-Length`
	- `Cookie`, `Cookie2`
	- `Date`
	- `DNT`
	- `Expect`
	- `Host`
	- `Keep-Alive`
	- `Origin`
	- `Referer`
	- `TE`
	- `Trailer`
	- `Transfer-Encoding`
	- `Upgrade`
	- `Via`
	- `Proxy-*`
	- `Sec-*`
> HTTP의 목적에 맞고 안전하게 사용하는 헤더들 -> 브라우저만 배타적으로 설정, 관리할 수 있음

## 1-3 POST 요청

- `GET`이외의 요청시 추가 옵션 사용
	- `method` : `GET. POST, PUT, DELETE ...
	- `body` : 문자열, FormData, Blob, URLSearchParams 등의 본문
```
let user = {
	name : "John",
	surname : "Smith"
};

let response = await fetch(url, {
	method : 'POST',
	headers : {
		'Content-Type' : 'application/json;charset=utf-8'
	},
	body : JSON.stringify(user)
});
```

- `POST` 요청시 주의사항
> 요청본문이 문자열일 때 `Content-Type` 헤더가 `text/plain;charset=UTF-8`로 기본 설정
> JSON 전송시 `Content-Type' : 'application/json;charset=utf-8'`로 설정해야함

## 1-4 이미지 전송하기

- Blob, BufferSource 객체 사용시 `fetch`로 바이너리 데이터 전송 가능
>Blob 객체는 내장 타입이 존재하므로 `Context-Type` 설정할 필요 없음
>*모든 예시 코드 최상단에 async가 있다고 전제한다*
```
  // canvas를 통해 마우스 움직임에 따라 그림 그리기
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>
  <input type="button" value="전송" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

    // 전송이 잘 되었다는 응답이 오고 이미지 사이즈가 얼럿창에 출력됩니다.
    let result = await response.json();
    alert(result.message);
```

---
# 2. fetch 다운로드 진행률 추적

*업로드 진행상황 추적하는 방법 : XMLHttpRequest 사용*

- 다운로드 진행상황을 추적하기 위해 `response.body`의 프로퍼티를 사용할 수 있음
> `response.body`는 읽을 수 있는 프로퍼티
>이는 `ReadableStram`이라는 특별한 객체이며 body의 덩어리를 제공함 [Streams API](https://ko.javascript.info/fetch-progress)
```
1. fetch
let response = await fetch(url)
const reader = response.body.getReader();

2. total length 구하기
const contentLength = +response.headers.get('Content-Length');

3. 데이터 읽어서 chunks 배열에 저장하기
let receivedLength = 0;
let chunks = [];
while(true){
	// read() 메서드를 통해 done, value 값을 읽을 수 있음
	const {done, value} = await reader.read();
	if (done) break;

	chunks.push(value);
	receivedLength += value.length;
	console.log(`Received ${value.length} bytes`);
}

4. 데이터 chunks를 배열에 저장
let chunksAll = new Uint8Array(receivedLength)
let position = 0;
for (let chunk of chunks){
	chunksAll.set(chunk,position)
	position += chunk.length;
}

5. 문자열 디코딩
let result = new TextDecoder("utf-8").decode(chunksAll);
let commits = JSON.parse(result);

// 바이너리 콘텐츠일 경우 4,5단계는 다음과 같다
let blob = new Blob(chunks);
```

- `reader.read()` 는 2가지 속성을 가진 객체
	- `done` : 읽기 완료시 `true`
	- `value` : byte의 배열(Uint8Array)

---
# 3. Fetch 중단방법

## 3-1 AbortController

- `AbortController` 는 특별한 내장 객체로써 비동기 작업을 중단하는데 사용
```
let controller = new AbortController();
let signal = controller.signal;

signal.addEventListener('abort',()=>alert("abort!"));

controller.abort(); // abort!!
```

- `AbortController`는 단 하나의 메서드 `abort()`와 프로퍼티 `signal`을 가짐
>`abort()` 메서드 호출시 `signal` 프로퍼티가 `abort` 이벤트를 발생
>`signal.aborted` 프로퍼티의 값이 `true`가 됨

## 3-2 fetch에 적용하기

- `fetch` 메서드는 `signal` 프로퍼티를 가지고 있음
>`AbortContrller` 객체의 `signal` 프로퍼티를 `fetch`에 전달
```
// 1초 뒤 중단
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

// AbortController의 signal이 abort 이벤트를 발생시
// fetch가 중단되며 AbortError발생
// 따라서 try...catch문으로 핸들링
try{
	let response = await fetch(url. {
		signal : controller.signal
	});
} catch(err){
	if(err.name == 'AbortError'){
		...
	}else{
		throw err;
	}
}
```

- 다수의 URL을 비동기적으로 `fetch` 할 경우 `AbortController` 객체 하나로 통제 가능
```
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve,resject) => {
	...
	controller.signal.addEventListener('abort',reject);
});

let fetchJobs = urls.map(url=> fetch(url,{
	signal : controller.signal
}));

let result = await Promise.all([...fetchJobs, ourJob]);

// 만약 controller.abort()가 어디에서든 호출되면
// 모든 fetch와 ourJob이 중단됨
```

---
#fetch