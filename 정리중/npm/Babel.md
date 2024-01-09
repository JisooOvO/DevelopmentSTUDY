```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. Babel
- 자바스크립트 코드를 변환하거나 ES6+ 문법을 사용하여 작성된 코드를 이전 버전의 자바스크립트 코드로 변환하는데 사용
- 호환성을 유지하고 최신 기능을 사용하는 도구

## 1-1 설치 방법
```
npm i @babel/core @babel/cli @babel/node @babel/preset-env -D
```

- `@babel/core` : Babel의 핵심 엔진, 코드 변환 로직을 담당
- `@babel/cli` : 명령행 인터페이스 제공, 터미널에서 `Babel` 명령어 사용 가능
- `@babel/node` : Node.js 애플리케이션 실행 가능하게 만드는 패키지
- `@babel/preset-env` : 최신 자바스크립트 코드를 이전 버전의 자바스크립트로 변환 또는 반대의 역할
> babel.config.json 파일에서 `presets` 프로퍼티에 추가해야함

```
//Terminal
babel-node src/server.js // src/server.js 스크립트 실행 명령어

//babel.config.json
{
	"presets" : ["@babel/preset-env"]
}
```


# 2. babel.config.json
- Babel 설정 파일
## 2-1 프로퍼티
- `presets` : 특정 환경에서 자주 사용되는 변환 규칙의 모음

---
#babel