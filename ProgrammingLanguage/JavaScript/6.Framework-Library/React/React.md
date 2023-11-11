```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. Component 생성

- 컴포넌트는 마크업을 반환하는 Javascript 함수
- React 컴포넌트는 대문자로 항상 대문자로 시작해야함
```
function MyButton() {  
	return (  
		<button>I'm a button</button>  
	);  
}

export default MyButton
```

- 다른 컴포넌트에서 중첩하여 사용 가능
```
import MyButton from './MyButton.js'

function MyApp() {  
	return (  
		<div>  
			<h1>Welcome to my app</h1>  
			<MyButton />  
		</div>  
	);  
}
```

## 1-2 속성 추가

- React 속성은 HTML 속성과 동일하게 동작하지만 이름이 다름
- CSS 파일을 추가하는 방법을 규정하지 않음
- Inner Style 지정시 JSX `{ }` 내에서  Style 객체 `{ }`를 인수로 설정 
```
<img onClick={handleClick} 
	 className="css이름" 
	 style={{
		width : 100vw;
		...
	 }}
/>
```

## 1-3 JSX 

- 컴포넌트가 반환하는 마크업 구문을 JSX라고 함
>컴포넌트는 하나의 JSX 태그만 반환 가능
>빈 래퍼 `<> ... </>`  사용가능

- 태그 내에서 JSX 사용가능
> JSX `{ }` 내부에서 자바스크립트 문법 그대로 사용 가능

## 1-4 조건부 렌더링

- ? 연산자와 JSX를 이용하여 조건부로 렌더링이 가능
```
<div>  {isLoggedIn ? ( <AdminPanel /> ) : ( <LoginForm /> )} </div>
```

- 또는 Truthy 설정
```
<div> {isLoggeIn && <AdminPanel/>} <div>
```

## 1-5 목록 렌더링

- `map` 함수를 사용하면 Element 목록의 렌더링 가능
- 항목별 구분을 위해 `key` 속성 사용
```
const listItems = products.map(product =>  
	<li key={product.id}>  
		{product.title}  
	</li>  
);  

return (  
	<ul>{listItems}</ul>  
);
```

## 1-6 이벤트 응답

- 이벤트 핸들러 함수를 선언하여 응답가능
>이벤트 속성 값이 함수를 호출하지말고 전달만 해야함
```
function MyButton() {
	function handleClick() {
		alert('You clicked me!')
	}

	return (
		<button onClick={handleClick}>Click me</button>
	);
}
```

---
# 2. Hooks

- `use`로 시작하는 함수
- 최상단 엘리먼트에서만 Hook을 호출 할 수 있음

## 2-1 useState

- 현재 상태와 이를 업데이트할 함수의 2가지 정보를 지님
- 현재 상태가 변경되면 컴포넌트를 다시 렌더링
- `useState()` 내에 초기값 지정 가능
```
import { useState } from 'react';

// 각각의 버튼간 count는 다르게 동작
function MyButton(){
	const [count, setCount] = useState(0);
}
```

### 2-1-1 Lifting State Up

- 부모 엘리먼트에서 자식 엘리먼트에 전달하는 것을  *props*라고 함
- 상위 엘리먼트에서 Hook을 선언하여 자식 엘리먼트에 *props* 형태로 넘겨주는 것
```
export default function MyApp() {  
	const [count, setCount] = useState(0);  
	
	function handleClick() {  
		setCount(count + 1);  
	}  
	
	return (  
		<div>  
			<h1>Counters that update together</h1>  

			// 두 버튼의 count가 함께 오릅니다
			<MyButton count={count} onClick={handleClick} />  
			<MyButton count={count} onClick={handleClick} /> 
		</div>  
	);  
}

function MyButton({ count, onClick }) {  

	return ( 
		<button onClick={onClick}>  
			Clicked {count} times  
		</button>  
	);  
}
```

## 2-2 useEffect
## 2-3 useRef

---
# 3. React Route DOM

- brouserRoute
- Routes
- Route
- Link
- useParams

---
>#React