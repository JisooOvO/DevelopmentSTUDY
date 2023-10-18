```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. 인터페이스

- 각각의 브라우저는 모달 창을 제공, 이 창은 개발자가 모양을 수정할 수 없음
- 모달창이 생성된 동안 스크립트의 실행, 페이지와 상호작용 불가능

## 1-1 인터페이스 메서드

- `alert("메시지")`
>메시지가 있는 모달창(modal window)를 생성
>반환 값 없음(undefined)

- `prompt(title, [default])`
	- `title` : 텍스트 메시지
	- `default` : 필드의 초깃값
>메시지 / 입력 필드 / 확인(OK) / 취소(Cancel) 버튼이 있는 모달 창 생성
>입력 필드의 문자열을 반환(String)
>IE 에서는 기본값이 없을 경우 undefined 를 명시하므로 기본 값을 ' ' 로 주는 것이 좋음

- `confirm("질문")`
>질문 메시지 / 확인 / 취소 버튼이 이는 모달 창 생성
>확인 버튼 클릭시 true / 취소시 false 반환

---
>[[JavaScript|JavaScript]]
#Event