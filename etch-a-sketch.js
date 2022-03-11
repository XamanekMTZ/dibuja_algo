
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;
const upwards = document.querySelector('.up');
const downwards = document.querySelector('.down');
const leftwards = document.querySelector('.left');
const rightwards = document.querySelector('.right');

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

const { width } = canvas;
const { height } = canvas;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.beginPath(); 
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

function draw({ key }) {
  console.log(key);
  hue += 1;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(x, y);

  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

function arrowButtons(e) {
  e.preventDefault();
  const direccion = e.target.dataset.dir;
  hue += 1;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(x, y);
  switch (direccion) {
    case 'up':
      y -= MOVE_AMOUNT;
      break;
    case 'right':
      x += MOVE_AMOUNT;
      break;
    case 'down':
      y += MOVE_AMOUNT;
      break;
    case 'left':
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    () => {
      console.log('DONE WITH THE SHAKE');
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

// escuchar por las teclas de dirección
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);
upwards.addEventListener('click', arrowButtons);
downwards.addEventListener('click', arrowButtons);
leftwards.addEventListener('click', arrowButtons);
rightwards.addEventListener('click', arrowButtons);
