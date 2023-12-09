```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. TextDecoder
- 문자열 이진 데이터를 실제 자바스크립트 문자열로 변환

```
let decoder = new TextDecoder([label], [options]);
```

- `label` : 인코딩 방식, 기본 값은 `utf-8`
- `options` : 
	- `fatal` : `true`인 경우 디코딩 불가능한 글자 대상 예외 발생, `false` 일 때 `\uFFFD`로 글자 대체
	- `ignoreBOM` : `true`인 경우 사용되지 않는 바이트 순서 표식(Byte Order Mark, BOM)을 무시

## 1.1 Decode
```
let str = decoder.decode([input], [options]);
```

- `input` : 디코딩할 `BufferSource`
- `options` :
	- `stream` : 많은 양의 데이터를 처리시 `decoder` 반복 실행

- 예시
```
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
alert( new TextDecoder().decode(uint8Array) ); // Hello
```

# 2. TextEncoder
- 문자열을 바이트로 변환
- 인코딩 시에는 `utf-8`만을 지원

```
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array) // 72,101,108,108,111
```

## 2-1 메서드
- `encode(str)` : `str`을 `Uint8Array`로 인코딩
- `encodeInto(str, destination)` : `str`을 `destination`에 인코딩

---
#TextDecoder #TextEncoder