function update(){
    frames++
    clearBox()
    genBox()
    checkKeys()
    mint1.changePos() 
    clearCanvas()
    checkCollitionsMint()
    checkCollitionsBox()
    drawBox()
    mint1.draw()

}

function startGame(){
    if(gameInterval)return
    gameInterval=setInterval(update,10)
}
function resetGame(){
    console.log('reset game')
    ctx.clearRect(0, 0, $canvas.width, $canvas.height) 
    clearInterval(gameInterval)
    gameInterval = 0
    boxies=[]

}

$startButton.onclick=startGame
$resetButton.onclick=resetGame

function clearCanvas() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height)
    
  }
function checkCollitionsMint() {
    boxies.forEach(obs => {
      if (mint1.isTouchingUp(obs)) {
        console.log('como estas')
        mint1.y=$canvas.height-obs.height-mint1.height 


   }
      if (mint1.isTouchingSides(obs)) {
            console.log('pasito a pasito')
            mint1.y=$canvas.height-obs.height-mint1.height 
      }
      if (mint1.isTouchingDown(obs)) {
        gameOver()  }
      })
}
function gameOver(){
    clearInterval(gameInterval)
    gameInterval = null
    ctx.font = "50px Sans-serif"
    ctx.fillStyle = "black"
    ctx.fillText(`Game Over`, $canvas.width - 100, 30)
}

let altura;
totalAltura=[]
  function genBox() {
    if (frames % 200 == 0) {
      let randomX = Math.floor(Math.random() * (600 ))
      let box1=new Box(randomX,altura) 
      boxies.push(box1)
    //   console.log('asereje')
     
    //   boxies.forEach(obs => {
    //     if (box1.boxExists(obs)) {
    //       altura=200
    //     }
    //   })
    }
}

function checkCollitionsBox() {
    boxies.forEach(ob=>{
        if(box1.boxExists(ob)){
            box1=$canvas.height-ob.height
        }
    })
   }
   
// suma= 0;
// function altura(){
//     boxies.forEach(obs => {
//       obs.x=$canvas.height-obs.height-mint1.height 
//       })
//       if (mint1.isTouchingSides(caja)) {
          
//         console.log('pasito a pasito')
//         mint1.y=$canvas.height-obs.height-mint1.height 
// }
// }

  function drawBox() {
    boxies.forEach(obs => obs.draw())
  }
  
  function clearBox() {
    boxies = boxies.filter(obs => obs.x > -obs.width)
  }
  


