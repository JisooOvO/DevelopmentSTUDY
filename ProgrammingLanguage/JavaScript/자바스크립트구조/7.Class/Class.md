
```table-of-contents

```

---
# 1. Class

- 모던 자바스크립트에 도입된 문법
- new Function 을 사용하여 동일한 종류의 객체를 여러개 만들 수 있음

## 1-1 자바스크립트에서 클래스

- 클래스 내에서 정의된 메서드들은 클래스.prototype에 저장됨
- 자바스크립트에서 클래스는 함수 
	`typeof Myclass === function`

![[Jsclass1.png]]
- constructor 에서 객체를 만들고 메소드는 prototype에 저장 
	`User === User.prototype.constructor`
	`User.prototype.sayHi === "alert(this.name);"

## 1-2 클래스와 함수의 차이

- function
>function 으로 만드는 순수 함수의 프로토타입은 constructor 프로퍼티를 기본으로 가지고 있음
>따라서 constructor 프로퍼티를 명시할 필요 없음

- class
>class 로 만든 함수에는 특수 내부 프로퍼티 `[[IsClassConstructor]] : true` 가 존재함
>class 로 정의한 함수를 new 연산자 없이 사용할 경우 이 프로퍼티가 작용하여 에러발생
>class 를 문자열로 형변환시 `class 클래스명` 으로 나올때도 사용
>클래스에 정의된 메서드의 `enumerable flag : false` -> Non-enumerable
>따라서 for..in 순회 시 메서드 제외
>또한 클래스는 항상 엄격 모드로 실행 

---
# 2. 문법

```
class MyClass {
  // 프로퍼티
  prop = value;

  // 생성자 메서드
  constuctor() {...}

  // 메서드
  method1() {...}
  ...

  // getter / setter
  get something(...){}
  set something(...){}

  //계산된 이름 메서드(심볼)
  [Symbol.iterator]() {}
  ...
}
```

## 2-1 호출

```
let class = new MyClass();
```

## 2-2 Constructor 메서드

-  Constructor() 는 객체의 기본 상태를 설정,
-  new 에 의해 자동으로 호출됨
- Constructor 메서드에 인수를 지정하면 자동으로 name 프로퍼티에 인수 할당

```
class User {

  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
}

// 사용법:
let user = new User("John");
user.sayHi();
```

### 2-2-2 getter / setter 구현

```
class User {

  constructor(name) {
    // setter를 활성화합니다.
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      alert("이름이 너무 짧습니다.");
      return;
    }
    this._name = value;
  }
}

let user = new User("보라");
alert(user.name); // 보라

user = new User(""); // 이름이 너무 짧습니다.
```

## 2-3 클래스 표현식

### 2-3-1 기명 클래스 표현식

```
// 기명 클래스 표현식(Named Class Expression)
// (명세서엔 없는 용어이지만, 기명 함수 표현식과 유사하게 동작합니다.)

let User = class MyClass {
  sayHi() {
    alert(MyClass); // MyClass라는 이름은 오직 클래스 안에서만 사용할 수 있습니다.
  }
};

new User().sayHi(); // 원하는대로 MyClass의 정의를 보여줍니다.

alert(MyClass); // ReferenceError: MyClass is not defined, 
MyClass는 클래스 밖에서 사용할 수 없습니다.
```

### 2-3-2 클래스 동적 생성

```
function makeClass(phrase) {
  // 클래스를 선언하고 이를 반환함
  return class {
    sayHi() {
      alert(phrase);
    };
  };
}

// 새로운 클래스를 만듦
let User = makeClass("안녕하세요.");
new User().sayHi(); // 안녕하세요.
```

### 2-3-3 계산된 메서드 이름

```
class User {

  ['say' + 'Hi']() {
    alert("Hello");
  }
}

new User().sayHi();
```
​
## 2-4 클래스 필드

-  일반적인 프로퍼티를 정의하듯이 클래스 내부에도 프로퍼티 추가가능
-  클래스 필드는 클래스의 prototype이 아닌 개별 객체에 설정

```
class User {
  name = "보라";
}

let user = new User();

alert(user.name); // 보라
alert(User.prototype.name); // undefined

```

​
### 2-4-1 클래스 필드 바인딩

-  클래스 필드를 화살표 함수로 구현하면 함수의 this를 해당 객체에 바인딩 됨

```
class Button {
	constructor(value) {
    this.value = value;
  }

  //화살표 함수로 구현한 클래스 필드
  ​click = () => {
    alert(this.value);
  }
}

let button = new Button("안녕하세요.");
setTimeout(button.click, 1000); // 안녕하세요.
```

-  단, 이 경우 해당 메소드를 통해 클래스의 prototype으로 접근이 불가능
>따라서 setTimeout(() => button.click(), 1000)로 래퍼함수를 전달하는 것이 좋을 수 있음

---
# 3. 클래스상속 

-  클래스를 다른 클래스로 확장할 수 있음

```
class Animal{
	constructor(name){
		this.speed = 0;
		this.name = name;
	}

	run(speed){
		this.speed = speed;
		alert(`${this.name} 은 ${this.speed}의 속도로 달림`);
	}

	stop(){
		this.speed = 0;
		alert(`${this.name} 이 멈춤`);
	}
}

//Animal 상속받는 Rabbit 정의하기
//extends 뒤에 클래스 또는 함수표현식이 올 수 있음 
class Rabbit extends Animal{
	hide(){
		alert(`${this.name}이 숨음`);
	}

	//메서드 오버라이드
	stop(){
		super.stop(); // Animal의 stop() 메서드를 호출
		alert("토끼는 멈췄다");
	}
}

let rabbit = new Rabbit("흰 토끼");
rabbit.run(5); // 흰토끼 은 5의 속도로 달림
rabbit.hide(); // 흰토끼 이 숨음
rabbit.stop(); // 흰토끼 이 멈춤 토끼는 멈췄다
```

-  rabbit 객체의 클래스 Rabbit 은 Animal 을 상속
> Rabbit.prototype.`[[Prototype]]` === Animal.prototype
> 이므로 Animal 의 메서드를 사용가능

-  super() 메서드로 부모 클래스의 메서드를 호출 가능
> 부모생성자를 호출, 자식 생성자 내부에서만 사용 가능
> 화살표 함수는 super() 가 없음

## 3-1 생성자 오버라이딩

- 클래스 상속시  super() 메서드를 가진 constructor 가 생성

```
class Rabbit extends Animal{
	//자동생성
	constructor(...args){
		super(...args);
	}

	//다음 생성자는 올바르지않음
	constructor(name, earLength){
		this.speed = 0;
		this.name = name;
		this.earLength = earLength;
	}
}
```

- 상속 클래스의 생성자에는 반드시 super(...arg)가 호출되어야함
>this 를 사용하기전 반드시 호출
>자바스크립트는 상속클래스의 생성자함수(derived constructor)와 그냥 생성자 함수를 구분
>상속 클래스의 생성자 함수엔 특수 내부 프로퍼티 `[[ConstructorKind]] : "derived"`가 존재함
>일반 클래스가 new 로 실행되면 빈 객체를 생성하고 this 에 할당하지만
>상속 클래스의 생성자 함수는 this 에 객체를 할당하는 일을 부모 클래스의 생성자에게 맡김

### 3-1-1 자바스크립트의 오버라이딩

-  상속클래스의 생성자는 반드시 super() 이후에 this 가 올 수 있으므로 다음과 같은 특징이 있음

```
class Animal{
	name = 'animal';

	constructor(){
		alert(this.name);
	}
}

class Rabbit extends Animal{
	name = 'rabbit';
}

new Animal(); // animal
new Rabbit(); // animal
```

-  상속클래스 Rabbit의 생성자에서 자동으로 super()가 실행되어 부모 메서드의 생성자를 호출
> 호출 시점의 this.name 에는 'animal' 이 할당되어있어 Rabbit 객체 생성시 animal 이 출력
> 이후 Rabbit 클래스의 this에 'rabbit'이 할당
> 따라서 부모 메서드를 사용하기위해서 자식 클래스에서 부모 클래스의 메서드를 오버라이딩 해야함


### 3-1-2 특수 객체 프로퍼티 HomeObject

-  상속시 this 만으로 해결할 수 없는 일이 있음
-  `[[HomeObject]]` 최근 추가된 자바스크립트 문법

```
let animal = {
	name : '동물',
	eat(){
		alert(`${this.name} 이 먹이를 먹음`);
	}
};

let rabbit = {
	__proto__ : animal,
	name : '토끼',
	eat(){
		this.__proto__.eat.call(this);
	}
};

let longEar = {
	__proto__ : rabbit,
	eat(){
		this.__proto__.eat.call(this);
	}
};

rabbit.eat(); // 토끼 이 먹이를 먹음
longEar.eat(); // RangeError : Maxmimum call stack size exceeded
```

-  모든 객체 메서드는 프로토타입이 아닌 현재 객체를 this로 가짐

-  rabbit.eat() 호출시 this는 rabbit
> 따라서 this.`__proto__`.eat().call(this) === rabbit.`__proto__`.eat().call(this)
> rabbit.`__proto__`.eat() === animal.eat() 이고 this(rabbit)을 call 바인딩했으므로
> this.name === 'rabbit'

-  longEar.eat() 호출시 this는 longEar
> 따라서 this.`__proto__`.eat.call(this) === longEar.`__proto__`.eat.call(this)
> 이 때 longEar.`__proto__` === rabbit 이므로 rabbit 의 메서드 eat()이 실행
> 그러나 eat() 메서드 내부의 this.`__proto__` 의 this가 longEar이므로 무한 루프에 빠짐
> 이 경우 `[[HomeObject]]` 프로퍼티를 사용함

-  클래스 또는 객체 함수의 `[[HomeObject]]`에는 해당 객체가 저장됨
> super() 메서드는 이 프로퍼티를 이용하여 부모 프로토타입과 메서드를 찾음

```
let animal = {
	name : '동물',
	eat(){
		alert(`${this.name} 이 먹이를 먹습니다`);
	}
};

let rabbit = {
	__proto__ : animal,
	name : '토끼',
	​￼eat(){
		super.eat(); // rabbit.eat.[[HomeObject]] == rabbit
	}
};

​￼let longEar = {
	__proto__ : rabbit,
	name : '귀가 큰 토끼',
	​￼eat(){
		super.eat();
	}

longEar.eat() // 제대로 동작
};
```

> super() 메서드로 부모 클래스 animal의 메서드 eat()을 호출할 때 `[[HomeObject]]`에  
> 객체 본인을 담아 보냄 -> 따라서 eat() 메서드의 this 는 호출한 객체 본인이 됨

- 개발자가 `[[HomeObject]]`를 변경할 방법은 없지만 오직 super() 내에서만 동작함
> 따라서 super() 를 사용 할 경우 메서드 자유도에 제한이 걸림

- `[HomeObject]]`는 메서드 문법으로 메서드를 정의해야 제대로 동작함
> 함수 프로퍼티를 사용해 메서드 생성시 SyntaxError 발생

```
let animal = {
	​eat : function(){
		...
	}
};

​let rabbit = {
	__proto__ : animal,
	​eat : function(){
		super.eat(); // SyntaxError 지점
	}
};

rabbit.eat(); // SyntaxError : 'super' keyword unexpected here
```

---
# 4. 정적 메서드와 프로퍼티

## 4-1 정적 메서드

-  클래스 prototype 이 아닌 함수 자체에 메서드를 설정할 경우 정적 메서드 사용
-  특정 인스턴스가 아닌 클래스 전체에 필요한 기능을 만들 때 사용
> 주로 여러가지 객체를 위에서 바라보며 메서드 처리할 경우 사용 (비교, 데이터베이스)
-  메서드 앞에 static을 붙이면 정적 메서드

```
class User{
	static staticMethod(){
		alert(this === User);
	}
}

User.staticMethod(); // true
```

-  메서드를 프로퍼티 형태로 직접 할당하는 것과 같음

## 4-2 정적 프로퍼티

-  프로퍼티 앞에 static을 붙이면 정적 프로퍼티

```
class Article{
	static publisher = 'lyads';
}

alert(Article.publisher); // 'lyads'
```


## 4-3 정적프로퍼티와 메서드 상속

-  정적 프로퍼티 / 메서드는 상속됨

```
class Animal {

  static planet = "지구";

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name}가 속도 ${this.speed}로 달립니다.`);
  }

  //객체 상위 환경에서 비교
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
}


// Animal을 상속받음
class Rabbit extends Animal {
  hide() {
    alert(`${this.name}가 숨었습니다!`);
  }
}

let rabbits = [
  new Rabbit("흰 토끼", 10),
  new Rabbit("검은 토끼", 5)
];

rabbits.sort(Rabbit.compare);
rabbits[0].run(); // 검은 토끼가 속도 5로 달립니다.
alert(Rabbit.planet); // 지구
```

![[Jsclass2.PNG]]

> Rabbit.`__proto__` === Animal
> Rabbit.prototype.`__proto__` === Animal.prototype

---
# 5. 클래스와 Object 상속 클래스의 차이

- class Rabbit 과 class Rabbit extends Object의 차이점
> Object를 상속받은 Rabbit 클래스는 다음을 만족한다
> Rabbit.prototype.`__proto__` === Obeject.prototype
> 따라서 Object의 정적 메서드에 접근가능
> 단 constructor 에서 super() 호출해야함
> (getOwnPropertyNames, hasOwnProperty ...)
>그러나 Object를 상속받지 않은 Rabbit 클래스의 `__proto__`는 Object가 아님

- Object를 상속받지 않은 class Rabbit의 경우
>Rabbit.`__proto__` =/= Object 
>Rabbit.`__proto__` === Function
>을 만족한다

---
# 6. private, protected 프로퍼티와 메서드

## 6-1 protected

-  복잡한 애플리케이션 구현시 내부 인터페이스와 외부 인터페이스를 구분해야함
-  자바스크립트는 2가지 타입의 객체 필드를 제공
> public : 언제든 접근 가능하며 외부 인터페이스를 구성
> private : 클래수 내부에서만 접근가능한 내부 인터페이스
> 
-  자바스크립트는 protected 접근자를 지원하지 않지만 모방해서 사용할 수 있음
> protected : 자신과 자손 클래스에서만 접근 가능

```
class CoffeeMachine {
  _waterAmount = 0; // 물통에 차 있는 물의 양, 변수명 앞에 _을 붙이면 protected로 동작

  set waterAmount(value){
	  if(value < 0) throw new Error("물의 양은 음수가 될 수 없음");
	  this.waterAmount = value;
  }

  get waterAmount(){
	  return this._waterAmount;
  }

  constructor(power) {
    this.power = power;
    alert( `전력량이 ${power}인 커피머신을 만듭니다.` );
  }
}

// 커피 머신 생성
let coffeeMachine = new CoffeeMachine(100);

// 물 추가
coffeeMachine.waterAmount = -10; //Error : 물의 양은 음수가 될 수 없음
```

-  변수명 앞에 `_`을 붙이면 protected 접근자로 동작
> getter / setter 를 이용해 외부에서 접근


-  getter 만 사용할 경우 읽기 전용 메서드 / 프로퍼티가 됨

```
class CoffeeMachine {
  // ...
  constructor(power) {
    this._power = power;
  }

  //또는 getPower(){}
  get power() {
    return this._power;
  }
}

// 커피 머신 생성
let coffeeMachine = new CoffeeMachine(100);
alert(`전력량이 ${coffeeMachine.power}인 커피머신을 만듭니다.`); 
// 전력량이 100인 커피머신을 만듭니다.

coffeeMachine.power = 25; // Error (setter 없음)
```

-  protected 필드는 상속이 가능

## 6-2 private

-  private 프로퍼티 / 메서드는 최근 추가된 자바스크립트 문법
- `#`으로 시작하는 변수 / 메서드

```
class CoffeeMachine {
  #waterLimit = 200;

  // private 프로퍼티는 getter/setter로 접근
  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) throw new Error("물의 양은 음수가 될 수 없습니다.");
    this.#waterAmount = value;
  }

  #checkWater(value) {
    if (value < 0) throw new Error("물의 양은 음수가 될 수 없습니다.");
    if (value > this.#waterLimit) throw new Error("물이 용량을 초과합니다.");
  }
}

let coffeeMachine = new CoffeeMachine();

// 클래스 외부에서 private에 접근할 수 없음
coffeeMachine.#checkWater(); // Error
coffeeMachine.#waterLimit = 1000; // Error
```

- private 는 상속되지 않음
> 접근시 getter/setter로 접근해야함
> 또한 this을 허용하지 않음

---
# 7. 내장 클래스 확장

-  Array, Map 같은 내장 클래스도 상속받을 수 있음(extends)

```
// 메서드 하나를 추가합니다(더 많이 추가하는 것도 가능).
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```

-  Array를 상속받을 경우 Array 메서드 filter의 반환형으로 PowerArray 객체가 반환
> arr.constructor === PowerArray

## 7-1 Symbol.species

- 특수 정적 getter 메서드로써 map , filter 메서드 호출시 생성되는 객체의 생성자 지정 가능

```
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

  // 내장 메서드는 반환 값에 명시된 클래스를 생성자로 사용합니다.
  // filter의 반환형으로 Array를 설정
  static get [Symbol.species]() {
    return Array;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter는 arr.constructor[Symbol.species]를 생성자로 사용해 새로운 배열을 만듭니다.
let filteredArr = arr.filter(item => item >= 10);

// filteredArr는 PowerArray가 아닌 Array의 인스턴스입니다.
// filter에서 Array형이 반환되어 PowerArray의 메서드 사용 불가
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
```


## 7-2 내장 객체와 정적 메서드 상속

-  내장 클래스는 정적 메서드를 상속받지 못함
> Array, Date 는 Object를 상속받아 Object.prototype 에 구현된 메서드는 사용가능
> 그러나 Array.`[[Prototype]]`은 Object를 참조하지 않음
> 따라서 Array.key() 같은 정적메서드를 사용하지 못함

![[Jsclass3.PNG]]

- Object와 Date는 독립적
>단 extends 사용시 정적메서드를 상속받아 사용가능

---
# 8. instanceof

- instanceof 연산자 사용시 객체가 특정 클래스에 속하는지 확인 가능 또한 상속관계도 확인
>protoype이 프로토타입 체인 상에 위치하는지 여부를 체크

## 8-1 문법

```
obj instanceof Class
```

- 반환형은 Boolean(true / false)

### 8-1-1 클래스 함수

```
class Rabbit {}
let rabbit = new Rabbit();

// rabbit이 클래스 Rabbit의 객체인가요?
alert( rabbit instanceof Rabbit ); // true
```

### 8-1-2 생성자 함수

```
// 클래스가 아닌 생성자 함수
function Rabbit() {}

alert( new Rabbit() instanceof Rabbit ); // true
```

### 8-1-3 내장 클래스

```
let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
```

- Array는 Object를 상속하는데 instanceof는 상속여부도 확인

## 8-2 동작 방식

- 클래스 내에 정적 메서드 Symbol.hasInstance 가 구현되어 있을 때
> Class`[Symbol.hasInstance](obj)`가 호출됨 

```
// canEat 프로퍼티가 있으면 animal이라고 판단할 수 있도록
// instanceOf의 로직을 직접 설정합니다.
class Animal {
  static [Symbol.hasInstance](obj) {
    if (obj.canEat) return true;
  }
}

let obj = { canEat: true };
alert(obj instanceof Animal); // true, Animal[Symbol.hasInstance](obj)가 호출됨
```

- Symbol.hasInstance 가 구현되어있지 않은 경우 
> Class.prototype이 obj 프로토타입 체인 내에 일치하는지 확인

```
obj.__proto__ === Class.prototype?
obj.__proto__.__proto__ === Class.prototype?
obj.__proto__.__proto__.__proto__ === Class.prototype?
...
```

## 8-3 objA.isPrototypeOf(objB)

- objA 가 objB의 프로토타입 체인 상에 있을때 ture를 반환하는 메서드
> obj instanceof Class 와 Class.prototype.isPrototypeOf(obj)는 같음
> 단 isPrototypeOf는 Class 생성자를 제외하고 검사

## 8-4 Object.prototype.toString

- 일반 객체를 문자열로 변환시 `[obejct Object]`로 변환
- Object.prototype.toString 을 사용하면 객체 내장 toString의 문자열 형태 반환
```
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

## 8-5 Symbol.toStringTag

- 특수 객체 프로퍼티로 toString 의 동작 커스터마이징

```
let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
```

## 8-6 결론

 |             | 동작 대상                                           | 반환값  |
 | ----------- | --------------------------------------------------- | ------- |
 | typeof      | 원시형                                              | 문자열  |
 | {}.toString | 원시형, 내장 객체, `Symbol.toStringTag`가 있는 객체 | 문자열  |
 | instanceof  | 객체                                                | Boolean |

---
# 9. 믹스인(mixin)

- 자바스크립트는 단일상속만을 허용
> 한 객체는 하나의 `[[Prototype]]`을 가지는 것을 허용
> 이러한 한계를 믹스인 클래스를 정의하여 다른 클래스에 행동을 더해줌

## 9-1 구현 방법

- 메서드를 복사할 믹스인 클래스를 생성하고 Object.assign을 통해 메서드 복사

```
// 믹스인
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};


// User 클래스 정의 
class User {
  constructor(name) {
    this.name = name;
  }
}

// 메서드 복사
// Object.assign을 통해 상속없이 메서드 복사
Object.assign(User.prototype, sayHiMixin);

// 이제 User가 인사를 할 수 있습니다.
new User("Dude").sayHi(); // Hello Dude!
```

## 9-2 이벤트 믹스인

- 객체에 이벤트를 생성할 때 사용

```
let eventMixin = {
  /**
   *  이벤트 구독
   *  사용패턴: menu.on('select', function(item) { ... }
  */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   *  구독 취소
   *  사용패턴: menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   *  주어진 이름과 데이터를 기반으로 이벤트 생성
   *  사용패턴: this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return; // no handlers for that event name
    }

    // 핸들러 호출
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};

// 클래스 생성
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}

// 이벤트 관련 메서드가 구현된 믹스인 추가
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// 메뉴 항목을 선택할 때 호출될 핸들러 추가
menu.on("select", value => alert(`선택된 값: ${value}`));

// 이벤트가 트리거 되면 핸들러가 실행되어 얼럿창이 뜸
// 얼럿창 메시지: 선택된 값: 123
menu.choose("123");
```

---
#JavaScriptClass

