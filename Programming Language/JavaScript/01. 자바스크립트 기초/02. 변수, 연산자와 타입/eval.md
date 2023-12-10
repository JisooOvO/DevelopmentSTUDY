```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. eval

- 내장 함수 `eval` 사용시 문자열 형태의 코드를 자바스크립트 스크립트로 실행 가능

## 1-1 문법

```
let result = eval(code);
```

- 마지막 구문의 결과가 eval의 결과
```
let value = eval('let i = 0; ++i');
alert(value); //1
```

## 1-2 eval 실행 환경

- eval 은 현재 렉시컬 환경에서 실행되므로 외부 변수에 접근 가능
```
let a = 1;
function f() {
	let a = 2;
	eval('alert(a)'); //2
}
f();
```

- eval 내부는 엄격모드가 적용되어 외부에서 접근 불가
```
eval("let x = 5");
alert(typeof x) // undefined
```

## 1-3 eval은 과거의 메서드

> 자바스크립트 파일을 압축해주는 코드 압축기(minifier)는 스크립트 크기를 줄이기 위해 
> 지역 변수명을 짧게 변경함, 이 때 eval에서 지역 변수에 접근하려는 시도가 있기 때문에
> 압축기는 eval에서 접근할 가능성이 있는 모든 변수의 이름을 변경하지 않음
> 따라서 압축률에 부정적인 영향을 미침 (코드 유지 보수가 어려워 짐)

## 1-4 eval을 대체하는 방법

### 1-4-1 window.eval()

- `eval` 내부 코드를 전역스코프로 실행 
```
let x = 1;
{
	let x = 5;
	window.eval('alert(x)'); // 1 (전역변수)
}
```

### 1-4-2 new Function

- `let func = new Function ([arg1, arg2, ...argN], functionBody)`
> `functionbody`에는 문자열 형태의 코드 전달 가능
```
let f = new function('a','alert(a)');

f(5) // 5
```

___
#eval