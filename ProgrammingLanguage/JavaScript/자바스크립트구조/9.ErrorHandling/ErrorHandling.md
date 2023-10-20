```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. try..catch..finally

## 1-1 문법

```
try{
   //코드
   ...
} catch(err){
   //코드
   ...
} finally {
   //코드
   //이 코드는 항상 실행됨
   ...
}
```

-  try..catch는 런타임 에러에만 동작(runnable code에만 동작)
> 문법 오류은 동작하지 않음

-  try..catch는 동기적으로 동작함
> setTimeout처럼 scheduled 코드에서 발생한 예외 탐지 불가
> setTimeout 내부에 try..catch문 구현해야함

```
setTimeout(function() {
  try {
    noSuchVariable; // 이제 try..catch에서 에러를 핸들링 할 수 있습니다!
  } catch {
    alert( "에러를 잡았습니다!" );
  }
}, 1000);
```

- try..catch 내부의 변수는 지역변수

- catch 구문을 생략했을 때 에러 발생시 에러는 밖으로 던져짐

## 1-2 에러 객체

-  에러 발생시 에러 상세 내용이 담긴 객체를 생성하여  catch 블록에 인수로 전달
-  자바스크립트는 표준 에러 객체 생성자 지원
> `Error`, `SyntaxError`, `ReferenceError`, `TypeError`
-  에러 객체가 필요 없으면 생략 가능

```
try{
   ...
} catch(err){ // err 이 에러 객체
   ...
}
```

### 1-2-1 에러 객체의 프로퍼티

-  name : 에러 이름. 정의되지 않은 변수 때문에 발생한 에러라면 `"ReferenceError"`
-  message : 에러 상세 내용을 담고 있는 문자 메시지
-  stack : 현재 호출 스택. 에러를 유발한 중첩 호출들의 순서 정보를 가진 문자열(비표준)

```
try {
  lalala; // 에러, 변수가 정의되지 않음!
} catch(err) {
  alert(err.name); // ReferenceError
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at ... (호출 스택)

  // 에러 전체를 보여줄 수도 있습니다.
  // 이때, 에러 객체는 "name: message" 형태의 문자열로 변환됩니다.
  alert(err); // ReferenceError: lalala is not defined
}
```


## 1-3 throw

- 에러를 발생하는 연산자 throw

### 1-3-1 문법

```
throw <error object>
```

- 에러 객체에는 호환성을 위해 name, message 프로퍼티가 있는 것이 좋음

### 1-3-2 에러 던지기

- 특정 에러 종류만 처리하고 나머지 에러는 밖의 try..catch 문으로 던짐

```
function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
    blabla(); // 에러!
  } catch (e) {
    // ...
    if (!(e instanceof SyntaxError)) {
      throw e; // 알 수 없는 에러 다시 던지기
    }
  }
}

try {
  //함수를 읽으려고 시도 -> 
  readData();
} catch (e) {
  alert( "External catch got: " + e ); // 에러를 잡음
}
```

## 1-4 finally

-  finally 내부의 코드는 항상 실행 됨
> try 절 내부에 return 이 있을 경우 finally 내부 코드가 실행된 후 return

## 1-5 전역 catch

-  try..catch 밖에서 치명적 에러 발생하여 스크립트가 죽지 않게 하기 위한 방법
> 브라우저 환경에서는 window.onerror 를 통해 에러를 처리 할 수 있음
> Node.js의 경우 process.on("uncaughtException")

```
  window.onerror = function(message, url, line, col, error) {
    alert(`${message}\n At ${line}:${col} of ${url}`);
  };

  function readData() {
    badFunc(); // 에러가 발생한 장소
  }
```

#### 1-5-1 에러 로깅 관련 서비스

[https://errorception.com](https://errorception.com/) 
[http://www.muscula.com](http://www.muscula.com/)

---
# 2. 커스텀 에러

- 커스텀 에러 생성시 지키면 좋은 점
> 1. name, message, stack 프로퍼티 지원
> 2. Error 상속 -> obj instanceof Error 를 사용하여 에러 객체 식별 가능 

- 자바스크립트 Error 객체

```
// 자바스크립트 자체 내장 에러 클래스 Error의 '슈도 코드'
class Error {
   constructor(message) {
	  this.message = message;
	  this.name = "Error"; // (name은 내장 에러 클래스마다 다릅니다.)
	  this.stack = <call stack>; // stack은 표준은 아니지만, 대다수 환경이 지원합니다. 
  }
}
```

- 커스텀 Error 생성

```
class ValidationError extends Error {
  constructor(message) {
    super(message); // (1) Error 생성자 호출
    this.name = "ValidationError"; // (2) 이름 변경
  }
}

function test() {
  throw new ValidationError("에러 발생!");
}

try {
  test();
} catch(err) {
  alert(err.message); // 에러 발생!
  alert(err.name); // ValidationError
  alert(err.stack); // 각 행 번호가 있는 중첩된 호출들의 목록
}
```

---
# 3. 에러 감싸기(Error Wrapper)

-  에러가 발생 할 경우 ReadError 객체에 하나로 모아 저장하는 방식

```
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause; // 상세 내용
    this.name = 'ReadError';
  }
}

//에러 종류
class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

  
function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
  }

  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
  }
}

try {
  readUser('{잘못된 형식의 json}');
} catch (e) {
  if (e instanceof ReadError) {
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
  } else {
    throw e;
  }
}
```
---
#ErrorHandling