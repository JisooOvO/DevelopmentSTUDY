```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 보완이 필요한 문서
# 1. 네트워크 

- 컴퓨터나 다른 장치들이 서로 연결된 것
---
# 2. 인터넷 

- 표준화된 프로토콜들을 사용하여 장치와 컴퓨터를 연결한 것

>인터넷의 핵심은 연결된 라우터의 글로벌 네트워크,
>서로 다른 장치와 시스템 간의 트래픽을 관리
>데이터는 작은 패킷으로 나누어져 라우터로 전달
>패킷이 제대로 전달되기 위하여 인터넷은 여러가지 프로토콜을 사용

## 2-1 관련 용어

>패킷 : 인터넷을 통해 전송되는 데이터의 작은 유닛

>라우터 : 다른 네트워크간 패킷이 도달하는 장치

>IP 주소 : 데이터가 올바른 목적지로 라우팅되는데 필요한 유니크 식별자

>Domain Name : 인간이 읽을수 있는 웹 사이트 식별자 ( google.com )

>DNS : IP 주소를 도메인 네임으로 변경하는 시스템
>도메인 네임으로 웹 브라우저 접속시 컴퓨터는 DNS 서버에 DNS 쿼리를 전송
>그리고 대응하는 IP 주소를 반환

> 포트 : 장치에서 실행 중인 응용 프로그램 또는 서비스를 식별하는데 사용
> 응용 프로그램, 서비스에는 고유한 포트 번호가 할당

> 소켓 : 통신을 위한 특정 엔드포인트를 나타내는 IP 주소와 포트 번호의 조합

> 연결(connections) :  두 장치가 서로 통신하기를 원할 때 두 소켓 사이에 연결이 설정
> 연결 설정 프로세스 동안 장치는 다양한 매개 변수를 협상하여 연결을 통해 
> 데이터를 전송하는 방법을 결정

>데이터 전송 : 연결이 설정되면 각 장치에서 실행 중인 응용 프로그램 간에 데이터를 전송
>일반적으로 세그먼트로 전송되며 신뢰할 수 있는 전송을 보장하기 위해 
>시퀀스 번호와 다른 메타데이터를 포함

---
# 3. 프로토콜 

- 장치와 시스템 간 정보가 교환되는 것을 정의하는 규칙과 표준
- 다른 벤더나 제조사의 시스템간 일정한 통신 가능

## 3-1. HTTP 

- 클라이언트와 서버간 데이터 전송(Hytertext Transfer Protocol)

>웹 사이트 접속시 브라우저는 요청한 정보와 웹페이지를 포함한 HTTP 요청을 서버에 보냄
>서버는 요청된 데이터와 함께 HTTP 응답을 클라이언트에 보냄 

## 3-2 HTTPS 

- 암호화가 적용된 HTTP 버전, SSL/TLS 암호화를 사용하여 암호화된 데이터 전송

>추가적인 보안 레이어를 제공(로그인 자격증명, 결제 정보 등 민감 정보 보호)
<<<<<<< HEAD
>![[padlock.PNG]] Padlock icon 을 주소창에서 볼 수 있음
=======
>![[padlock.PNG]]Padlock icon 을 주소창에서 볼 수 있음
>>>>>>> 47dbc9534ef1e1940d6f873fcb411a25a36797a3

## 3-3 SSL/TLS 

- 통신간 보안(Secure Socket layer / Transport Layor Security)
  
### 3-3-1 주요 기술

- 인증서: 클라이언트와 서버 간의 신뢰를 구축, 서버의 ID에 대한 정보가 포함
>신뢰할 수 있는 제3자(인증 기관)가 서명하여 인증 여부를 확인

- 핸드셰이크: 클라이언트와 서버가 정보를 교환
>암호화 알고리즘 및 보안 연결을 위한 다른 매개 변수를 협상
>보안 연결이 설정되면 합의된 알고리즘을 사용하여 데이터가 암호화되며 
>클라이언트와 서버 간에 안전하게 전송

- TCP/IP : 신뢰성 있는 순서가 지정된 오류검사된 데이터 전송
>프로그램 구축시 응용 프로그램이 적절한 포트, 소켓 및 연결과 함께 작동하도록 
>설계되었는지 확인

- IP : 패킷을 올바른 목적지으로 라우팅하는 역할, 의도된 수신자에게 정보가 전달
- TCP : 패킷이 안정적으로 올바른 순서로 전송되도록 보장(Transmission Control Protocol)
- UDP: User Datagram Protocol
---
# 4. 최신 인터넷 기술

>5G : 이전 세대보다 더 빠른 속도, 더 낮은 대기 시간 및 더 큰 용량을 제공하는 최신 세대의 모바일 네트워크 기술

>사물인터넷(IoT) : 인터넷에 연결되어 데이터를 교환할 수 있는 물리적인 기기, 차량, 가전제품 등

>인공지능 (AI) : 기계 학습과 자연어 처리

>블록체인 : 안전하고 분산된 거래를 가능하게 하는 분산 원장 기술

>엣지 컴퓨팅 : 중앙 집중식 데이터 센터가 아닌 네트워크 가장자리에서 데이터를 처리하고 저장하는 것을 의미

---
>[[Frontend]]]
#Internet