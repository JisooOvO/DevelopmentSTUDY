```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. BOM

- 자바스크립트 언어 사양에 포함되지 않고 웹 브라우저에서 제공하는 객체

![[BOM.jpg]]

# 1-1 window 

- 모든 객체들의 최상위 객체, 메소드 앞에 window 명시할 필요 X
	- `alert`
	- `open`
	- `prompt`
	- `comfirm`
	- `setInterval / clearInterval` : 시간 간격으로 코드 반복 실행/중지(밀리 초)
		* 자체 내 밀리 초 단위의 오차 존재
	- `setTimeout, clearTimeout` : 일정 시간 후 코드 1번 실행 후 종료

## 1-2 location 

- URL을 다루는 객체
	- `href` : 현재 페이지 URL 반환
	- `hash` : 현재 URL 해시값 반환
	- `port` : 현재 URL 포트번호 반환
	- `protocol` : 현재 URL 프로토콜 반환
	- `search` :  현재 URL 쿼리 반환
	- `reload()` : 페이지 새로고침
	- `replace()` : 지정된 URL 이동

## 1-3 history 

- 방문 기록 저장(앞/뒤로 가기)
	- `length` : 저장된 URL 수 반환
	- `go()` : 페이지 이동(양수 : 다음 , 음수 : 이전)
	- `back()` : 이전 방문 페이지 이동
	- `forward()` : 다음 방문 페이지 이동

## 1-4 navigator 

- 사용중인 브라우저/운영체제 정보
	- `appCodeName` : 브라우저 코드
	- `appName` : 브라우저 이름
	- `appVersion` : 브라우저 버전 
	- `language` : 브라우저 사용 언어
	- `product` : 브라우저 엔진 이름
	- `platform` : OS 정보
	- `onLine` : 온라인 상태면 true 반환
	- `userAgent` : 브라우저/OS 종합 정보 반환

---
>[[ProgrammingLanguage/JavaScript/JavaScript/JavaScript|JavaScript]] [[Browser]]
#BOM