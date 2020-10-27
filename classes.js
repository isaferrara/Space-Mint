const $canvas=document.querySelector('canvas')
const ctx= $canvas.getContext('2d')
let gameInterval;
const $startButton= document.querySelector('#start')
const $resetButton= document.querySelector('#reset')
const keys=[]
let gravity= 0.5
const friction = 0.9
let frames=0
let boxies = []
const randomX = Math.floor(Math.random() * (600 ))

class Mint{
    constructor(x,y){
    this.x=x
    this.y=y
    this.width=30
    this.height=50
    this.velX = 0
    this.velY = 0
    this.jumpStrength = 12
    this.jumps = 0
    this.jumping = false
    }
    draw(){
        if (this.x < 0) this.x = $canvas.width
        if (this.x > $canvas.width) this.x = 0
        if (this.y > $canvas.height - this.height) {
         this.y = $canvas.height - this.height
         this.jumps = 0
         this.jumping = false
        }
        ctx.strokeRect(this.x, this.y, this.width, this.height)   
    }
    changePos() {
        this.velY += gravity
        this.y += this.velY
        this.x += this.velX
        this.velX *= friction
      }

      jump() {
        this.jumping = false
        if (this.jumps >= 2) {
          this.jumping = true
        }
        if (!this.jumping) {
          this.jumps++
          this.velY = -this.jumpStrength
        }
      }
      isTouchingUp(boxes) {
        return (
          this.y < boxes.y + boxes.height &&
          this.x + this.width > boxes.x &&
          this.x < boxes.x + boxes.width 
        )
      }
      isTouchingSides(boxes) {
        return (
          this.x + this.width > boxes.x &&
          this.x < boxes.x + boxes.width 
        )
      }
      isTouchingDown(boxes) {
          this.y + this.height > boxes.y
      }
}
const mint1= new Mint(10,$canvas.height-50)


class Box{
    constructor(x, altura){
    this.x=x
    this.y=0
    this.altura=altura
    this.width=60
    this.height=60
    this.velY = 0
    }
    draw(){
        this.velY += gravity
        this.y += this.velY
        if (this.y> $canvas.height-this.altura) this.y= $canvas.height-this.altura
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
    boxExists(boxes){
        return (
            this.y < boxes.y + boxes.height &&
            this.y + this.height > boxes.y
          )
    }
    }


