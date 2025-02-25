let gameseq = [];
let userseq = [];
let colors = ["red" , "yellow" , "green" , "purple"]
let started = false;
let level = 0;
let h2 = document.querySelector("h2");


function playSound() {
    let sound = new Audio('sounds/buttonclick.wav');
    sound.play();
}

document.addEventListener("keypress" , function() {
    if(started == false){
        console.log("Game Started");
        started = true;
    }
    levelup();
});

function levelup(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randomindex = Math.floor(Math.random() * 4);
    let randomclr = colors[randomindex];
    let randombtn = document.querySelector(`.${randomclr}`);
    
    gameseq.push(randomclr);
    console.log(gameseq);
    btnflash(randombtn);
}

function btnflash(btn){
    btn.classList.add("flash");
    playSound();
    setTimeout(function() {
        btn.classList.remove("flash");
    } , 250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    } , 250);
}

function btnpress(){
    console.log(this);
    let btn = this;
    userflash(btn);
    playSound();

    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);

    checkans(userseq.length - 1); //last button check
}

let allbtns = document.querySelectorAll(".button");
for(btn of allbtns){
    btn.addEventListener("click" , btnpress);
}



function checkans(idx){
    if(userseq[idx] === gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelup,1000);
        }
    }else{
        let highScore = localStorage.getItem("highScore") || 0;
        if(level > highScore){
            highScore = level;
            localStorage.setItem("highScore" , highScore);
        }
        h2.innerHTML =`Game Over! Your score was <b>${level}</b> <br> Press any key to start the game <br> <b>High Score: ${highScore}</b>`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        } , 150)
        reset();
    }
}

function reset(){
    started = false;
    userseq= [];
    gameseq = [];
    level = 0;
}