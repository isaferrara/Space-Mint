const $canvas=document.querySelector('canvas')
const ctx= $canvas.getContext('2d')
let gameInterval;
const $startButton= document.querySelector('#start')
const $resetButton= document.querySelector('#reset')
const $pauseBtn = document.querySelector('#pause')
const keys=[]
let gravity= 0.4
const friction = 0.9
let frames=0
let boxies = []
let score = 0
let lines= $canvas.height+10;

class Board {
    constructor(y) {
        this.x = 0
        this.y = y
        this.width = 850 / 2
        this.height = 4100 / 2
        this.img1 = new Image()
        this.img1.src = '/img/bck-wo-aliens.png'
        // this.img2 = new Image()
        // this.img2.src = '/img/space_background_for_infinite_scroll_example-300x300.png'
        // this.img.onload = () => {
        //     this.draw()
        // }
    }
    draw() {
        this.y= -1500
        if (mint1.jumping && this.y < 0) {
                this.y += 1
            } else if (mint1.jumping && this.y == 0) {
                this.y == 0
            }
        // ctx.drawImage(this.img1, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.img1, 0, this.y, $canvas.width, this.height)
    }
}
const background = new Board(-1200)




class Mint{
    constructor(x,y){
    this.x=x
    this.y=y
    this.width=30
    this.height=40
    this.velX = 0
    this.velY = 0
    this.jumpStrength = 11
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

}
const mint1= new Mint(10,$canvas.height-50)


class Box{
    constructor(x, altura, y, width, height){
    this.x=x
    this.y=y
    this.altura=altura
    this.width=width
    this.height=height
    this.velY = 0
    this.velX=0;
    this.grounded = false
    this.img1 = new Image()
    this.img1.src = '/img/Nuevo documento 21.png'


    }
    draw(){
        this.velY += gravity
        this.y += this.velY
        if(frames%10==0){this.altura-=3}
        if (this.y> $canvas.height-this.altura) this.y= $canvas.height-this.altura
        ctx.drawImage(this.img1, this.x, this.y, this.width, this.height)
        
    }
    }

   
    class DeadLine {
        constructor() {
            this.x = 0
            this.y = $canvas.height+10; 
            this.width =$canvas.width
            this.height =5
            this.velX = 0
            this.velY = 0
        }
        draw() {
            ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.fillStyle = "red"
            if(frames % 200==0){
                this.y+5
            }
        }
    }
    const line = new DeadLine()