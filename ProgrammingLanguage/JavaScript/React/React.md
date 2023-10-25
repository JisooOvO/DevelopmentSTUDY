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
```
<img onClick={handleClick} className="css이름"/>
```

## 1-3 JSX 

- 컴포넌트가 반환하는 마크업 구문을 JSX라고 함
>컴포넌트는 하나의 JSX 태그만 반환 가능
>빈 래퍼 `<> ... </>`  사용가능

- 태그 내에서 JSX 사용가능
> JSX `{ }` 내부에서 자바스크립트 문법 그대로 사용 가능

## 1-4 ? 연산자로 조건부 렌더링

```
<div>  {isLoggedIn ? ( <AdminPanel /> ) : ( <LoginForm /> )} </div>
```

## 1-5 map 함수를 사용하여 목록 렌더링

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

---
# 2. Hooks

- useState
- useEffect
- useRef

---
# 3. React Route DOM

- brouserRoute
- Routes
- Route
- Link
- useParams

---
>#React