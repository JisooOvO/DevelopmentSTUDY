// Create
const domCreate = () =>{
     console.log("DOM 생성");
     
     const myh2 = document.createElement("h2");
     const myh2TxT = document.createTextNode("텍스트 생성");
     //const myh2But = document.createElement("button");

     myh2.appendChild(myh2TxT);
     document.getElementById("adiv").append(myh2);
}

// Read
const domRead = () => {
    const myh1 = document.querySelector("h1");
    console.log("innerHTML => " , myh1.innerHTML);
    console.log("innerText => " , document.querySelector("h1").innerText);
    console.log("textContent => " , document.querySelector("h1").textContent);

}

// Update
const domUpdate = () => {
    const myh2 = document.querySelector("h2");
    if(myh2){
    myh2.innerHTML = "<h3>텍스트 수정</h3>";
    // innerHTML => 태그 요소 추가
    //myh1.textContent = "<h3>텍스트 수정</h3>";
    }
}

// Delete
const domDelete = () => {
    const myh2 = document.querySelector("h1");
    if(myh2){
        console.log(myh2);
        myh2.remove();
    }
}