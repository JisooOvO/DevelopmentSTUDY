
```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. URL 객체

## 1-1 URL 객체 생성

- URL 객체는 `fetch` 등 문자열 url이 사용되는 곳에서 사용 가능
```
let new URL(url, [base])
```

- `url` : 전체 URL 또는 경로
- `base` : `url`에 경로만 명시될 경우 `base`에 연관된 URL 생성
```
let url = new URL('/profile/admin', 'https://base.com')
alert(url) // https://base.com/profile/admin
```

## 1-2 URL components

- `url.protocol` 등 URL의 컴포넌트에 접근 가능

![[URLcomponents.PNG]]

## 1-3 SearchParams "?..."

- `url.searchParams` 를 통해 접근 가능
> 매개 변수에 스페이스나 라틴언어가 아닌 경우 인코딩 필요

- 파라미터를 위한 몇 가지 메서드를 제공(Map과 유사함)

|Method|Content|
|---|---|
|`append(name,value)`|파라미터 추가|
|`delete(name)`|파라미터 삭제|
|`get(name)`|`name`인 파라미터 반환|
|`getAll(name)`|`name`인 파라미터 전체 반환|
|`has(name)`|`name`인 파라미터 존재 유무 확인|
|`set(name)`|파라미터 추가, 변경|
|`sort()`|파라미터 정렬|


## 1-4 Encoding

- [RFC3986](https://datatracker.ietf.org/doc/html/rfc3986)에서 URL에 허용되는 문자 정의, 정의되지 않은 문자는 인코딩 필요
>URL 객체는 인코딩을 자동으로 수행

- 문자열로 url을 생성할 때, 자바스크립트는 인코딩을 위한 몇 가지 메서드를 제공

- `encodeURI`  : URL 전체 인코딩
- `decodeURI`
- `encodeURIComponent` : 파라미터, 해쉬, 경로와 같은 URL 컴포넌트를 인코딩
- `decodeURIComponent`
>`encodeURI`는 URL에서 허용되지 않은 문자만 인코딩
>`#`, `$`, `&`, `+`, `/`, `:`, `;`, `=`, `?`, `@`,`,` 은 URL에서 허용하는 문자이므로 `encodeURI` 메서드는 인코딩 X
>`encodeURICompoent`는 해당 문자들까지 인코딩
```
let url = encodeURI('Rock&Roll') // Rock&Roll
let url2 = encodeURIComponent('Rock&Roll') // Rock%26Roll
```

> URL, URLSearchParams 객체는 RFC3986 URI 명세서 기반이나
> `encode` 관련 메서드는 RFC2396 URI 명세서 기반임

---
#url