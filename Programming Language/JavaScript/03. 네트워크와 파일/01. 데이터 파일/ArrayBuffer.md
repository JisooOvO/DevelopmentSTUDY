```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. ArrayBuffer
- 자바스크립트에서 기본 바이너리 객체는 `ArrayBuffer`
- 고정된 길이 연속적 메모리 영역 차지

```
let arrayBuffer = new ArrayBuffer(16) 
// 16 바이트를 연속적으로 메모리 영역에 할당
```

- 할당된 값은 0으로 미리 채움
- `ArrayBuffer`는 `배열(Array)`이 아님 따라서 인덱스로 개별 바이트에 접근 불가
- `view` 객체를 사용하여 `ArrayBuffer`에 저장된 바이트를 해석
- 바이너리 데이터는 다음과 같이 처리 될 수 있음

![[ArrayBuffer.PNG]]

- `Uint8Array` : `ArrayBuffer`의 각 바이트를 `0 ~ 255` 사이의 숫자로 처리(8비트 부호없는 정수)
- `Uint16Array` : 2 Byte 마다 `0 ~ 65535` 사이의 정수로 처리(16비트 부호없는 정수)
- `Uint32Array` : 4 Byte 마다 `0 ~ 4294967295` 사이의 정수로 처리(32비트 부호없는 정수)
- `Float64Array` : 8 Byte 마다 `5.0x10-324 ~ 1.8x10308` 사이의 부동 소수점 숫자로 처리

```
let buffer = new ArrayBuffer(16); // ArrayBuffer 생성(16Byte, 0으로 초기화)
let view = new Uint32Array(buffer); // ArrayBuffer의 view 객체 생성

alert(Uint32Array.BYTES_PER_ELEMENT); // 4 (처리되는 Byte 수)
alert(view.length); // 4 (Integer 수)
alert(view.byteLength); // 16 (총 Byte 수)

view[0] = 123456;

for(let num of view) {
  alert(num); // 123456, 0, 0, 0 
}
```

## 1-1 TypedArray
- `Uint8Array`와 같은 모든 `view` 객체를 지칭
- 일반 배열처럼 동작함
	- 인덱스 존재
	- `Iterable` 객체

> `TypeArray`라는 생성자는 존재하지 않음

```
new TypedArray(buffer, [byteOffset], [length])
new TypedArray(object)
new TypedArray(typedArray)
new TypedArray(length)
new TypedArray() // 길이가 0인 배열
```

- `Buffer`를 선언하지 않고 생성한 모든 `TypeArray`는 `ArrayBuffer`를 자동으로 생성함

### 1-1-1 프로퍼티
- `buffer` : `ArrayBuffer`
- `byteLength` : `ArrayBuffer`의 길이

### 1-1-2 종류
- `Uint8Array`, `Uint16Array`, `Uint32Array` (부호 없는 정수)
- `Uint8ClampedArray`
- `Int8Array`, `Int16Array`, `Int32Array` (부호 있는 정수)
- `Float32Array`, `Float64Array`

### 1-1-3 범위를 벗어난 수를 지정할 경우
>`Uint8Array`에는 `0 ~ 255` 사이의 정수만 저장됨
>이 때 256를 저장할 경우, 256의 2진수는 100000000(9 bits)
>255를 넘어갈 경우 가장 오른쪽의 8비트만 저장되어 Buffer에 00000000(0)이 저장됨
>
>`Uint8ClampedArray`의 경우 255보다 큰 수는 255를 저장하며 음수는 0을 저장

### 1-1-4 메서드
- `Array`의 일부를 제외한 메서드 사용 가능
	- `map, slice, find, reduce`
	- `splice` : `ArrayBuffer`는 고정된 연속 메모리 영역이므로 값을 삭제할 수 없음
	- `concat` : 같은 이유로 불가능
- `arr.set(fromArr, [offset])` : `fromArr`의 `offset` 부터 시작한 모든 요소를 `arr`에 저장
- `arr.subarray([begin, end])` : `begin ~ end` 사이의 동일한 유형의 `view` 생성

### 1-1-5 데이터뷰
- `DataView`는 모든 형식의 데이터에 접근 가능한 `view` 객체
- 동일한 `buffer`에 여러가지 형식의 데이터를 저장할 때 유용

- 생성자
```
new DataView(buffer, [byteOffset], [byteLength])
```

- 예시
```
let buffer = new Uint8Array([255,255,255,255]).buffer; // ArrayBuffer에 접근

let dataView = new DataView(buffer);

alert(dataView.getUint8(0)); // 255
alert(dataView.getUint16(0)); // 65535
alert(dataView.getUint32(0)); // 4294967295
```

![[ArrayBuffer2.PNG]]

---
#ArrayBuffer #DataView