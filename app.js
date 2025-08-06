let gameSeq = [];
let userSeq = [];

let gameStart = false ;
let level = 0;
let highScore = 0;
let redFlashed = false;

let btns = [ "bx1", "bx2", "bx3", "bx4"];

// Selecting document component

let h2 = document.querySelector("h2");
let high = document.querySelector("h3");
let playbtn = document.querySelector(".playbtn");
let hintText = document.querySelector(".hintbox p");

playbtn.addEventListener("click", function(){
        if (gameStart == false){
        gameStart = true;
        levelUp();
        redFlashed = false;
    }
})

document.addEventListener("keypress" , function (){
    if (gameStart == false){
        gameStart = true;
        levelUp();
        redFlashed = false;
    }
});

function btnFlash (btn){
    btn.classList.add("btnFlash");
    setTimeout(function(){
        btn.classList.remove("btnFlash");
    }, 900);
}

// This is for user flash

function btnFlash2 (btn){
    btn.classList.add("btnFlash2");
    setTimeout(function(){
        btn.classList.remove("btnFlash2");
    }, 300);
}

function levelUp (){
    userSeq=[];
    level ++;
    h2.innerText = `Level : ${level}`;
    
    // Random btn choose
    let randInd = Math.floor(Math.random()*3);
    let randClr = btns[randInd];
    let randBtn = document.querySelector(`.${randClr}`);
    
    btnFlash (randBtn);
    gameSeq.push(randClr)
}

// Checking answer 
function checkAns (idx){
    if (gameSeq[idx]== userSeq[idx]){
        if (userSeq.length == gameSeq.length){
            setTimeout(levelUp ,1000);
        }
    }else{
        h2.innerHTML = `Gave Over !! <br> Your Score is : ${level}. <br> Press Start to play again..`
        reset ();
    }
}

// Button pressing 

function btnPress (){
    let btn = this ;
    btnFlash2(btn);
    hintText.innerText = "Hint will be here !!";
    
    let userBtn = btn.getAttribute("id");
    userSeq.push(userBtn);
    
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns ){
    btn.addEventListener("click", btnPress);
}

let body = document.querySelector("body");

function reset (){
    gameStart = false;
    gameSeq = [];
    userSeq = [];
    if(highScore < level ){
        highScore = level;
    }
    if (!redFlashed) {
        body.classList.add("red");
        redFlashed = true;

        setTimeout(function(){
            body.classList.remove("red");
        }, 300);
    }
    high.innerText = `High Score : ${highScore}`;
    level = 0;
}

// HINT feature
let hintBtn = document.querySelector(".hintbtn");

hintBtn.addEventListener("click", function () {
    if (gameSeq.length > 0 && gameStart) {
        hintText.innerText = "Replaying full sequence...";

        // Show the actual button IDs (e.g., "bx1 bx3 bx2")
        let sequenceText = gameSeq.join(" ➤ ");
        hintText.innerText = `Sequence: ${sequenceText}`;

        // Flash each button one by one with delay
        let i = 0;
        let interval = setInterval(function () {
            let currColor = gameSeq[i];
            let currBtn = document.querySelector(`.${currColor}`);
            btnFlash(currBtn);
            i++;

            if (i >= gameSeq.length) {
                clearInterval(interval);
                hintText.innerText = `Hint: ${sequenceText}`;
            }
        }, 800);
    } else {
        hintText.innerText = "No hint available now!";
    }
});


