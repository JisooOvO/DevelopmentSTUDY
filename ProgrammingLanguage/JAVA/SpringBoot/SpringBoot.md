```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 1. SpringBoot

## 1-1 Annotation

 * 컴파일러가 컴파일 중 실행하는 코드

## 1-2 특징

- IoC 컨테이너로 Bean을 관리
- DI를 사용
> Spring Framework에서는 인터페이스와 인터페이스를 상속받은 클래스 중 
> 인터페이스를 가지고 Controller와 Service를 동작시킴

### 1-2-1  SpringBootApplication.java 의 기능

- @SpringBootConfiguration : 환경설정 빈 클래스 표현

- @ComponentScan : @Configuration/Repository/Service/Controller  객체를 메모리에 올림

- @EnableAutoConfiguration : 자동설정 관련

### 1-2-2 SpringBoot Starter

- SpringBoot 는 starter 기능을 제공 
> porm.xml 에 dependency 추가
  
- lombok : 모델 관련 편리한 annotation 추가 (@Getter/Setter/ToString)
   - lombok 설치방법
	   1. mvn repository 에서 project lombok jar 파일 다운
	   2. jar 파일 실행 후 나타나는 install manager에서 sts 설치 경로 확인 후 update
	   3. project 우클릭 후 maven - update project 클릭
	   4. sts 재시작

 - DevTools : 코드 수정시 자동으로 컨테이너가 수정된 클래스를 반영
  (어플리케이션 재실행할 필요가 없음) 

- JDBC API

- h2 database

### 1-2-3 banner

- src/main/resources 에 banner.txt 추가시 해당 text 출력

## 1-3 IoC

- Inversion of Control
>요구에 맞게 Controller, Service 등의 객체를 작성하면 
>프레임워크가 객체의 생성, 호출, 소멸 등 제어권을 가져감
>객체의 인스턴스를 생성하여 `Bean` 객체를 컨테이너에 저장함 
>*어노테이션을 정의하는 것은 제어권을 준다는 것*

- 장점 :
	- 프로그램 진행 흐름과 구체적 구현의 분리
	- 객체 간 의존성 감소

## 1-4 DI

- Dependency Injection
```
public class objA {
	private objB b;

	public objA(objB ebo){
		// ebo 객체를 외부로 부터 주입
		// 의존성은 같지만 objB가 변경되어도 A에 영향이 없음 
		this.b = ebo;
	}
}
```

- 인터페이스를 선언한 변수에 자동적으로 그 인터페이스를 재정의한 객체를 주입시킴

- 하나의 클래스로만 해당 인터페이스를 재정의해야함
>2개 이상의 클래스로 하나의 인터페이스 구현시
>@Qualifier / @Resource로 재정의한 클래스 중 특정 Bean에 맞는 클래스 객체를 가져옴

- 장점
	- 의존성의 감소(변경시 영향이 적음)
	- 재사용성 증가

### 1-4-1 의존성 주입 방법

- Contructor Injection
```
public class objA {
	private objB bo;

	public objA(objB ebo){
		this.bo = ebo;
	}
}
```

- Setter Injection
```
public class objA{
	private obj bo;

	public void setBo(obj ebo){
		this.bo = ebo;
	}
}
```

- Interface Injection
```
public inteface BInjection {
	void inject(objB b);
}

public objA implements BInjection{
	private objB bo;

	@Override
	public void inject(objB ebo){
		this.bo = ebo;
	}
}
```


---

# 2. Controller / Model / Service Annotaion

## 2-0 Boot Annotation

### 2-0-1 @Component 

- 모든 어노테이션의 base, 목적에 의해 어노테이션 분리

### 2-0-2 @Bean 

- 객체 관련

### 2-0-3 @Configuration 

- 객체 관련

### 2-0-4 @Respository 

- DB

## 2-1 Controller Annotation
 
### 2-1-1 @Controller	

- 메서드의 `리턴 문자열타입`에 해당하는 View를 만들어야함   
- 유저의 요청을 받음(MVC의 C)
### 2-1-2 @RestController 

- 메서드의 리턴 문자열이 브라우저에 그대로 출력됨  (별도의 뷰를 필요 X)

### 2-1-3 @Configuration 

- 환경설정

### 2-1-4 @Bean 

- 빈 설정

### 2-1-5 @Conditional 

- 조건에 따른 어노테이션 설정

### 2-1-6 @Autowired	

- 객체에 의존성 주입
> 인터페이스를 의존하는 `Service` 객체를 `Controller`에서 참조

### 2-1-7 @Mapping(`"URL"`) 

- HttpRequest 설정 매핑 
	 - @Get
	- @Post
	- @Put
	- @Delete

 - 여러개의 URL 매핑시 `value` 사용
```
@GetMapping(value ={"/member", "/test"})
	private List<MemberVO> getMembers() {
		return memberservice.getMembers();
}
```

- @RequestMapping : Controller 전역 API 설정 
  
## 2-2 변수 관련 Annotation

### 2-2-1 @PathVariable 

- 경로를 변수로 설정 -> `{변수명}` 로 매핑

### 2-2-2 @RequestBody 

- POST/PUT 등 객체(JSON)를 받을 때 사용
>변수에 어떠한 Annotation이 없다면 QueryString으로 URL에 전달  

### 2-2-3 @ResponseEntity`<?>` 

- Status Code 설정 가능
```
ResponseEntity.status(HttpStatus.OK).body( ... );
```

## 2-3 Model 관련 Annotation 

- lombok stater 에서 제공하는 Annotation
	- @Getter
	- @Setter
	- @NoArgsConstructor
	- @AllArgsConstructor
	- @Builder
	- @Data
	- @ToString

## 2-4 Service 관련 Annotation

### 2-4-1 @Service 

- 요청에 맞는 데이터를 제공(MVC의 M)
> 컨테이너에서 자동으로 Bean Service 객체를 생성 -> Service 생성자를 만들 필요가 없음
> 사용하려면 @Autowired 키워드 사용하여 의존성 주입 가능

- `Environment` 환경 객체를 자동으로 생성 
> `application.properties`에서 프로퍼티 key 지정 가능

```
// 📁MemberService.java
@Service
public class MemberService {
	MemberInterface dao
	
	public MemberService(Environment env) {
		//application.properties 에서 프로퍼티 key 가져오기
		String type = env.getProperty("service.type");
	
		if(type.equals("h2")) {
			dao = new MemberDaoH2Impl();
			System.out.println("h2");
		}else {
			dao = new MemberDaoListImp();
			System.out.println("list");
		}
	}
	...
}

// 📁MemberController.java
@RestController
public class MemberController{
	@Autowired
	MemberService memberservice;
}

```
 
 ---
# 3. 테스트 코드

## 3-1 테스트 코드 작성

- src/test/java 폴더에 테스트용 클래스 생성 가능
- Junit으로 동작

## 3-2 테스트 클래스 관련 Annotation

- @SpringBootTest : 테스트 클래스 정의
- @TestMethodOrder(OrderAnnotation.class) : 테스트 메서드 실행 순서 제공

## 3-3 테스트 메서드 관련 Annotation

- @DisplayName() : JUnit에서 사용할 테스트 코드 이름 설정
- @Test : 테스트 코드 IoC
- @Order() : 테스트 실행 순서
- @AfterEach/BeforeEach : Test 1개 실행전/후 실행 반복
- @AfterAll/BeforeAll : 모든 테스트 실행되기 이전에 1번만 실행 (반드시 Static 메서드)

---


---
>[[Backend]]
#SpringBoot #Annotation #IoC #DI