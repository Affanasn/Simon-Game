let gameseq = [];
let userseq = [];

let started = false;
let level = 0;

let colors = ["p", "g", "y", "b"];
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 100);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 100);
}

function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); // ✅ fixed
    let randColor = colors[randIdx]; // ✅ fixed
    gameseq.push(randColor);

    let randbtn = document.querySelector(`.${randColor}`);
    btnFlash(randbtn);
}

function check(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b> ${level -1} <b> <br> Press any key to restart the game.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.classList[0];
    userseq.push(userColor);

    check(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".p, .g, .y, .b");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
