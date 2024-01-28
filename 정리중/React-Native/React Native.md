```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1.  React Native 
- React 및 앱 플랫폼의 기본 기능을 이용하여 Android 및 iOS 애플리케이션 구축하기 위한 오픈 소스 프레임 워크
- 자바스크립트를 사용하여 플랫폼의 API에 액세스 가능

# 2. Component
## 2-1 View

![[diagram_ios-android-views.svg]]

- 모바일에서 텍스트, 이미지, 입력 등을 포함하는 화면 상 출력되는 사각형의 요소
- 모든 텍스트는 `<Text>` Component 내부에 위치해야함
- 기본적으로 `View`는 flex Container
- 기본적으로 스크롤이 되지는 않음
## 2-2 Native vs React Component
- Android 개발시 Kotlin, JAVA로 View 작성
- iOS 개발시 Swift나 Objective-C 사용

> React Native는 React 구성 요소에 해당하는 Android / iOS View를 생성

## 2-3 Component 목록

| REACT NATIVE UI COMPONENT | ANDROID VIEW | IOS VIEW | WEB ANALOG | DESCRIPTION |
| :--: | :--: | :--: | :--: | ---- |
| `<View>` | `<ViewGroup>` | `<UIView>` | `<div>` | Flexbox, 스타일, 일부 접근성 컨트롤이 포함된 레이아웃을 지원하는 컨테이너 |
| `<Text>` | `<TextView>` | `<UITextView>` | `<p>` | 텍스트 문자열 표시 <br>스타일 및 터치 이벤트 처리 |
| `<Image>` | `<ImageView>` | `<UIImageView>` | `<img>` | 다양한 유형의 이미지 표시 |
| `<ScrollView>` | `<ScrollView>` | `<UIScrollView>` | `<div>` | 다양한 컴포넌트와 View를 포함하는 스크롤 컨테이너 |
| `<TextInput>` | `<EditText>` | `<UITextField>` | `<input type="text">` | 사용자 입력 텍스트 |
| `<Button>` |  |  |  | 사용자 터치 입력 컴포넌트 |
| `<Switch>` |  |  |  | Boolean 입력 렌더링 컴포넌트 |
| `<FlatList>` |  |  |  | 현재 화면에 표시 가능한 요소의 리스트만 렌더링 |
| `<SectionList` |  |  |  | 현재 화면에 표시 가능한 요소의 리스트만 렌더링 |
| `<BackHandler>` |  | X |  | 물리적인 뒤로 가기 버튼 클릭 감지 |
| `<DrawerLayoutAndroid>` |  | X |  |  |
| `<PermissionsAndroid>` |  | X |  | Android M 모델에 대한 접근 제공 |
| `<ToastAndroid>` |  | X |  | 안드로이드 Toast 알람 생성 |
| `<ActionSheetIOS>` | X |  |  | iOS action sheet 또는 share sheet API 출력 |
| `<StatusBar>` |  |  |  | 모바일 상단 상태창 관련 Component |

### 2-3-1 3rd Party Packages
- React Native는 버전이 상승하면서 제공하는 Component, API의 수를 줄여가는 중
- 따라서 핵심 기능 외 다른 기능 사용시 서드 파티 패키지를 다운로드해야함
	- 공식 AP
		- I [React Native Dev](https://reactnative.dev/)
	- 3rd Party API
		- [React Native Directory](https://reactnative.directory/)
		- [expo API docs](https://docs.expo.dev/versions/latest/)
### 2-3-2 Component VS API
- Component는 화면에 렌더링되는 요소
- API는 자바스크립트 코드로 운영체제와 상호작용하는 코드

## 2-4 StyleSheet
- 브라우저 CSS 스타일 형태로 앱 Component에 적용가능한 객체
- `StyleSheet.create()` 메서드에 객체를 포함하여 생성 가능
- 생략해도 에러가 발생하지 않지만 프로퍼티 자동완성을 지원하므로 사용하는 것을 추천

## 2-5 Layout
- 기본적으로 `View`는 플렉스 컨테이너 
	- `flexDirection` : 플렉스 컨테이너 방향 설정
		- `row`
		- `column` (default)
	- `flex` : 컨테이너 비율 설정
		- 자식 요소는 부모요소의  `flex` 비율의 값의 배수만큼 비율을 차지