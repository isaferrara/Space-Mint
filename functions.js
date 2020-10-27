function update(){
    frames++
    clearBox()
    genBox()
    checkKeys()
    mint1.changePos() 
    clearCanvas()
    background.draw()
    // checkCollitionsMint()
    // checkCollitionsBox()
    drawBox()
    mint1.draw()
    bounds()
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
    frames=0;
    altura=0;

}

$startButton.onclick=startGame
$resetButton.onclick=resetGame

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
    clearInterval(gameInterval)
    gameInterval = null
    ctx.font = "50px Sans-serif"
    ctx.fillStyle = "black"
    ctx.fillText(`Game Over`, 150, $canvas.height/2)
}
let altura=0;
  function genBox() {
    if (frames % 200 == 0) {
      const min = 100
      const max = $canvas.width - 100
      let randomX = Math.floor(Math.random() * (max-min ))
      let box1=new Box(randomX,altura, 0) 
      boxies.push(box1)
      box1.grounded = false
      boxies.forEach(box => {
        var direction = collisionCheck(box1, box)

       if (direction == "bottom") {
            console.log('holiiiii')
            box1.velX = 0
            box1.velY=0
            altura+= box.height
            console.log(altura)
        } else if (direction == "top") {
          box1.velY *= -1
        }
      })
    
      if (mint1.grounded) {
          mint1.velY = 0
      }
    }
  }

// function genBox() {
//     if (frames % 300 == 0) {
//     let randomX = Math.floor(Math.random() * (600 ))
//     let box1=new Box(randomX,this.altura) 
//     boxies.unshift(box1)
//     boxies.forEach(obs => {
//         if (box1.isTouching(obs)) {
//                 console.log(boxies)
//                 console.log('esta tocando')
//                 this.altura=obs.y+obs.height
//             }
//         })

//     }
// }



    function bounds() {
        mint1.grounded = false
        boxies.forEach(box => {
          var direction = collisionCheck(mint1, box)
          if (direction == "left" || direction == "right") {
            mint1.velX = 0
          } else if (direction == "bottom") {
            mint1.jumping = false
            mint1.grounded = true
          } else if (direction == "top") {
            gameOver()
            mint1.velY *= -1
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