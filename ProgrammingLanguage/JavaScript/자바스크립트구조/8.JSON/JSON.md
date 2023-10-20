```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. JSON

- 복잡한 객체를 어딘가에 보내거나 로깅 목적으로 출력시 문자열로 변환해야함
- 값이나 객체를 나타내주는 범용 포맷으로, RFC 4627 표준에 정의
> 인코딩된(JSON-encoded), 직렬화 처리된(serialized), 
> 문자열로 변환된(stringified), 결집된(marshalled) 객체

## 1-1 JSON 문자열 특징
 
- 문자열은 큰 따옴표로 감싸짐(백틱/작은 따옴표 X)
- 객체 키 이름도 큰 따옴표로 감쌈
- 숫자, null, Boolean, 배열은 그대로 출력
- 주석 지원 X -> 추가시 유효하지 않은 형식

## 1-2 JSON 메서드

### 1-2-1  JSON.stringify

- `JSON.stringify(value [, replacer, space])` :
	- `value` : 객체(인코딩 하려는 값)
	* `replacer` : 인코딩 하길 원하는 프로퍼티의 배열/함수(function)
	- `space` : 서식 변경 목적의 공백 수,중첩 객체의 프로퍼티를 들여쓰기

- 객체를 JSON으로 바꿔줌
> 중첩 객체도 알아서 문자열로 변경
> 무시되는 프로퍼티 :`함수 메서드, 심볼 프로퍼티, 값이 undefined인 프로퍼티`	

- 순환 참조가 있으면 원하는 대로 객체를 문자열로 바꾸는 게 불가능
> replacer로 순환참조 값 제외하거나 `toJSON()` 메소드 사용

```
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup은 room을 참조합니다
};

room.occupiedBy = meetup; // room은 meetup을 참조합니다

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`);
  return (key == 'occupiedBy') ? undefined : value;
}));

/* replacer 함수에서 처리하는 키:값 쌍 목록
	:             [object Object]
	title:        Conference
	participants: [object Object],[object Object]
	0:            [object Object]
	name:         John
	1:            [object Object]
	name:         Alice
	place:        [object Object]
	number:       23
*/
```

- 함수로 호출시 함수가 최초로 호출될 때 {" : meetup} 형태의 래퍼 객체가 생성

### 1-2-2 toJSON()

- 객체를 JSON으로 변환

### 1-2-3 JSON.parse

- JSON을 객체로 바꿔줌
- `JSON.parse(str,[reviver])` :
	- `str` : JSON 형식 문자열
	- `reviver` : `(key, value)` 쌍을 대상으로 호출되는 `function(key,value)` 함수 형태 값을 변경

---
#JSON