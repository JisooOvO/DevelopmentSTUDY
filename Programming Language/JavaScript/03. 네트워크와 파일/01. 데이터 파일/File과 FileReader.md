```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. File

- 파일 시스템 관련 기능을 가진 `Blob`에서 상속 받은 객체

## 1-1 파일 생성 방법

### 1-1-1 생성자 호출
```
new File(fileParts, fileName, [options]);
```

- `fileParts` : `Blob/BufferSourse/String` 값의 배열
- `fileName` : 파일 이름
- `options` :
	- `lastModified` : 마지막으로 수정된 시간의 타임스탬프(정수)

### 1-1-2 OS에서 파일 가져오기
```
<input type="file" onchage="showFile(this)">

<script>
function showFile(input){
	let file = input.files[0]; // 파일 배열 중 하나만 가져오기

	alert(file.name);
	alert(file.lastModified);
}
```

> 또한 Drag'n'Drop 이벤트에서 `File` 객체를 가져 올 수 있음

## 1-2 FileReader
- `Blob`, `File` 객체를 읽기 위한 목적으로 존재하는 유일한 객체
- 파일을 읽는데 시간이 소요되므로 `onload` 이벤트에서 데이터 전달

```
let reader = new FileReader(); // 인수가 존재하지 않음
```

### 1-2-1 메서드
- `readAsArrayBuffer(blob)` : `ArrayBuffer` 바이너리 형식으로 데이터 읽음
- `readAsText(blob, [encoding])` : 해당 인코딩 방식(기본 `utf-8`)으로 데이터를 텍스트 문자열로 읽음
- `readAsDataURL(blob)` : 바이너리 데이터를 `base64` 형식 URL로 인코딩(주로 `img/png`)
- `abort()` : 데이터 읽기 취소

### 1-2-2 이벤트
- `loadstart` : 데이터 읽기 시작
- `progress` : 읽는 중
- `load` : 오류 없이 읽기 완료
- `abort` : `abort()` 메서드 실행
- `error`
- `loadend` : 성공 또는 실패로 읽기 완료

### 1-2-3 프로퍼티
- `reader.result` : 성공한 경우 결과 값
- `reader.error`

```
function readFile(input) {
  let file = input.files[0];
  let reader = new FileReader();

  reader.readAsText(file);
  
  reader.onload = function() {
    console.log(reader.result);
  };

  reader.onerror = function() {
    console.log(reader.error);
  };
}
```

---
#File #FileReader