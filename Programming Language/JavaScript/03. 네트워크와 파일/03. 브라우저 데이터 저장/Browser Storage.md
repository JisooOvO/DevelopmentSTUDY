```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. localStorage / sessionStorage

- 웹 스토리지 객체이며 브라우저 내에 키-값의 쌍을 저장
- 스토리지 객체는 `iterable` 객체가 아님
- 키와 값은 반드시 문자열 -> 숫자나 객체 자료형 사용시 문자열로 자동 변환

## 1-1 Cookie와의 차이점
- 쿠키와 다르게 네트워크 요청시 서버로 전송되지 않음
- 서버가 HTTP 헤더를 통해 객체를 조작할 수 없음, 오직 자바스크립트 내에서 수행
- 5MB 이상의 객체를 저장할 수 있음
- Origin에 묶여있으므로 프토토콜/도메인이 다를 경우 데이터에 접근할 수 없음

## 1-2 메서드
- 두 스토리지는 같은 메서드/프로퍼티를 제공

- `setItem(key, value)` : 키-값 쌍 저장
- `getItem(key)` : 키에 해당하는 값 반환
- `removeItem(key)` : 키에 해당하는 값 삭제
- `clear()` : 저장소 초기화
- `key(index)` : 인덱스에 해당하는 키 값 반환
- `length` : 저장된 항목 수

>스토리지 객체는 일반 객체처럼 `.`을 사용해 키에 접근할 수 있으나 
>이 때 `storage` 이벤트가 발생하지 않음
>또한 `length` 등 읽기 전용 프로퍼티가 존재하므로 에러 발생할 확률이 있음
>따라서 `setItem() / getItem()`으로 스토리지 객체에 접근하는 것을 권장
## 1-3 localStoage
- 오리진이 같은 URL 내에서 데이터 공유
- 브라우저, OS 재시작하더라도 데이터 사라지지 않음

## 1-4 sessionStorage
- 현재 탭 내에서만 데이터를 공유
- 페이지 새로고침시에는 데이터가 사라지지 않으나 탭을 닫을 경우 데이터 삭제

## 1-5 storage 이벤트
- `localStorage / sessionStorage`의 데이터 갱신시 `storage` 이벤트 실행
- `storage` 이벤트가 발생하면 모든 창에서 이벤트 발생한 스토리지 객체 모두가 갱신

### 1-5-1 프로퍼티
- `key` : 변경된 데이터의 key(`clear() 호출시 null`)
- `oldValue` : 이전 값
- `newValue` : 새로운 값
- `url` : 갱신된 문서의 url
- `storageArea` : 갱신이 일어난 `localStorage / sessionStorage` 객체

---
#localStorage #sessionStorage