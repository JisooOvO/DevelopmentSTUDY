```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. IndexedDB

- 브라우저에 내장된 데이터베이스이며 오리진에 종속됨

- 거의 모든 종류의 키 값을 저장
- 신뢰성을 위한 트랜잭션 지원
- 키 범위 쿼리, 인덱스 지원
- `localStorage`보다 많은 양의 데이터 저장

> 강력한 성능이지만 기존 클라이언트-서버 앱에 비해 무겁기 때문에 오프라인 앱 용으로 사용

## 1-1 DB 생성

```
let openRequest = indexedDB.open(name,version);
```

- `name` : 문자열, DB 이름
- `version` : 버전 (기본적으로 양의 정수, `1`)

- `openRequest` 객체를 반환

### 1-1-1 DB 생성 관련 이벤트

- `success` : DB 준비 완료, `openRequest.result`에 DB 객체가 존재
- `error`
- `upgradeneeded` : DB가 준비되었으나 오래된 버전 사용 중, DB가 존재하지 않을 경우 버전은 `0`

> DB가 없을 경우 `upgradeneeded` 이벤트가 발생하므로 DB 초기화를 수행할 수 있음

### 1-1-2 버전 관리
> 사용자가 브라우저를 이용 중에 업데이트가 되어 DB 버전이 달라질 경우
> 오래된 버전의 DB를 업데이트를 시도해야함
> 그러나 업데이트를 위해서는 브라우저의 새로고침이 필요함
>
> `versionchange` 이벤트는 오래된 버전의 DB에서 발생하는 이벤트로
> 사용자에게 새로고침을 시도하게 만드는 알림을 생성할 수 있음
>
> 만약 사용자가 오래된 DB를 계속해서 사용하려할 경우(`versionchange` 이벤트 발생 X)
> `onblocked` 이벤트를 발생시켜 DB의 사용을 제한하여 업데이트 충돌을 예방함

## 1-2 DB 삭제

```
let deleteRequest = indexedDB.deleteDatabase(name);
```

## 1-3 Object Storge

- IndexedDB에 무언가를 저장하기 위한 장소(다른 데이터베이스의 테이블에 해당)
- [standard serialization algorithm](https://www.w3.org/TR/html53/infrastructure.html#section-structuredserializeforstorage)을 사용하여 객체 저장
- 순환 참조 등 직렬화가 불가능한 객체는 저장할 수 없음
- 모든 값에는 고유한 `key`가 존재해야하며 숫자, 날짜, 문자열, 바이너리 또는 배열 중 하나의 형태

### 1-3-1 저장소 생성

```
db.createObjectStore(name [,keyOptions])
```

- `name` : 스토어 이름
- `keyOptions` :
	  - `keyPath` : 키로 사용할 객체 경로 (ex `id`)
	  - `autoIncrement` : `true` 인 경우 새로 저장된 객체에 대한 키가 자동 증가

- 동기적으로 동작하며 `upgradeneeded` 핸들러에서 DB 버전 업데이트하는 동안에만 생성/수정 가능

```
let openRequest = indexedDB.open("db", 2);

openRequest.onupgradeneeded = function() {
  let db = openRequest.result;
  if (!db.objectStoreNames.contains('books')) { // if there's no "books" store
    db.createObjectStore('books', {keyPath: 'id'}); // create it
  }
};
```

### 1-3-2 저장소 삭제

```
db.deleteObjectStore('name');
```

### 1-3-3 메서드

-  `put(value, [key])` : 스토어에 value 추가, key 중복시 값 대체
-  `add(value, [key])` : `put`과 동일한 기능이지만 key 중복시 `ConstraintError` 오류 발생

## 1-4 트랜잭션

- 작업의 일관성을 보장하는 기능

```
db.transaction(store [, type]);
```

- `store` : 저장소 이름
- `type` :
	- `readonly` : 읽기 전용
	- `readwrite` : 데이터 읽고 쓰기 가능하나 저장소 생성/제거/변경은 불가

```
let transaction = db.transaction("books", "readwrite");

let books = transaction.objectStore("books");

let book = {
  id: 'js',
  price: 10,
  created: new Date()
};

let request = books.add(book); 

request.onsuccess = function() { 
  console.log("Book added to the store", request.result);
};

request.onerror = function() {
  console.log("Error", request.error);
};
```

### 1-4-1 auto Commit

- 모든 트랜잭션 요청이 완료되어 마이크로 태스크 대기열이 비어 있을 경우 자동으로 커밋
- `fetch`, `setTimeout` 과 같은 비동기 작업을 기다리지않음

>따라서 트랜잭션과 비동기 항목을 분리해야함

### 1-4-2 트랜잭션 중단

```
transaction.abort();
```

## 1-5 검색하기

### 1-5-1 Key를 사용하여 검색하기

- `id` 값을 사용하면 범위를 지정하여 검색가능, 범위 객체(`IDBKeyRange`)를 지원
- 객체 저장소는 항상 키를 기준으로 정렬 또한 반환 값 역시 키 순서로 정렬되어 반환

- 범위 지정 객체
	- `IDBKeyRange.lowerBound(lower, [open])` :  `id` `≥lower` (`open`이 `true`인 경우 `>lower` )
	- `IDBKeyRange.upperBound(upper, [open])` : `id` `≤upper` (`open`이 `true`인 경우 `<upper`)
	- `IDBKeyRange.bound(lower, upper, [lowerOpen], [upperOpen])`
	- `IDBKeyRange.only(key)`

- 검색 메서드
	- `store.get(query)` : 쿼리에 해당하는 첫 번째 값
	- `store.getAll([query], [count])` : 쿼리에 해당하는 값을 최대 `count`개 만큼 가져옴
	- `store.getKey(query)` : 쿼리에 해당하는 첫번째 키
	- `store.getAllKeys([query], [count])`
	- `store.count([query])` 

### 1-5-2 Index 사용하여 검색하기

- `index`는 저장소에 대한 추가적인 기능

```
objectStore.createIndex(name, keyPath, [options]);
```

- `name` : 인덱스 명
- `keyPath` : 인덱스가 추적할 필드명(`column`)
- `options` :
	- `unique` : `true`인 경우 `keyPath`에 지정된 값을 가진 객체는 하나뿐, 중복 추가시 오류 발생
	- `multiEntry` : `keyPath` 값이 배열일 경우 사용, `true` 일 때 해당 배열의 모든 구성원이 인덱스 키가 됨

```
openRequest.onupgradeneeded = function() {
    let books = db.createObjectStore('books', {keyPath: 'id'});
    let index = books.createIndex('price_idx', 'price');
  };
```

![[Index.PNG]]

- 범위 객체를 사용하여 `index`의 `key`에 접근하여 해당하는 값을 가져 올 수 있음

## 1-6 저장소 값 제거하기

- `delete(query)` : 쿼리와 일치하는 값 삭제
- `clear()` : 스토리지 초기화

## 1-7 커서

> `getAll(), getAllKeys()` 메서드는 키-값의 배열을 반환함
> 이 때 사용가능한 메모리보다 클 경우 모든 레코드를 배열로 가져올 수 없음

- 커서는 쿼리가 주어질 경우 저장소를 순회하여 한 번에 하나의 키-값을 반환하는 특수 객체 
- 메모리를 절약
- 저장소는 키 기준으로 정렬되므로 키 순서를 따라 저장소 순회

```
let request = store.openCursor(query, [direction]);
```

- `direction` :
	- `next` : 기본 값, 오름차순
	- `prev` : 내림차순
	- `nextunique`,`prevunique` : 동일한 키가 있는 레코드는 하나만 반환하고 나머지는 건너 뜀

### 1-7-1 메서드

- `advance(count)` : 커서를 `count`만큼 건너뜀
- `continue([key])` : 커서를 바로 다음 값 또는 `key` 다음 값으로 이동

### 1-7-2 프로퍼티
- `primaryKeys` : 인덱스의 경우 인덱스가 참조하는 객체의 `id`를 반환
- `value` : 저장소 객체 값
- `key` : 객체 키(또는 인덱스)


```
let request = priceIdx.openCursor(IDBKeyRange.upperBound(5));

request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
    let primaryKey = cursor.primaryKey; // next object store key (id field)
    let value = cursor.value; // next object store object (book object)
    let key = cursor.key; // next index key (price)
    console.log(key, value);
    cursor.continue(); // 다음 객체로 이동
  } else {
    console.log("No more books");
  }
};
```

---
#indexedDB