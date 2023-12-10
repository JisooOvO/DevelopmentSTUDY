```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. Polling

- 간단히 구현가능한 서버 통신 방식
> 웹소켓이나 Server-sent event 같은 프로토콜 없이 서버와 지속적 커넥션 유지 가능

## 1-1 Regular Polling

- 응답시 서버는 클라이언트가 온라인이라는 정보를 받음
>이후 서버는 그 때까지 받았던 메시지 패킷을 전송

- 단점 :
	- 메시지는 요청 사이에 최대 10초의 지연을 두고 전달
	- 메시지가 없어도 서버는 10초마다 요청을 받음

## 1-2 Long Polling

- 지연없이 메시지를 전달하는 방식

1. 요청을 서버로 전송
2. 서버는 메시지를 받을 때까지 연결을 끊지 않음
3. 메시지가 도착하면 서버는 메시지에 응답
4. 브라우저는 즉시 새 요청을 보냄

![[LongPolling.PNG]]

## 1-3 데모 채팅 프로그램

```
// 📁 index.html
<!DOCTYPE html>
<script src="browser.js"></script>

All visitors of this page will see messages of each other.

<form name="publish">
  <input type="text" name="message" />
  <input type="submit" value="Send" />
</form>

<div id="subscribe">
</div>

<script>
  new PublishForm(document.forms.publish, 'publish');
  // random url parameter to avoid any caching issues
  new SubscribePane(document.getElementById('subscribe'), 'subscribe?random=' + Math.random());
</script>

// 📁 browser.js
// Sending messages, a simple POST
function PublishForm(form, url) {
  function sendMessage(message) {
    fetch(url, {
      method: 'POST',
      body: message
    });
  }

  form.onsubmit = function() {
    let message = form.message.value;
    if (message) {
      form.message.value = '';
      sendMessage(message);
    }
    return false;
  };
}

// Receiving messages with long polling
function SubscribePane(elem, url) {
  function showMessage(message) {
    let messageElem = document.createElement('div');
    messageElem.append(message);
    elem.append(messageElem);
  }

  async function subscribe() {
    let response = await fetch(url);
    if (response.status == 502) {
      // let's reconnect
      await subscribe();
    } else if (response.status != 200) {
      // Show Error
      showMessage(response.statusText);
      // Reconnect in one second
      await new Promise(resolve => setTimeout(resolve, 1000));
      await subscribe();
    } else {
      // Got message
      let message = await response.text();
      showMessage(message);
      await subscribe();
    }
  }
  
  subscribe();
}

// 📁 server.js
let http = require('http');
let url = require('url');
let querystring = require('querystring');
let static = require('node-static');
let fileServer = new static.Server('.');
let subscribers = Object.create(null);

function onSubscribe(req, res) {
  let id = Math.random();

  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  res.setHeader("Cache-Control", "no-cache, must-revalidate");

  subscribers[id] = res;

  req.on('close', function() {
    delete subscribers[id];
  });
}

function publish(message) {
  for (let id in subscribers) {
    let res = subscribers[id];
    res.end(message);
  }
  subscribers = Object.create(null);
}

function accept(req, res) {
  let urlParsed = url.parse(req.url, true);
  
  // new client wants messages
  if (urlParsed.pathname == '/subscribe') {
    onSubscribe(req, res);
    return;
  }

  // sending a message
  if (urlParsed.pathname == '/publish' && req.method == 'POST') {
    // accept POST
    req.setEncoding('utf8');
    let message = '';
    req.on('data', function(chunk) {
      message += chunk;
    }).on('end', function() {
      publish(message); // publish it to everyone
      res.end("ok");
    });
    return;
  }

  // the rest is static
  fileServer.serve(req, res);
}

function close() {
  for (let id in subscribers) {
    let res = subscribers[id];
    res.end();
  }
}

// -----------------------------------
if (!module.parent) {
  http.createServer(accept).listen(8080);
  console.log('Server running on port 8080');
} else {
  exports.accept = accept;
  if (process.send) {
     process.on('message', (msg) => {
       if (msg === 'shutdown') {
         close();
       }
     });
  }
  process.on('SIGINT', close);
}
```

---
#polling