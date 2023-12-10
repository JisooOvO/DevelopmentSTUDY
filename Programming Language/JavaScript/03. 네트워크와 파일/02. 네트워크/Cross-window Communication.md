```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. Same-Origin

- Same Origin 정책은 윈도우와 프레임 간 접근을 제한
>한 사람이 2개의 다른 페이지를 열었을 때 두 페이지 간 스크립트의 간섭을 막기 위함

- URL간 같은 프로토콜, 도메인, 포트를 가지고 있다면 Same Origin 으로 취급
```
https://site.com
https://site.com/hola
https://site.com:8080 // 포트번호가 다름 -> not Same Origin
```

> 윈도우 팝업 창이나 `<iframe>` 등 윈도우가 현재 페이지와 
> 참조가 동일한 origin에서 발생했다면 해당 윈도우에 대한 모든 권한을 가짐
> `location`은 유일한 예외로서 다른 페이지에서 수정 가능(읽기는 불가능)

## 1-1 하위 도메인

>두 URL이 같은 2 레벨 수준 도메인을 공유할 경우
>브라우저는 두 URL을 Same Origin으로 정의
```
// 모두 Same Origin
john.site.com
peter.site.com
...

// 다음과 같이 설정
document.domian = 'site.com';
```

## 1-2 iframe 태그에서 Same Origin

- `<iframe>` 태그는 별도의 document, window 객체를 현재 창 내에 포함시킴
> `iframe.contentWindow / iframe.contentDocument` 를 통해 내부 document / window에 접근

- 어떤 문서를 현재 창 내부로 추가시키려고 할 때 브라우저는 iframe의 SO를 체크
>만약 두 사이트가 다른 SO를 가진다면 접근이 제한됨
```
<body>
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // we can get the reference to the inner window
    let iframeWindow = iframe.contentWindow; // OK

    try {
      // ...but not to the document inside it
      let doc = iframe.contentDocument; // ERROR
    } catch(e) {
      alert(e); // Security Error (another origin)
    }

    // also we can't READ the URL of the page in iframe
    try {
      // Can't read URL from the Location object
      let href = iframe.contentWindow.location.href; // ERROR
    } catch(e) {
      alert(e); // Security Error
    }

    // ...we can WRITE into location (and thus load something else into the iframe)!
    iframe.contentWindow.location = '/'; // OK

	// iframe.contentWidnow.onload 는 SO가 다르면 접근 불가
    iframe.onload = null; 
    // clear the handler, not to run it after the location change
  };
</script>
</body>
```

> 오직 `iframe.contentWindow` 의 값 읽기와 `location` 값 쓰기만 가능

- `iframe`으로 불러온 문서의 로딩시간이 존재함
>로딩이 완료되기 이전에 이벤트 핸들러 호출시 에러 발생


### 1-2-1 iframe 객체를 가져오는법

- `window.frames` 컬렉션을 이용하면 iframe을 가져올 수 있음
	- `window.frames[0]` : document의 첫 번째 프레임
	- `window.frames.iframeName` :  이름이 `iframeName`인 프레임

- 프레임 간 계층 구조를 지님
	- `window.frames` : 자식 프레임
	- `window.parent` : 부모 프레임
	- `window.top` : 최상위 프레임
```
window.frames[0].parent === window // true
```

### 1-2-2 sandbox 속성

- `iframe`의 `sandbox` 속성은 신뢰할 수 없는 코드로부터 보호함
> 기본적으로 모든 것을 제한하지만 `sandbox` 속성에 입력하는 값들에 대해 접근 가능
> 같은 SO 내에서 iframe을 호출하더라도 접근 제한
```
<iframe sandbox src="..."> // 엄격한 수준의 제한
<iframe sandbox="allow-forms allow-popups" src="...". // forms, popup 접근 허용
```

|value|content|
|---|---|
|`allow-same-origin`|`sandbox`의 different origin 정책 제거|
|`allow-top-navigation`|`parent.location` 변경 가능|
|`allow-forms`|iframe으로부터 submit 가능|
|`allow-scripts`|iframes으로부터 스크립트 실행 가능|
|`allow-popups`|`window.open` 허용|

## 1-3 다른 페이지간 통신

- `postMessage` 인터페이스는 SO 정책을 우회하여 다른 window간 메시지를 주고 받을 수 있게 함

### 1-3-1 메시지 보내기

- 메시지를 받을 Window의 `postMesasge` 메서드를 호출
```
// win 으로 메시지 보내기
win.postMesage(data, targetOrigin)
	- data : object
	- targetOrigin : 해당 창의 origin
```

### 1-3-2 메시지 받기

- 메시지를 받기 위해서는 `postMessage`가 호출될 때 발생하는 `message` 이벤트 핸들러를 사용함
- 이벤트에는 3가지 프로퍼티가 존재
	- `data`
	- `origin`
	- `source` : 보낸 window에 대한 참조
```
window.addEventListener("message", function(event){
	if(event.origin != 'http://targetsite.com') return;
	alert("received:" + event.data);
});
```

---
#SO #iframe #postMessage