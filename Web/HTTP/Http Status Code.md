```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. Http Status Code

- HTTP 응답 상태 코드는 특정 HTTP 요청이 성공적으로 완료되었는지 알려줌
- 응답은 5개의 그룹으로 나뉨 
	- 정보 제공 응답
	- 성공 응답
	- 리다이렉트
	- 클라이언트 에러
	- 서버 에러
> 상태 코드는 [section 10 of RFC 2616](https://tools.ietf.org/html/rfc2616#section-10)에 정의

---
# 2. 정보 응답

|Status Code|Description|
|---|---|
|100 Continue|지금까지의 상태가 괜찮으며 클라이언트가 계속해서 요청을 하거나 이미 요청을 완료한 경우에는 무시해도 되는 것을 알림|
|101 Switching Protocol|클라이언트가 보낸 Upgrade 요청 헤더에 대한 응답에 들어가 서버에서 프로토콜 변경할 것을 알림|
|102 Processing|서버가 요청 수신하였으나 제대로된 응답이 불가능함을 알림|
|103 Early Hints|주로 Link 헤더와 함께 사용되어 서버가 응답 준비하는 동안 유저 에이전트가 사전 로딩을 시작할 수 있게 함|

---
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

---
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

---
# 4. 클라이언트 에러 응답

|Status Code|Description|
|---|---|
|400 Bad Request|잘못된 문법으로 인해 서버가 요청을 이해할 수 없음|
|401 Unauthorized|비인증된 클라이언트, 서버는 클라이언트가 누군지 모름
|~~402 Payment Required~~|~~디지털 결제 시스템용 코드~~|
|403 Forbidden|클라이언트가 콘텐츠에 접근할 권리가 없음|
|404 Not Found|요청받은 리소스를 찾을 수 없음, 브라우저에 알려지지 않은 URL|
|405 Method Not Allowed|URL에서 요청한 메서드를 사용할 수 없음|
|406 Not Acceptable|서버 주도 콘텐츠 협상을 수행한 이후, 사용자 에이전트에서 정해준 규격에 따른 어떠한 콘텐츠도 찾지 않았을 때, 웹서버가 보냄|
|407 Proxy Authentication Required|401과 비슷하나 프록시에 의해 완료된 인증 필요|
|408 Request Timeout|오래된 요청에 응답하는 코드|
|409 Conflict|응답 요청이 현재 서버 상태와 충돌시|
|410 Gone|요청한 콘텐츠가 서버에서 영구적으로 삭제되어 전달 가능한 주소가 없을 때|
|411 Length Required|`Content-Length` 헤더 필드가 정의되지 않은 요청|
|412 Precondition Failed|클라이언트 헤더의 전제조건이 서버의 전제조건에 적절하지 않음|
|413 Payload Too Large|요청한 엔티티가 서버에서 정의한 한계보다 큼, 서버는 연결을 끊거나 `Retry-After` 헤더 필드로 돌려보냄|
|414 URI Too Long|클라이언트가 요청한 URI가 서버에서 지정한 최대 길이보다 길 경우|
|415 Unsupported Media Type|요청한 `Content-Type`이 서버에서 지원하지 않음, 요청 거부|
|416 Requested Range Not Satisfiable|`Range` 헤더 필드에 요청한 지정 범위를 만족시킬 수 없음|
|417 Expectation Failed|`Expect` 요청 헤더가 서버에서 적절하지 않음을 알림|
|418 I'm a teapot|서버는 커피를 찻 주전자에 끓이는 것을 거절함|
|421 Misdirected Request|서버로 유도된 요청이 응답을 생성할 수 없음|
|422 Unprocessable Entity|요청은 이루어졌으나 문법 오류 발생|
|423 Locked|리소스 접근이 잠겨있음|
|424 Failed Dependency|이전 요청이 실패하여 지금 요청 또한 실패|
|426 Upgrade Required|지금의 프로토콜 요청은 거부하였으나 다른 프로토콜로 업그레이드 필요함을 알림|
|428 Precondition Required| 클라이언트가 리소스를 조작할 때, 서드파티가 서버의 상태를 수정하여 발생하는 충돌을 예방하기 위한 목적|
|429 Too Many Requests|클라이언트가 지정된 시간에 너무 많은 요청을 보냄|
|431 Request Header Fields Too Large|요청 헤더 필드가 너무 큼|
|451 Unavailable For Legal Reasons|정부에 의해 검열된 웹 페이지와 같은 불법적 리소스 접근시|

---
# 5. 서버 에러 응답

|Status Code|Description|
|---|---|
|500 Internal Server Error|서버 내부에서 처리 에러 발생|
|501 Not Implemented|요청 메서드가 서버에서 지원하지 않음, 서버는 `GET`과 `HEAD`만을 지원|
|502 Bad Gateway|서버가 게이트웨이에서 잘못된 응답을 수신함|
|503 Service Unavailable|유지보수나 과부하 등에 의해 서버가 요청을 처리할 준비가 되지 않음|
|504 Gateway Timeout|게이트웨이 역할의 서버가 제 때 응답을 받을 수 없음|
|505 HTTP Version Not Supported|요청에 사용된 HTTP 버전이 서버에서 지원하지 않음|
|506 Variant Also Negotiates|서버 내부 구성 오류, 요청을 위한 투명한 컨텐츠 협상이 순환 참조 중일 때|
|507 Insufficient Storage|서버 내구 구성 오류, 선택한 가변 리소스는 투명한 콘텐츠 협상에 참여하도록 구성되어 협상 프로세스의 적절한 종료지점이 아닐 때|
|508 Loop Detected|요청 처리하는 동안 무한 루프 감지|
|510 Not Extended|요청에 대한 추가 확장이 필요함|
|511 Network Authentication Required|클라이언트가 네트워크 액세스를 얻기 위해 인증이 필요함|

---
#httpStatusCode