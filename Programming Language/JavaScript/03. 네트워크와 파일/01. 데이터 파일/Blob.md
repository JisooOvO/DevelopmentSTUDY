```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. Blob

![[Blob.PNG]]


- MIME 타입 문자열과 `blobParts` 또는 `BufferSource`로 구성된 파일 API
- `Blob`은 불변성을 지님

```
new Blob(blobParts, options);
```

- `blobParts` : `Blob/BufferSource/String` 타입의 배열
- `options` : 
	- `type` : `Blob` 타입 (주로 `image/png`)
	- `endings` : `native`일 경우 `Blob` 의 개행 값을 현재 OS의 개행(`\r\n` 또는 `\n`)으로 변환
						 `transparent`일 경우 변환하지 않음(기본 값)

```
let hello = new Uint8Array([72,101,108,108,111]);

let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
```


## 1-1 메서드

- `blob.slice([byteStart],[byteEnd],[ContentType])` : 
	`blob`의 `byteStart` 부터 `byteEnd` 까지의 타입이 `ContentType`인 새로운 `Blob` 객체 생성

## 1-2 Blob to URL

- `<a>, <img>` 태그 등의 URL로 사용할 수 있음
- `Blob`에 직접 액세스하여 인코딩/디코딩이 필요 없음

```
<a download="hello.txt" href='#' id='link'>Download</a>

<script>
let blob = new Blob(["Hello, world!"], {type: 'text/plain'});
link.href = URL.createObjectURL(blob);
</script>
```

- `URL.createObjectURL(blob)` : `Blob`을 통해 고유한 URL을 생성
- `URL.revokeObjectURL(link.href)` :
	생성된 `Blob`은 문서가 언로드되기 전까지 메모리에서 삭제되지 않음
	`revokeObjectURL`은 내부 매핑에서 `Blob`의 참조를 제거하여 메모리 해제

## 1-3 Blob to base64

- `Blob`을 base64로 인코딩된 문자열로 변환 할 수 있음

 > `data URL`의 형식은 `data:[<mediatype>][;base64],<data>
 
 ```
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

let reader = new FileReader();
reader.readAsDataURL(blob); // blob -> base64 변환

reader.onload = function() {
  link.href = reader.result; // data url
  link.click();
};
```

## 1-4 Blob to Canvas

```
// 이미지 가져오기
let img = document.querySelector('img');

// canvas 사이즈 이미지와 일치시키기
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

// 이미지 그리기
context.drawImage(img, 0, 0);

// toBlob은 비동기 메서드
canvas.toBlob(function(blob) {
  let link = document.createElement('a');
  link.download = 'example.png';
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}, 'image/png');
```

```
leb blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'))
```

## 1-5 Blob to ArrayBuffer
- `FileReader`을 이용하여 `blob`을 `ArrayBuffer`로 변환 가능

```
let fileReader = new FileReaer();

fileReader.readAsArrayBuffer(blob);

fileReader.onload = function(event) {
	let arrayBuffer = fileReader.result;
};
```

---
#Blob