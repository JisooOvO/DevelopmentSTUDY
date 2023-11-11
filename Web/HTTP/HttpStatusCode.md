```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```

# 1. Http Status Code

- HTTP 응답 상태 코드는 특정 HTTP 요청이 성공적으로 완료되었는지 알려줌
- 
- 응답은 5개의 그룹으로 나뉨 
	- 정보를 제공하는 응답
	- 성공적인 응답
	- 리다이렉트
	- 클라이언트 에러
	- 서버 에러

- 상태 코드는 [section 10 of RFC 2616](https://tools.ietf.org/html/rfc2616#section-10)에 정의

# 2. 정보 응답

|Status Code|Description|
|---|---|
|100 Continue|지금까지의 상태가 괜찮으며 클라이언트가 계속해서 요청을 하거나 이미 요청을 완료한 경우에는 무시해도 되는 것을 알림|
|101 Switching Protocol|클라이언트가 보낸 Upgrade 요청 헤더에 대한 응답에 들어가 서버에서 프로토콜 변경할 것을 알림|
|102 Processing|서버가 요청 수신하였으나 제대로된 응답이 불가능함을 알림|
|103 Early Hints|주로 Link 헤더와 함께 사용되어 서버가 응답 준비하는 동안 유저 에이전트가 사전 로딩을 시작할 수 있게 함|

# 3. 성공 응답

|Status Code|Description|
|---|---|
|200 OK|요청이 성공적임, 성공의 의미는 HTTP 메서드에 따라 다름(GET,HEAD,PUT,POST,TRACE)|
|201 Created|요청이 성공되어 새로운 리소스 생성(POST, PUT 요청)|
|202 Accepted|요청을 수신했으나 그에 응하여 행동하지 않음|
|203 Non-Authoritative Information|받은 응답이 오리진 서버와 일치하지 않으나 로컬 또는 서드 파티 복사본에서 전송됨을 의미|
|204 No Content|요청에 대한 보내 줄 수 있는 콘텐츠가 없음(헤더는 의미있을 수 있음)|
|205 Reset Content|요청을 완수한 이후 사용자에게 이 요청을 보낸 문서 뷰를 리셋하라고 알림|
|206 Partitial Content|클라이언트에서 복수의 스트림을 분할 다운로드하고자 범위 헤더 전송시 사용|
|207 Multi-Status|리소스가 여러 상태 코드인 상황|
|208 Multi-Status|DVA에서 사용되는 상태코드|
|226 IM Used|서버가 GET 요청에 대한 리소스 의무를 다하여 보낸 응답이 현재 인스턴스에 적용됨을 알림|

# 3. 리다이렉션 메시지

|Status Code|Description|
|---|---|
|300 Multiple Choice|요청에 대해 복수의 응답이 가능, 사용자는 그 중 하나를 반드시 선택|
|301 Moved Permanently|리소스가 HTTP 응답 헤더의 `Location`에 명시된 URI과 영구적으로 다른 곳에 위치|
|302 Found|요청한 리소스의 URI가 일시적으로 변경됨
|303 See Other|클라이언트가 요청한 리소스를 다른 URI에서 GET 요청시 서버가 클라이언트로 직접 보내는 응답|
|304 Not Modified|응답이 수정되지 않음, 캐시 목적으로 사용|
|~~305 Use Proxy~~|~~응답은 프록시를 통해 접속해야함을 알림~~|
|~~306 unused~~|~~사용되지 않는 코드~~|
|307 Temporary Redirect|302 Found 응답 코드와 동일함, 반드시 첫 요청에 사용된 HTTP 메서드만 사용|
|308 Permanent Redirect|301 응답 코드와 동일함, 반드시 첫 요청에 사용된 HTTP 메서드만 사용|


# 4. 클라이언트 에러 응답

|Status Code|Description|
|---|---|
|400 Bad Request|잘못된 문법으로 인해 서버가 요청을 이해할 수 없음|
|401 Unauthorized|비인증된 클라이언트, 서버는 클라이언트가 누군지 모름
|~~402 Payment Required~~|~~디지털 결제 시스템용 코드~~|
|403 Forbidden|클라이언트가 콘텐츠에 접근할 권리가 없음, 서버는 클라이언트를 알고 있음
|404 Not Found|요청받은 리소스를 찾을 수 없음, 브라우저에 알려지지 않은 URL|
|405 Method Not Allowed|URL에서 요청한 메서드를 사용할 수 없음|
|406 Not Acceptable|서버 주도 콘텐츠 협상을 수행한 이후, 사용자 에이전트에서 정해준 규격에 따른 어떠한 콘텐츠도 찾지 않았을 때, 웹서버가 보냄|
|407 Proxy Authentication Required|401과 비슷하나 프록시에 의해 완료된 인증 필요|
|408 Request Timeout|오래된 요청에 응답하는 코드|
|409 Conflict|응답 요청이 현재 서버 상태와 충돌시|
|410 Gone|요청한 콘텐츠가 서버에서 영구적으로 삭제되어 전달 가능한 주소가 없을 때|
|411 Length Required|`Content-Length` 헤더 필드가 정의되지 않은 요청|
|412 Precondition Failed|클라이언트 헤더의 전제조건이 서버의 전제조건에 적절하지 않음|

/// 나중에해야지

[`412 Precondition Failed` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412 "Currently only available in English (US)")

클라이언트의 헤더에 있는 전제조건은 서버의 전제조건에 적절하지 않습니다.

[`413 Payload Too Large`](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/413)

요청 엔티티는 서버에서 정의한 한계보다 큽니다; 서버는 연결을 끊거나 혹은 `Retry-After` 헤더 필드로 돌려보낼 것이다.

[`414 URI Too Long`](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/414)

클라이언트가 요청한 URI는 서버에서 처리하지 않기로 한 길이보다 깁니다.

[`415 Unsupported Media Type`](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/415)

요청한 미디어 포맷은 서버에서 지원하지 않습니다, 서버는 해당 요청을 거절할 것입니다.

[`416 Requested Range Not Satisfiable`](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/416)

`Range` 헤더 필드에 요청한 지정 범위를 만족시킬 수 없습니다; 범위가 타겟 URI 데이터의 크기를 벗어났을 가능성이 있습니다.

[`417 Expectation Failed` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417 "Currently only available in English (US)")

이 응답 코드는 `Expect` 요청 헤더 필드로 요청한 예상이 서버에서는 적당하지 않음을 알려줍니다.

[`418 I'm a teapot`](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/418)

서버는 커피를 찻 주전자에 끓이는 것을 거절합니다.

[`421 Misdirected Request` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/421 "Currently only available in English (US)")

서버로 유도된 요청은 응답을 생성할 수 없습니다. 이것은 서버에서 요청 URI와 연결된 스킴과 권한을 구성하여 응답을 생성할 수 없을 때 보내집니다.

[`422 Unprocessable Entity`](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/422) ([WebDAV](https://developer.mozilla.org/ko/docs/Glossary/WebDAV))

요청은 잘 만들어졌지만, 문법 오류로 인하여 따를 수 없습니다.

[`423 Locked` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/423 "Currently only available in English (US)") ([WebDAV](https://developer.mozilla.org/ko/docs/Glossary/WebDAV))

리소스는 접근하는 것이 잠겨있습니다.

[`424 Failed Dependency`](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/424) ([WebDAV](https://developer.mozilla.org/ko/docs/Glossary/WebDAV))

이전 요청이 실패하였기 때문에 지금의 요청도 실패하였습니다.

[`426 Upgrade Required`](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/426)

서버는 지금의 프로토콜을 사용하여 요청을 처리하는 것을 거절하였지만, 클라이언트가 다른 프로토콜로 업그레이드를 하면 처리를 할지도 모릅니다. 서버는 [`Upgrade` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade "Currently only available in English (US)") 헤더와 필요로 하는 프로토콜을 알려주기 위해 426 응답에 보냅니다.

[`428 Precondition Required` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428 "Currently only available in English (US)")

오리진 서버는 요청이 조건적이어야 합니다. 클라이언트가 리소스를 GET해서, 수정하고, 그리고 PUT으로 서버에 돌려놓는 동안 서드파티가 서버의 상태를 수정하여 발생하는 충돌인 '업데이트 상실'을 예방하기 위한 목적입니다.

[`429 Too Many Requests`](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/429)

사용자가 지정된 시간에 너무 많은 요청을 보냈습니다("rate limiting").

[`431 Request Header Fields Too Large`](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/431)

요청한 헤더 필드가 너무 크기 때문에 서버는 요청을 처리하지 않을 것입니다. 요청은 크기를 줄인 다음에 다시 전송해야 합니다.

[`451 Unavailable For Legal Reasons` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451 "Currently only available in English (US)")

사용자가 요청한 것은 정부에 의해 검열된 웹 페이지와 같은 불법적인 리소스입니다.

## [서버 에러 응답](https://developer.mozilla.org/ko/docs/Web/HTTP/Status#%EC%84%9C%EB%B2%84_%EC%97%90%EB%9F%AC_%EC%9D%91%EB%8B%B5)

[`500 Internal Server Error`](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/500)

서버가 처리 방법을 모르는 상황이 발생했습니다. 서버는 아직 처리 방법을 알 수 없습니다.

[`501 Not Implemented`](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/501)

요청 방법은 서버에서 지원되지 않으므로 처리할 수 없습니다. 서버가 지원해야 하는 유일한 방법은 `GET`와 `HEAD`이다. 이 코드는 반환하면 안됩니다.

[`502 Bad Gateway`](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/502)

이 오류 응답은 서버가 요청을 처리하는 데 필요한 응답을 얻기 위해 게이트웨이로 작업하는 동안 잘못된 응답을 수신했음을 의미합니다.

[`503 Service Unavailable`](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/503)

서버가 요청을 처리할 준비가 되지 않았습니다. 일반적인 원인은 유지보수를 위해 작동이 중단되거나 과부하가 걸렸을 때 입니다. 이 응답과 함께 문제를 설명하는 사용자 친화적인 페이지가 전송되어야 한다는 점에 유의하십시오. 이 응답은 임시 조건에 사용되어야 하며, `Retry-After:` HTTP 헤더는 가능하면 서비스를 복구하기 전 예상 시간을 포함해야 합니다. 웹마스터는 또한 이러한 일시적인 조건 응답을 캐시하지 않아야 하므로 이 응답과 함께 전송되는 캐싱 관련 헤더에 대해서도 주의해야 합니다.

[`504 Gateway Timeout`](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/504)

이 오류 응답은 서버가 게이트웨이 역할을 하고 있으며 적시에 응답을 받을 수 없을 때 주어집니다.

[`505 HTTP Version Not Supported`](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/505)

요청에 사용된 HTTP 버전은 서버에서 지원되지 않습니다.

[`506 Variant Also Negotiates` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506 "Currently only available in English (US)")

서버에 내부 구성 오류가 있다. 즉, 요청을 위한 투명한 컨텐츠 협상이 순환 참조로 이어진다.

[`507 Insufficient Storage` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507 "Currently only available in English (US)")

서버에 내부 구성 오류가 있다. 즉, 선택한 가변 리소스는 투명한 콘텐츠 협상에 참여하도록 구성되므로 협상 프로세스의 적절한 종료 지점이 아닙니다.

[`508 Loop Detected` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508 "Currently only available in English (US)") ([WebDAV](https://developer.mozilla.org/ko/docs/Glossary/WebDAV))

서버가 요청을 처리하는 동안 무한 루프를 감지했습니다.

[`510 Not Extended` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510 "Currently only available in English (US)")

서버가 요청을 이행하려면 요청에 대한 추가 확장이 필요합니다.

[`511 Network Authentication Required` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511 "Currently only available in English (US)")

511 상태 코드는 클라이언트가 네트워크 액세스를 얻기 위해 인증을 받아야 할 필요가 있음을 나타냅니다.

---
#httpStatusCode