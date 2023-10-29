```table-of-contents
```
---
# 1. Proxy

- 특정 객체를 감싸 객체에 가해지는 작업을 중간에서 가로채는 객체
- 프로퍼티가 없는 특수 객체
## 1-1 문법

```
let proxy = new Proxy(target, handler)

	- target : 감쌀 객체
	- handler : 동작을 가로채는 메서드(trap)이 담긴 객체
	* trap이 없으면 target에 직접 작업이 수행됨
```

## 1-2 프록시가 가로채는 내부 메서드

|내부 메서드|핸들러 메서드|작동 시점|
|---|---|---|
|`[[Get]]`|`get`|프로퍼티를 읽을 때|
|`[[Set]]`|`set`|프로퍼티에 쓸 때|
|`[[HasProperty]]`|`has`|`in` 연산자가 동작할 때|
|`[[Delete]]`|`deleteProperty`|`delete` 연산자가 동작할 때|
|`[[Call]]`|`apply`|함수를 호출할 때|
|`[[Construct]]`|`construct`|`new` 연산자가 동작할 때|
|`[[GetPrototypeOf]]`|`getPrototypeOf`|[Object.getPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)|
|`[[SetPrototypeOf]]`|`setPrototypeOf`|[Object.setPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)|
|`[[IsExtensible]]`|`isExtensible`|[Object.isExtensible](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)|
|`[[PreventExtensions]]`|`preventExtensions`|[Object.preventExtensions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)|
|`[[DefineOwnProperty]]`|`defineProperty`|[Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty), [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)|
|`[[GetOwnProperty]]`|`getOwnPropertyDescriptor`|[Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor), `for..in`, `Object.keys/values/entries`|
|`[[OwnPropertyKeys]]`|`ownKeys`|[Object.getOwnPropertyNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames), [Object.getOwnPropertySymbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols), `for..in`, `Object/keys/values/entries`|

- 규칙
	- 값 입력을 성공적으로 처리시 `[[Set]]`은 반드시 `true` 아니면 `false`
	- 값 제거를 성공시 `[[Delete]]`는 반드시 `true` 아니면 `false`
	- 프록시 객체에 `[[GetPrototypeOf]]` 적용시 프록시 타깃의 `[[GetPrototypeOf]]` 값과 동일

## 1-2-1 Get

- `handler`에 `get(target, property, receiver)` 메서드가 필요
	- `target`  : 동작을 전달할 객체
	- `property` : 프로퍼티 이름
	- `receiver` : `getter` 호출시 `this`

```
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // 기본값
    }
  }
});

alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (해당하는 요소가 배열에 없으므로 0이 반환됨)
```

### 1-2-2 Set

-  값 설정시 `true` 그렇지 못한 경우 `false`(`TypeError`트리거)
- `set(target, property, value, reciever)
	- `target` : 동작 전달할 객체
	- `property`
	- `value` : 프로퍼티 값
	- `receiver`

```
let numbers = [];

numbers = new Proxy(numbers, { // (*)
  set(target, prop, val) { // 프로퍼티에 값을 쓰는 동작을 가로챕니다.
    if (typeof val == 'number') {
      target[prop] = val;
      return true; // true 가 아니면 TypeError가 자동으로 발생
    } else {
      return false;
    }
  }
});

// 기존 배열의 기능은 손상되지 않음
// push 메서드 내부의 [[Set]]을 프록시가 가로채 검증
numbers.push(1); // 추가가 성공했습니다.
numbers.push(2); // 추가가 성공했습니다.
alert("Length is: " + numbers.length); // 2

numbers.push("test"); // Error: 'set' on proxy

alert("윗줄에서 에러가 발생했기 때문에 이 줄은 절대 실행되지 않습니다.");
```

## 1-2-3 ownKeys와 getOwnPropertyDescriptor

- 프로퍼티  순환 관련 메서드는 내부 메서드`[[OwnPropertyKeys]]`에서 프로퍼티 목록을 받음
	- `Object.getOwnPropertyNames(obj)` : 심볼형이 아닌 키만 반환
	- `Object.getOwnPropertySymbols(obj)` : 심볼형 키만 반환
	- `Object.keys/values()` : `enumerable` 플래그가 `true`이면서 심볼형이 아닌 키/값 반환
	- `for..in` :  `enumerable` 플래그가 `true`인 심볼형이 아닌 키, 프로토타입 키를 순회

- 트랩 메서드 `ownKeys`를 사용해 순환 제어 가능
- `getOwnPropertyDescriptor` 메서드는 프로퍼티에 플래그 속성을 지정
```
// 이름이 `_`로 시작하는 프로퍼티 제외
let user = {
  name: "John",
  age: 30,
  _password: "***"
};

user = new Proxy(user, {
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
  
// 모든 프로퍼티를 대상으로 호출됩니다.
  getOwnPropertyDescriptor(target, prop) { 
    return {
      enumerable: true,
      configurable: true
      /* 이 외의 플래그도 반환할 수 있습니다. "value:..."도 가능합니다. */
    };
  }
});

// "ownKeys" 트랩은 _password를 건너뜁니다.
for(let key in user) alert(key); // name, age

// 아래 두 메서드에도 동일한 로직이 적용됩니다.
alert( Object.keys(user) ); // name,age
alert( Object.values(user) ); // John,30
```

### 1-2-4 deleteProperty와 프로퍼티 보호 트랩

```
// `_`로 시작하는 프로퍼티 접근 및 순회 불가 코드
let user = {
  name: "John",
  _password: "***"
};

user = new Proxy(user, {

  get(target, prop) {
    if (prop.startsWith('_')) {
      throw new Error("접근이 제한되어있습니다.");
    }
    let value = target[prop];
    return (typeof value === 'function') ? value.bind(target) : value; 
    // 호출 값이 메서드일 경우 value.bind(target) 설정을 함으로써
    // user의 다른 메서드에서 this_password를 사용가능하게 함 
  },

  set(target, prop, val) { // 프로퍼티 쓰기를 가로챕니다.
    if (prop.startsWith('_')) {
      throw new Error("접근이 제한되어있습니다.");
    } else {
      target[prop] = val;
      return true;
    }
  },

  deleteProperty(target, prop) { // 프로퍼티 삭제를 가로챕니다.
    if (prop.startsWith('_')) {
      throw new Error("접근이 제한되어있습니다.");
    } else {
      delete target[prop];
      return true;
    }
  },

  ownKeys(target) { // 프로퍼티 순회를 가로챕니다.
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "get" 트랩이 _password 읽기를 막습니다.
try {
  alert(user._password); // Error: 접근이 제한되어있습니다.
} catch(e) { alert(e.message); }

// "set" 트랩이 _password에 값을 쓰는것을 막습니다.
try {
  user._password = "test"; // Error: 접근이 제한되어있습니다.
} catch(e) { alert(e.message); }

// "deleteProperty" 트랩이 _password 삭제를 막습니다.
try {
  delete user._password; // Error: 접근이 제한되어있습니다.
} catch(e) { alert(e.message); }

// "ownKeys" 트랩이 순회 대상에서 _password를 제외시킵니다.
for(let key in user) alert(key); // name
```

- 그러나 프록시로 접근 제어를 하는 것은 좋은 방법이 아님
> private / protected 프로퍼티를 사용하는 것이 좋음

## 1-2-5 has

-  `has(target, property)`
	- `target`
	- `property`

-  `in` 호출을 가로채는 트랩 메서드
```
let range = {
  start: 1,
  end: 10
};

range = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end;
  }
});

alert(5 in range); // true
alert(50 in range); // false
```

### 1-2-6 apply

- `apply(target, thisArg, args)`
	- `target`
	- `thisArg` : `this`
	- `args` : 인수

- 함수 호출시 동작
```
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    }
  });
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);
alert(sayHi.length); // 1 (*) 프락시는 "get length" 연산까지 타깃 객체에 전달해줍니다.
sayHi("John"); // Hello, John! (3초 후)
```

## 1-3 Reflect

- Reflect는 Proxy 생성을 단순화하는 기본 제공 객체
- 내부 메서드를 감싸 `[[Get]]`, `[[Set]]`을 직접 불러오는 것을 가능하게 함  
  
|Operation|`Reflect` call|Internal method|
|---|---|---|
|`obj[prop]`|`Reflect.get(obj, prop)`|`[[Get]]`|
|`obj[prop] = value`|`Reflect.set(obj, prop, value)`|`[[Set]]`|
|`delete obj[prop]`|`Reflect.deleteProperty(obj, prop)`|`[[Delete]]`|
|`new F(value)`|`Reflect.construct(F, value)`|`[[Construct]]`|
|…|…|…|

- `Reflect`의 메소드 이름과 내부 메서드 이름이 같음
> 따라서 내부 메서드를 `Proxy`를 통해 호출시 `Reflect.method`를 사용

```
let user = {
  name: "John",
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
    return Reflect.get(target, prop, receiver); // (1)
  },

  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
    return Reflect.set(target, prop, val, receiver); // (2)
  }
});

let name = user.name; // "GET name"
user.name = "Pete"; // "SET name=Pete"
```

### 1-3-1 왜 Reflect를 사용하는가?

- 상속 관계에서 `reciever`를 사용하지 않으면 원하지 않은 결과가 나타난다
```
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*) target = user
  }
});

let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

// 원하는 값 : Admin
alert(admin.name); // Guest (?)
```
- `admin.name`으로 `get` 메서드 호출시 `userProxy` 객체가 동작 
- 이 때 `userProxy`의 `target`은 `user`로 고정되어있음
>따라서 `target[prop] === user[name]`이 되어 `Guest`가 호출!

- 올바른 상속을 위한 `Reflect(target, prop, reciever)` 사용
```
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin
    return Reflect.get(target, prop, receiver); // (*)
  }
});


let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

alert(admin.name); // Admin
```

## 1-4 Proxy 제한사항

> `Proxy`는 낮은 수준에서 내부 메서드에 접근할 수 있는 방법을 제공하지만 몇 가지 제한이 존재

- `Map, Set, Date, Promise`등 내장 객체는 `내장 슬롯`을 사용함
> `내장 슬롯`은 내부 프로퍼티처럼 동작하며 `[[Get]]`,`[[Set]]`을 통해 접근하지 않음
> `Map`의 경우 `[[MapData]]`에 값을 저장함
>  `Map.prototype.set` 메서드는 내부 프로퍼티 `this.[[MapData]]`에 접근을 시도하지만 
> `this == Proxy`이므로 접근 실패

- 배열은 내장 슬롯이 없음

- Proxy는 `===` 연산에 대한 인터셉트 불가
>객체와 Proxy는 분리됨

- `this`에 `Map`객체를 할당하면 Proxy 제한을 해제할 수 있음 
```
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1 (works!)
```

- Private 접근자도 `내부 슬롯`을 사용함 -> `[[Get]] / [[Set]]`으로 접근하지 않음

## 1-5 취소가능한 프록시(Revocable Proxy)

- 원할 때 끌 수 있는 프록시
```
let {proxy, revoke} = Proxy.revocable(target, handler)
```

- `revoke()` 메서드 사용하여 끄기 가능
- 해당 프록시에 감싸진 모든 내부 참조를 제거
>`target`은 가비지 컬렉터의 대상이 됨
```
let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

// object를 감싼 프록시
alert(proxy.data); // Valuable data

// 프록시 해제
revoke();

alert(proxy.data); // Error
```

---
#proxy #reflect
