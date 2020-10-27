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
    this.jumpStrength = 15
    this.jumps = 0
    this.jumping = false
    this.grounded = false
    }

    draw(){
        if (this.x < 0) this.x = $canvas.width
        if (this.x > $canvas.width) this.x = 0
        if (this.y > $canvas.height - this.height) {
         this.y = $canvas.height - this.height
         this.jumps = 0
         this.jumping = false
        }
        ctx.fillRect(this.x, this.y, this.width, this.height) 
        ctx.clearRect(this.x+2.5, this.y+3, this.width-5, this.height-5);
        ctx.fillStyle="#FF0000"
    }
    changePos() {
        this.velY += gravity
        this.y += this.velY
        this.x += this.velX
        this.velX *= friction
      }

      jump() {
        if (!this.jumping) {
            this.velY = -this.jumpStrength
            this.jumping = true
        }
      }
    //   isTouchingUp(boxes) {
    //     return (
    //         this.x < boxes.x + boxes.width &&
    //         this.x + this.width > boxes.x &&
    //         this.y < boxes.y + boxes.height &&
    //         this.y + this.height > boxes.y
    //     )
    //   }
    //   isTouchingSides(boxes) {
    //     return (
    //         this.x < boxes.x + boxes.width &&
    //         this.x + this.width > boxes.x &&
    //         this.y < boxes.y + boxes.height &&
    //         this.y + this.height > boxes.y
    //     )
    //   }
    //   isTouchingDown(boxes) {
    //     this.x < boxes.x + boxes.width &&
    //     this.x + this.width > boxes.x &&
    //     this.y < boxes.y + boxes.height &&
    //     this.y + this.height > boxes.y
    //   }
}
const mint1= new Mint(10,$canvas.height-50)


class Box{
    constructor(x, altura, y){
    this.x=x
    this.y=y
    this.altura=altura
    this.width=90
    this.height=90
    this.velY = 0
    this.velX=0;
    this.grounded = false

    }
    draw(){
        
        this.velY += gravity
        this.y += this.velY
        if (this.y> $canvas.height-this.altura) this.y= $canvas.height-this.altura
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle="black"
        
    }
    isTouching(boxes){
        return (
            this.x < boxes.x + boxes.width &&
            this.x + this.width > boxes.x &&
            this.y < boxes.y + boxes.height &&
            this.y + this.height > boxes.y
          )
    }
    }

    class Board {
        constructor(x, y) {
            this.x = 0
            this.y = 0
            this.width = $canvas.width
            this.height = $canvas.height
            this.img1 = new Image()
            this.img1.src = '/img/background-2.jpg'
            this.img2 = new Image()
            this.img2.src = '/img/space_background_for_infinite_scroll_example-300x300.png'
            // this.img.onload = () => {
            //     this.draw()
            // }
        }
        draw() {
            this.y--
            if (this.y < -$canvas.height) this.y = 0
            if (frames < 3000) {
                ctx.drawImage(this.img1, this.x, this.y, this.width, this.height)
                ctx.drawImage(this.img1, this.x, this.y + $canvas.height, this.width, this.height)
                console.log(frames)
            }
            else if(frames >3000) {
                ctx.drawImage(this.img2, this.x, this.y, this.width, this.height)
                ctx.drawImage(this.img2, this.x, this.y + $canvas.height, this.width, this.height)
            }
        }
    }
    const background = new Board()
