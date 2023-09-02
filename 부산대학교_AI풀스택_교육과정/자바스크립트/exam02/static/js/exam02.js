// 1. function 키워드로 함수 생성
// document.addEventListener("DOMContentLoaded", function(){ 
//     document.getElementById("ah1").innerHTML = "Hello JavaScript!";
// } );

// //alert


// function hello(){
//     console.log("Hello JS");
// }
//=========== MEMO ==============================
//인라인은 width 못 잡음 -> 인라인 플렉스로 whmp 잡음
//바닐라 JS -> J query 사용 X  
//( framework / library 수준 ) $document.ready..
//addEventListener ( 이벤트 이름 , 함수(프리미티브 타입x) )
//=> 함수가 매개 변수로 들어감
//=> 바로 실행하므로 이름이 없음
//================================================


// 2. 화살표 함수
document.addEventListener("DOMContentLoaded",   () => {
// 객체     메소드              이벤트 이름         함수
//                                              매개변수
    document.getElementById("ah1").innerHTML = "Hello JavaScript!";
});

const hello = () => {
//    HTML변수    
    console.log("Hello JS");
}