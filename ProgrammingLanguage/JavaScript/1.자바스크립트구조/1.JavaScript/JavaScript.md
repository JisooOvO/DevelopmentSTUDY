```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. 자바스크립트

- 웹 페이지에서 복잡한 기능을 구현할 수 있도록 하는 스크립팅 언어
- 동적으로 콘텐츠를 바꾸고, 멀티미디어를 제어하고, 애니메이션을 추가 가능
- 자바스크립트는 인터프리터를 사용
- 모던 자바스크립트는 JIT 컴파일 기술을 사용하여 성능 향상
>수정하려는 HTML, CSS 보다 자바스크립트가 먼저 불러와질경우 오류 발생
>스크립트를 별도의 파일로 저장할 경우 브라우저가 스크립트를 다운받아 캐시로 저장 
>또한 성능 향상 및 트래픽 절약의 효과가 있음

# 1-1 엔진

- 자바 스크립트 엔진 (가상머신) 이 내장된 프로그램이 실행 가능
>엔진이 스크립트를 읽고(파싱) 기계어 전환(컴파일)
* 자바스크립트 엔진 종류
	- Chrome / Opera - V8
	- SpiderMonkey - Firefox
	- ChakraCore - Microsoft Edge
	- SqulrrelFIsh - Safari

---
# 2. 특징

- 스크립트 `tag` 내에 `src` 속성이 있으면 태그 내부의 코드는 무시
- 줄바꿈시 세미콜론 자동 삽입을 엔진이 처리해줌
>그러나 괄호 `[], ()` 앞에는 세미콜론 자동삽입이 되지 않음
>따라서 세미콜론 `;` 사용 권장

## 2-2 엄격모드 

-  ES5에서 기존 기능 일부 변경되며 하위 호환성 문제 발생
> 기본 모드에서는 변경사항 대부분 비활성화, 엄격모드 사용시 변경사항 활성화

* 모던 자바스크립트는 클래스/모듈을 제공
> 엄격모드가 자동 적용	

* 사용법
```
use strict
```                    
* 스크립트 최상단 또는 함수 본문 맨 앞에 올 수 있음
* 함수 내에 위치시 해당 함수만 적용

## 2-3 제약 사항

- 특정 조건이 아닐 경우 디스크에 저장된 파일을 읽지 못함
> 동동일 출처 정책(SOP, Same Origin Policy)

- ECMA-262 명세서
    >https://www.ecma-international.org/publications-and-standards/standards/ecma-262/

- 호환성
    >http://caniuse.com

## 2-4 API

- Application Programming Interface
>개발자가 직접 구현하기는 어렵거나 불가능한 기능들을 미리 만들어서 
>클라이언트 사이드 자바스크립트에 제공하는 것

- 3rd party APIs
	- Twitter API
	- Google 지도 API
- Brouser API
	- DOM API : 
		- HTML 콘텐츠를 추가, 제거, 변경하고, 동적으로 페이지에 스타일을 추가하는 등 
		   HTML/CSS를 조작하는 API
 
- Geolocation API : 지리 정보 API

- Canvas / WebGL API : 2D, 3D 애니메이션 그래픽

- HTMLMediaElement / WebRTC : 오디오, 비디오 API

## 2-5 브라우저 보안

- 각각의 브라우저 탭은 코드를 실행하기 위한 독립적인 그릇
>따라서 각각의 탭은 분리되어 다른 사이트에 직접적인 영향을 주기 어려움

## 2-6 Server Side vs Client Side

- Server Side Code 
>서버에서 실행 결과를 처리하여 브라우저가 이를 다운로드하여 화면에 출력
>자바스크립트는 Node.js 환경에서 서버 사이드 언어로 사용 가능

- Client Side Code
> 사용자의 컴퓨터에서 코드를 처리하고 브라우저가 실행하는 코드
> 자바스크립트는 React 환경에서 클라이언트 사이드 코드로 동작


## 2-7 가비지 컬렉션

- 자바스크립트는 도달가능성(reachbility) 개념을 사용하여 메모리 관리 수행
- 도달할 수 없는 값은 가비지 컬렉터가 삭제
>`Root<global>` 에서 시작해서 도달할 수 없는 경우 삭제 (외부로 나가는 참조는 영향X)

* [[mark and sweep]] 알고리즘
> 가비지 컬렉터가 루트 정보를 수집하고 mark(기억)
> 루트가 참조하는 모든 객체와 그 객체들이 참조하는 객체 모두들 mark
> mark된 객체는 방문하지 않고 모든 객체를 방문할때까지 반복
> makr 되지 않은 객체는 메모리에서 삭제

* 가비지 컬렉터 최적화 기법
	- 세대별 수집(generational collection) 
	- 점진적 수집(incremental collection) : 작업분리
	- 유휴시간 수집(idle-time collection) : CPU 유후상태일때만 실행

### 2-7-1 V8 가비지컬렉션

[V8 Garbage-Collection](https://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection)

## 2-8 디버깅

- chrome 개발자도구 source 탭 활용
* `debugger` : breakpoint 설정

## 2-9 테스트 자동화 
 
- BDD(Behavior Driven Development) : 테스트, 문서, 예시를 한데 모아놓은 개념

- 관련 라이브러리
	- Mocha : 테스트 프레임워크(describe, it 등 테스팅 함수 제공)
	- Chai : 다양한 assertion 제공
	- Sinon : 함수의 정보 제공

```
describe( "함수이름", function() ) {
	it("유스케이스 설명", function(){
		assert.equal(함수이름(인수), value2) 
		// 함수 반환값과 value2가 같으면 에러 없이 실행
	});
	...
}
```

* `describe` 는 중첩하여 사용가능		
* `it.only()` 사용하면 해당 블록만 테스트		
- `before ()` : 테스트 시작 전 괄호 안 내용 실행
- `after ()`
- `beforeEach ()` : 매 it이 실행전 실행
- `afterEach ()`


# 2-10 바벨, 폴리필

- 바벨 :  트랜스파일러 => 모던 자바스크립트를 구 표준을 준수하는 코드로 변환
	* Webpack 은 자동으로 트랜스파일러 동작

- 폴리필 :  브라우저가 지원하지 않는 자바스크립트 코드를 지원 가능하도록 변환한 스크립트
	- core js
	- polyfill.io

---
# 3. 자바스크립트 불러오기

- 내부 스크립트
> HTML 파일 내에서 `<script>` 태그 영역에 자바스크립트 코드 작성

- 외부 스크립트
> `<script>` 태그의 src 속성을 이용하여 연결

## 3-1 스크립트 로딩 전략

![[async-defer.jpg]]
- 1. `<body>` 태그 내 위치시 `<body>` 종료 태그 바로 전에 사용
> HTML DOM을 모두 불러오기 전에는 스크립트의 로딩과 분석이 완전히 중단
> 많은 스크립트를 포함하는 대형 사이트에서는 성능이 저하될 수 있음

- 2. 외부 스크립트 `<script>` 태그에 `defer / async` 특성 추가
```
<script src="script.js" defer></script>
```
`async` :
>스크립트를 가져오는 동안 페이지 로딩을 중단하지 않음
>스크립트 다운로드가 끝나면 바로 스크립트가 실행되며 실행 도중에는 페이지 렌더링이 중단
>스크립트의 실행 순서를 보장할 방법은 없음 
>따라서 async는 다른 스크립트에 의존하지 않는 독립 스크립트에 사용 가능
>다수의 백그라운드 스크립트를 최대한 빠르게 불러와야 할 때 사용

`defer` :
>페이지 내에 배치한 순서대로 페이지를 부르며 
>페이지 콘텐츠를 모두 불러오기 전까지는 자바스크립트를 실행하지 않음
>페이지 요소를 수정하거나 추가하는 등 DOM 작업을 기대하는 스크립트에 유용
>스크립트 순서를 맞출 경우 효과적인 방법

- 3. 브라우저 DOMcontentLoaded 이벤트 수신
```
document.addEventListener('DOMContentLoaded', () => {
	...
});
```

---
#JavaScript 