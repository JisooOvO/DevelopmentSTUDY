```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. NPM(Node Package Manager)
- Node.js 패키지(모듈) 관리용 도구
- Node.js 설치시 자동으로 설치
## 1-1 package.json
- npm을 통해 설치된 패키지 목록을 관리하고 프로젝트의 정보 및 기타 실행 스크립트를 작성하는 파일
- npm init 명령을 통해 Node.js 프로젝트를 초기화 할 경우 자동으로 생성

### 1-1-1 package.json 기본값
```
{
  "name": "폴더명",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1".
	//test 스크립트 실행시 "Error: no test specified\" 메시지 표시후 
    //프로세스 코드 1로 종료

    "dev" : "nodemon"
    //npm run dev로 실행시 nodemon 스크립트 실행
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

- `name` : 프로젝트의 이름, npm 레지스트리에서 해당 패키지 식별시 사용
- `version` : 프로젝트의 현재 버전, Semantic Version 규칙 세트를 사용
- `description` : 프로젝트의 목적, 특징 등 간단한 설명을 명시
- `main` : 프로젝트의 주 진입점 파일
- `script` : npm 스크립트를 정의
	- `test`
	- `dev`
- `keywords` : 프로젝트 관련 키워드 정의, 검색 엔진이나 패키지 매니저에서 사용
- `author` : 프로젝트 저자
- `license` : 프로젝트의 라이선스

## 1-2 NPM 명령어 

- `npm init [option]` :
> Node.js 프로젝트 초기화
>  `-y` : 사용자가 프로젝트 설정을 입력하지 않고 기본값으로 프로젝트 초기화


---
#npm