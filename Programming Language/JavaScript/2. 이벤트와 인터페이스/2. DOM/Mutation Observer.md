```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. MutationObserver

- DOM 요소의 변경사항을 감지하면 콜백을 실행하는 내장 객체
- 변경사항이 발생하면 콜백함수가 실행되어  MutationRecord 객체 리스트의 첫 번째 인자로 전달
```
// 옵저버 생성
let observer = new MutationObserver(callback);

// 노드 감시
observer.observe(node, config)
```

- `config` : node의 어떤 변경 사항을 감지할지 선택하는 객체
	- `childList` : 직계 자손 변경
	- `subtree` : 모든 자손 변경
	- `attributes` : 속성 변경 감시
	- `attributeFilter` : 선택된 속성만 감시
	- `characterData` : `node.data`(텍스트) 감시
	- `attributeOldValue` : `true`일 경우 이전 값과 새 값을 모두 콜백에 전달(`false`면 새 값만 전달)
	- `characterDataOldValue` : `true`일 경우 이전 값과 새 값을 모두 콜백에 전달(`false`면 새 값만 전달)

- 노드를 감시 중이어도 해당 노드가 제거되면 가비지 컬렉터의 대상이 됨(`Week Reference`)

## 1-1 MutationRecord


- MutationRecord의 프로퍼티
	- `type : <type>` : 변경 타입
		- `"attribute"`
		- `"characterData"`
		- `"childList"`
	- `target` : 변경이 발생한 위치
	- `addedNodes/removedNodes` : 추가 / 제거된 노드
	- `previousSibling/nextSibling` – 추가 / 제거된 노드의 형제 노드
	- `attributeName/attributeNamespace` – 변경된 속성의 이름과 네임스페이스
	- `oldValue` – `config`의 `attributeOldValue`/`characterDataOldValue` 이 설정될 경우 이전 값
```
let observer = new MutationObserver(MutationRecord -> {
	console.log(MutationRecord);
});

// MutationRecord = [{
//	 type : "characterData",
//	 oldValue : "edit",
//	 target : <text node>,
//	 ...
// }]
```

## 1-2 MutationObserver 메서드

- `observer.disconnect()` : 감시 중단

- `obsercer.takeRecords()` : 콜백 함수에 의해 처리되지 않은 MutationRecord 목록 반환
>processing queue에 담겨있는 레코드를 가져옴

---
#MutationRecord #MutationObserver