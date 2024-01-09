```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. Nodemon
- Node Monitor의 약자
- 코드 변경을 감지하여 자동으로 서버를 다시 시작하는 도구
## 1-1 설치방법
```
//Terminal
npm install nodemon
```

## 1-2 실행방법
### 1-2-1 터미널 명렁어로 실행 
```
//Terminal
nodemon appName.js
```
### 1-2-2 npm 스크립트 추가
1. package.json에 다음 코드 추가
```
//package.json
"scripts" : {
	"start" : "nodemon appName.js"
}
```

2. 추가 후 터미널에서 `npm start`로 실행 
```
//Terminal
npm start
```

# 2. nodemon.json
- nodemon의 구성 지정
- 프로젝트의 코드가 변경될 때마다 해당 구성에 따라 코드 실행
## 2-1 프로퍼티
- `ignore` : nodemon이 코드 변경시에도 재시작 하지 않을 디렉토리 설정

```
{
	"ignore" : ["src/public/**"]
}
```

- `exec` : nodemon이 실행할 명령어 지정

```
{
	//babel-node를 사용하여 src/server.js 파일 실행
	"exec" : "babel-node src/server.js"
}
```

---
#nodemon