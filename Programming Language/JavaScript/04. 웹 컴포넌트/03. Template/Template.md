```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. Template Element

- `<Template>`는 내장된 HTML 요소이며 HTML 마크업 템플릿을 위한 저장소 역할
- 브라우저는 해당 내용은 무시하고 구문 유효성만 확인

## 1-1 Template 특징

- 잘못된 DOM 구조를 사용 가능

```
// 브라우저는 <table> 태그 없이 <tr>, <td> 등의 태그 삽입시 자동으로 DOM을 수정
// Template 태그 내에서는 <table> 없이 <tr> 사용 가능
<template>
	<tr>
		<td>Contents</td>
	</tr>
</template>
```

- 스타일, 스크립트 삽입 가능

```
// 브라우저는 Template 태그  내부의 콘텐츠를 문서 외부에 있는것으로 간주
// 스타일, 스크립트는 실행되지 않음
<template>
	<style>
		...
	<style>
	<script>
		...
	</script>
</template>
```

## 1-2 Template 삽입
- 템플릿은 `content` 프로퍼티에서  `DocumentFragment` 노드로 사용 가능
- 템플릿을 문서에 삽입하면 자식 요소가 등록

```
<!doctype html>
<body>

<template id="tmpl">
  <script>
    alert("Hello");
  </script>
  <div class="message">Hello, world!</div>
</template>


<script>
  let elem = document.createElement('div');

  // Template의 content 프로퍼티에서 노드 복사 가능
  elem.append(tmpl.content.cloneNode(true));
  
  document.body.append(elem);
</script>
</body>
```

---
#template