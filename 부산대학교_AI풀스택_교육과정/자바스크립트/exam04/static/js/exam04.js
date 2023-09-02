document.addEventListener("DOMContentLoaded", ()=>{
    });

const roll = () =>{
    const adiv = document.querySelector("#adiv");
    let n = Math.floor(Math.random() * 6 +1) ;

    // Format -> 백틱 ` + ${}
    adiv.innerHTML = `<img src='./static/images/${n}.png'>`;
    // if( n === 1) adiv.innerHTML = "<img src='./static/images/1.png'>";
    // else if ( n === 2) adiv.innerHTML = "<img src='./static/images/2.png'>";
    // else if ( n === 3) adiv.innerHTML = "<img src='./static/images/3.png'>";
    // else if ( n === 4) adiv.innerHTML = "<img src='./static/images/4.png'>";
    // else if ( n === 5) adiv.innerHTML = "<img src='./static/images/5.png'>";
    // else if ( n === 6) adiv.innerHTML = "<img src='./static/images/6.png'>";

};

