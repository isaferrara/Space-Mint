function update(){
    frames++
    clearBox()
    checkKeys()
    mint1.changePos() 
    clearObstacles()
    genBox()
    clearCanvas()
    background.draw()
    drawBox()
    line.draw()
    mint1.draw()
    bounds()
    printScore()
    touchLine()
 
}

function startGame(){
    if(gameInterval)return
    gameInterval=setInterval(update,10)
}
function resetGame(){
    console.log('reset game')
    ctx.clearRect(0, 0, $canvas.width, $canvas.height) 
    clearInterval(gameInterval)
    gameInterval = null
    boxies=[]
    frames=0;
    altura=0;
    score=0;
    line.y=$canvas.height+10;
    mint1.x=10
    mint1.y=$canvas.height

}
function printScore() {
    if (frames % 200 === 0) score++
    ctx.font = "20px Sans-serif"
    ctx.fillStyle = "black"
    ctx.fillText(`Score: ${score}`, $canvas.width - 100, 30)
  }

$startButton.onclick=startGame
$resetButton.onclick=resetGame
$pauseBtn.onclick = pauseGame

function clearCanvas() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height)
    
  }

// function collisionCheck() {
//     boxies.forEach(obs => {
//       if (mint1.isTouchingUp(obs)) {
//         console.log('como estas')
//         mint1.y=$canvas.height-altura
//         this.jumping = false
//       }
//       if (mint1.isTouchingSides(obs)) {
//             console.log('pasito a pasito')
//             mint1.y=$canvas.height-obs.height-mint1.height 
//       }
//       if (mint1.isTouchingDown(obs)) {
//         gameOver()  }
//       })
// }

function drawBox() {
    boxies.forEach(obs => obs.draw())
  }
  
  function clearBox() {
    boxies = boxies.filter(obs => obs.x > -obs.width)
  }
  


function gameOver(){
    ctx.fillText(`Game Over`, $canvas.width/2-50, $canvas.height/2)
    clearInterval(gameInterval)
    gameInterval = null
    ctx.fillStyle = "black"
    ctx.font = "500px Arial"
   
}
  

function winning(){
    ctx.fillText(`Congrats, you won!!`, 150, $canvas.height/2)
    clearInterval(gameInterval)
    gameInterval = null
    ctx.font = '500px Sans-serif'
    ctx.fillStyle = "black"
   
}

function pauseGame() {
    clearInterval(gameInterval)
    gameInterval = null
  }



// let altura=0;
//   function genBox() {
//     if (frames % 100 == 0) {
//       const min = 100
//       const max = $canvas.width - 100
//       let randomX = Math.floor(Math.random() * (max-min ))
//       let box1=new Box(randomX,altura, 0) 
//       boxies.push(box1)
//       box1.grounded = false
//       boxies.forEach(box => {
//         var direction = collisionCheck(box1, box)
//        if (direction == "bottom") {
//             console.log('holiiiii')
//             box1.velX = 0
//             box1.velY=0
//             altura +=60
//             console.log(box.y)
//         }
//       })
//     }
//   }


let altura=0;
function genBox() {
    if (frames % 100 == 0) {
    const maxX= $canvas.width-30
    const minX=30
    let randomW = Math.floor(Math.random() * (150))
    if(randomW<70){randomW=80}
    let randomH=randomW    
    let randomX = Math.floor(Math.random() * (maxX-minX))
    let box1=new Box(randomX,altura,0,randomW,randomH ) 
    boxies.push(box1)
    // console.log('antees de entrar')
    boxies.forEach(obs => {
         if(box1.x < obs.x + obs.width &&
            box1.x + obs.width > obs.x){
                // console.log(box1.x < obs.x + obs.width &&
                //  box1.x + obs.width > obs.x)
                //  console.log('boxies lenght')
                //  console.log(boxies.length)
                //  console.log('box1')
                // console.log(box1)
                // console.log('obs:')
                // console.log(obs)
                // console.log('box1.altura111')
                // console.log(box1.altura)
                altura= obs.height
                // console.log('box1.altura222')
                // console.log(box1.altura)
                // console.log('boxies')
                // console.log(boxies)
            return 
        } else{
            box1.velx=0
            box1.velY=0
            // console.log('box1.altur11')
            // console.log(box1.altura)
            box1.altura+= 60
            // console.log('else') 
            // console.log('box1')
            // console.log(box1)
            // console.log('obs:')
            // console.log(obs)
            // console.log('box1.altura')
            // console.log(box1.altura)
            return 
        }
        // if (box1.isTouching(obs)) {
        //         console.log(boxies)
        //         console.log('esta tocando')
        //         this.altura=obs.y+obs.height
        })

    }
}


    function bounds() {
        mint1.grounded = false
        boxies.forEach(box => {
          var direction = collisionCheck(mint1, box)
          if (direction == "left" || direction == "right") {
            mint1.velX = 0
            mint1.jumping=false
          } else if (direction == "bottom") {
            mint1.jumping = false
            mint1.grounded = true
          } else if (direction == "top") {
            mint1.velY *= -1
            // gameOver()
          }
        })
      
        if (mint1.grounded) {
            mint1.velY = 0
        }
      }

// Colision para plataformas
function collisionCheck(char, plat) {
  var vectorX = char.x + char.width / 2 - (plat.x + plat.width / 2)
  var vectorY = char.y + char.height / 2 - (plat.y + plat.height / 2)

  var halfWidths = char.width / 2 + plat.width / 2
  var halfHeights = char.height / 2 + plat.height / 2
  var halfWidthstop = char.width  + plat.width
  var collisionDirection = null

if (Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights) {
    var offsetX = halfWidths - Math.abs(vectorX)
    var offsetY = halfHeights - Math.abs(vectorY)

    if (offsetX < offsetY) {
    if (vectorX > 0) {
        collisionDirection = "left"
        char.x += offsetX
    } else {
        collisionDirection = "right"
        char.x -= offsetX
    }
    } else {
    if (vectorY > 0) {
        collisionDirection = "top"
        char.y += offsetY
        } else {
        collisionDirection = "bottom"
        char.y -= offsetY
        }
    }
    }
    return collisionDirection
}


function touchLine(){
    if (mint1.y+40>=line.y){
        console.log('linea rojaaaaaaaa')
        console.log(mint1.y)
        console.log(line.y)
         gameOver()
         line.y=$canvas.height+200
         return 

    }
}


function clearObstacles() {
    boxies = [...boxies].filter(o => o.y <= o.height+400)
  }