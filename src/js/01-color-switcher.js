
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', startSwitcher);
  startBtn.style.color = 'red';
  startBtn.style.marginLeft = '20px';
  startBtn.style.fontSize = '35px';
  startBtn.style.fontWeight = '400';

stopBtn.addEventListener('click', stopSwitcher);
  stopBtn.style.color = 'red';
  stopBtn.style.marginLeft = '20px';
  stopBtn.style.fontSize = '35px';
  stopBtn.style.fontWeight = '400';

let color = null;
let timer = null;

function changeColor() {
    color = getRandomHexColor();
    body.style.backgroundColor = `${color}`;
}

function startSwitcher() {
    timer = setInterval(changeColor, 1000);
    startBtn.disabled = true;
};

function stopSwitcher() {
    startBtn.disabled = false;
    clearInterval(timer);
};

  