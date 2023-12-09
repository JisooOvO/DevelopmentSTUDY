```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. FormData 객체

- HTML 폼(form) 데이터를 쉽게 보내도록 도와주는 [객체](https://xhr.spec.whatwg.org/#interface-formdata)
```
let formData = new FormData([form]);
```

- HTML에 form 요소가 있는 경우 해당 폼 요소의 필드 전체가 자동 반영
- `fetch`등의 네트워크 메서드는 `FormData` 객체를 body로 받음
- 브라우저 HTTP 메시지 인코딩, 헤더는 `Content-Type : multipart/form-data`로 지정된 후 전송

## 1-1 폼 전송하기

- 폼 전송시 헤더는 항상 `Content-Type : multipart/form-data` 
```
<body>
<form id="formElem">
  <input type="text" name="name" value="Bora">
  <input type="text" name="surname" value="Lee">
  <input type="submit">
</form>

<script>
  const formElem = document.querySelector("#formElem")
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    // POST 방식으로 폼 데이터 전송
    let response = await fetch('/article/formdata/post/user', {
      method: 'POST',
      body: new FormData(formElem)
    });

    let result = await response.json();
    alert(result.message);
  };
</script>
</body>
```

## 1-2 FormData 메서드

- `formData.append(name,value)` : `name`과 `value`를 가진 폼 필드 추가
- `formData.append(name,blob,fileName)` : `<input type="file">` 형태의 필드 추가
- `formData.delete(name)` : `name`에 해당하는 필드 삭제
- `formData.get(name)
- `formData.has(name)
- `formData.set(name,value)`
- `formData.set(name,blob,fileName)`

>폼은 이름이 같은 필드를 허용함
>`append`는 이름이 같은 필드를 여러번 추가 가능
>`set`은 `name`과 동일한 이름의 필드를 모두 제거하고 새로운 필드를 추가

---
#FormData