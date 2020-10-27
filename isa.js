/*const $canvas = document.querySelector("canvas")
const ctx = $canvas.getContext("2d")

let intevalId,
  friction = 0.8,
  gravity = 0.98,
  keys = [],
  platforms = []

platforms.push({
  x: $canvas.width - 170,
  y: 60,
  width: 100,
  height: 20
})

platforms.push({
  x: $canvas.width - 170,
  y: $canvas.height - 210,
  width: 100,
  height: 20
})

platforms.push({
  x: $canvas.width - 170,
  y: $canvas.height - 70,
  width: 100,
  height: 20
})

class Character {
  constructor(color) {
    this.x = 10
    this.y = 10
    this.width = 50
    this.height = 50
    this.velX = 0
    this.velY = 0
    this.speed = 5
    this.jumping = false
    this.jumpStrength = 17
    this.color = color
    this.grounded = false
  }
  draw() {
    //  Esto pasa si tocamos el piso
    if (this.y > $canvas.height - this.height) {
      this.y = $canvas.height - this.height
      this.jumping = false
    }
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  changePosition() {
    this.y += this.velY
    this.velY += gravity
    this.x += this.velX
    this.velX *= friction
  }
  jump() {
    if (!this.jumping) {
      this.velY = -this.jumpStrength
      this.jumping = true
    }
  }
}

const player = new Character("crimson")

function update() {
  clearCanvas()
  player.draw()
  player.changePosition()
  drawPlatforms()
  checkKeys()
  bounds()
}

function clearCanvas() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height)
}

intevalId = setInterval(update, 1000 / 60)

//-----------Respuesta al teclado-----------------------

function checkKeys() {
  if (keys[32] || keys[38]) {
    player.jump()
  }
  if (keys[37]) {
    player.velX--
  }
  if (keys[39]) {
    player.velX++
  }
}
// ---------Multiples teclas--------------

document.addEventListener("keydown", event => {
  keys[event.keyCode] = true
})
document.addEventListener("keyup", event => {
  keys[event.keyCode] = false
})
// -------------Plataformas y colision--------------
function drawPlatforms() {
  ctx.fillStyle = "#333333"
  platforms.forEach(platform => {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height)
  })
}

function bounds() {
  player.grounded = false
  platforms.forEach(platform => {
    var direction = collisionCheck(player, platform)
    if (direction == "left" || direction == "right") {
      player.velX = 0
    } else if (direction == "bottom") {
      player.jumping = false
      player.grounded = true
    } else if (direction == "top") {
      player.velY *= -1
    }
  })

  if (player.grounded) {
    player.velY = 0
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

*/

const $canvas = document.querySelector("canvas")
const ctx = $canvas.getContext("2d")
const $startBtn = document.querySelector("button")
let intervalId
let frames = 0
let ratio = 200
let score = 0
let obstacles = []

// Classes
class Character {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.color = color
    this.width = 50
    this.height = 50
    this.vel = 10
  }
  draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  move(dir) {
    switch (dir) {
      case "UP":
        if (this.y <= 0) return
        return (this.y -= this.vel)
      case "DOWN":
        if (this.y >= $canvas.height - this.height) return
        return (this.y += this.vel)
      case "LEFT":
        if (this.x <= 0) return
        return (this.x -= this.vel)
      case "RIGHT":
        if (this.x >= $canvas.width - this.width) return
        return (this.x += this.vel)
      default:
        throw new Error("Invalid direction")
    }
    // if(dir === 'UP'){
    //   this.y -= this.vel
    // }else if(dir === 'DOWN'){
    //   this.y += this.vel
    // }else if(dir === 'LEFT'){
    //   this.x -= this.vel
    // }else if(dir === 'RIGHT'){
    //   this.x += this.vel
    // }else{
    //   throw new Error('asef')
    // }
  }
  isTouching(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    )
  }
}

class Obstacle {
  constructor(y, height) {
    this.x = $canvas.width
    this.y = y
    this.width = 30
    this.height = height
  }
  draw() {
    this.x--
    ctx.fillStyle = "forestgreen"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

// Instan
const usrColor = prompt("inserta un color")
const p1 = new Character(200, 20, usrColor)
//TODO: Generar obstaculos

// Main

function update() {
  frames++
  // 1. Recalcular el estado del juego
  // 2. Limpiar el canvas
  clearObstacles()
  generateObstacles()
  clearCanvas()
  checkCollitions()
  // 3. Pintar los elementos del juego
  p1.draw()
  drawObstacles()
  printScore()
}

function start() {
  if (intervalId) return
  intervalId = setInterval(update, 1000 / 60)
}

$startBtn.onclick = start

// Aux fn

function clearCanvas() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height)
}

function generateObstacles() {
  // if (frames % 150 === 0) ratio -= 10
  if (frames % ratio === 0) {
    const min = 100
    const max = $canvas.height - 100
    const randomHeight = Math.floor(Math.random() * (max - min))
    const gap = 100
    obstacles.push(new Obstacle(0, randomHeight))
    obstacles.push(
      new Obstacle(randomHeight + gap, $canvas.height - randomHeight - gap)
    )
  }
}

function drawObstacles() {
  obstacles.forEach(obs => obs.draw())
}

function clearObstacles() {
  obstacles = obstacles.filter(obs => obs.x > -obs.width)
}

function checkCollitions() {
  obstacles.forEach(obs => {
    if (p1.isTouching(obs)) {
      alert("perdiste")
    }
  })
}

function printScore() {
  if (frames % 200 === 0 && frames > 500) score++
  ctx.font = "20px Sans-serif"
  ctx.fillStyle = "black"
  ctx.fillText(`Score: ${score}`, $canvas.width - 100, 30)
}
// Controls

document.onkeydown = e => {
  switch (e.key) {
    case "ArrowUp":
      return p1.move("UP")
    case "ArrowDown":
      return p1.move("DOWN")
    case "ArrowLeft":
      return p1.move("LEFT")
    case "ArrowRight":
      return p1.move("RIGHT")
    default:
      break
  }
}