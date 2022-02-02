const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score');

let lastHole;
let timesUp = false;
let score = 0;

function randomTime(min, max) {
    return Math.random() * (max - min) + min;
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === randomHole) {
        return randomHole(holes);
    }

    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timesUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timesUp = false;
    score = 0;
    peep();
    setTimeout(() => timesUp = true, 10000);
}

function bonk(e) {
    if (!e.isTrusted) return;
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
