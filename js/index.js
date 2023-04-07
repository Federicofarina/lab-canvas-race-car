const canvas = document.querySelector("canvas");
canvas.style.border ="4px solid black";
canvas.style.display = "none";
const ctx = canvas.getContext('2d');
const startScreen = document.querySelector(".game-intro");


window.onload = () => {
  //hide the canvas until we press the start
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
  
  //Road Image
  const bgImg = new Image()
  bgImg.src = '../images/road.png'
  const carImg = new Image()
  carImg.src = '../images/car.png'

  let isMovingLeft = false;
  let isMovingRight = false;

  let carX = 220;
  let carY = 600;
  let carSpeed = 3;
  let gameOver = false
  let animateId


  const carSize = () => {
    ctx.beginPath()
    ctx.drawImage(carImg, carX, carY, 50, 90)
    ctx.closePath()
  }

  const animate = () => {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
    carSize()

    if(isMovingLeft){
      carX -= carSpeed
    }
    else if(isMovingRight){
      carX += carSpeed
    }
    if (gameOver){
      cancelAnimationFrame(animateId)
    }
    else {
      animateId = requestAnimationFrame(animate)
    }
  }

  document.addEventListener('keydown', event =>{
    console.log(event)
    if (event.key === 'a'){
      isMovingLeft = true
    }
    if (event.key === 'd'){
      isMovingRight = true
    }
})

document.addEventListener('keyup', event =>{
  console.log(event)
  if (event.key === 'a'){
    isMovingLeft = false
  }
  if (event.key === 'd'){
    isMovingRight = false
  }
})

  function startGame() {
    console.log("Step on Gas!!");
    startScreen.style.display = "none";
    canvas.style.display = "block";
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(carImg, 220, 600, 50, 90)
    animate()
    document.getElementById("start-button") .onclick = () =>{
      startGame()
    }
    document.addEventListener('click', startGame)
  } 
  };

