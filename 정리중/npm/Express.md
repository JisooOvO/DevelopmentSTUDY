```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. Express
- Node.js를 위한 웹 애플리케이션 프레임워크
- 웹 서버 생성, 라우팅, 미들웨어, 템플릿 엔진 지원, 정적 파일 서비스 제공, RESTful API 구축 및 세션 인증관리 기능 제공


## 1-1 설치방법

```
// terminal
npm i express

```

## 1-2 실행방법

```
import express from "express"

const app = express();

...

app.listen(3000); // 포트 3000으로 지정
```

# 2. Pug
- HTML 코드를 간결하게 작성하게 해주는 템플릿 언어
- Express 사용시 뷰 엔진으로 활용

```
html
	head
		title My Pug Page
	body
		h1 Hello, Pug!
		
```