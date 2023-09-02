document.addEventListener("DOMContentLoaded", () =>{
    const bt1 = document.querySelector("footer > div");
    //const bt1 = document.getElementById(bt1);
    console.log(bt1);

    //const bt = document.querySelector("button");
    //querySelector는 단 1개만 찾음
    //const bt = document.querySelectorAll("footer > div > button");
    const bt = document.querySelectorAll("footer button");
    //const bt = document.querySelectorAll("button");
    // 배열로 저장
    console.log(bt);

    // =====변수 선언  (인터프리터는 변수/함수 선언시 메모리 위로 호이스팅)=====
    // 1. legacy
    //console.log(x);
    // => undefined
    //var x = 10;
    //console.log(x);
    // 2. 최근  ( const 상수 / let 변수)
    //console.log(esx);
    // => 호이스팅이 되지만 값 할당 X(일시적 사각지대 TDZ)
    //let esx = 10;
    //console.log(esx);

    // =====NodeList 순회=====
    // 1. for
    console.log("1. for");
    for ( let i=0 ; i < bt.length ; i++){
        console.log(bt[i]);
    }
    // 2. for in ( key/index 순회)
    console.log("2. for in");
    for ( let i in bt){
        console.log(i, bt[i]);
    }
    // 3. Array.forEach 순회
    console.log("3. forEach");
    bt.forEach((i)=>console.log(i));
    bt.forEach((i,idx)=>console.log(idx,i));
    // 4. for of
    console.log("4. for of");
    for ( let [idx,i] of bt.entries()){
        // entries => 구조 분해
        console.log(idx,i);
    }

    console.log("버튼의 캡션 값 가져오기");
    let s = "<ul>";
    for ( let i of bt){
        s = s + "<li>" + i.getAttribute("id") + ":" + i.textContent + "</li>";
    }
    console.log(s);
    document.querySelector("#adiv").innerHTML = s + "</ul>";
})  