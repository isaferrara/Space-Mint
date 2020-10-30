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
let lines= $canvas.height+13;
let gameOverImg = document.createElement("img")
gameOverImg.src = "/img/game-over.png"
let youWon = document.createElement("img")
youWon.src = "/img/wou-win.png"


class Board {
    constructor(y) {
        this.x = 0
        this.y = y
        this.width = 850 / 2
        this.height = 4100 / 2
        this.img1 = new Image()
        this.img1.src = '/img/bck-wo-aliens.png'
        this.img1.onload = () => {
            this.draw()}
    }

    draw() {

        if (mint1.jumping && this.y < 0) {
                this.y +=.5
            } else if (mint1.jumping && this.y == 0) {
                this.y == 0
            }
        // ctx.drawImage(this.img1, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.img1, 0, this.y, $canvas.width, this.height)
        if(background.y>0){
            winning()
        }
        if(frames>=5000&&frames<=5100){
            ctx.font = "20px Sans-serif"
            ctx.fillStyle = "black"
            ctx.fillText('Level 2: sky', $canvas.width/2 - 100, $canvas.height/2 )
        }
        if(frames>=10000&&frames<=10100){
            ctx.font = "20px Sans-serif"
            ctx.fillStyle = "black"
            ctx.fillText('Level 3: sky', $canvas.width/2 - 100, $canvas.height/2 )
        }
    }


}
const background = new Board(-1200)


class Mint{
    constructor(x,y){
    this.x=x
    this.y=y
    this.width=50
    this.height=70
    this.velX = 0
    this.velY = 0
    this.jumpStrength = 11
    this.jumps = 0
    this.jumping = false
    this.grounded = false
    this.img1 = new Image()
    this.img1.src = '/img/simsv.svg'
        this.img1.onload = () => {
            this.draw()}

    }

    draw(){
        if (this.x < 0) this.x = $canvas.width
        if (this.x > $canvas.width) this.x = 0
        if (this.y > $canvas.height - this.height) {
         this.y = $canvas.height - this.height
         this.jumps = 0
         this.jumping = false
        }
     
        ctx.drawImage(this.img1, this.x+2.5, this.y+3, this.width-5, this.height-5);
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
const mint1= new Mint(10,540)

class Lifies{
    constructor(lifes) {
        this.x = 20
        this.y = 40
        this.width =100
        this.height =25
        this.lifes=lifes

        this.lifeF = new Image()
        this.lifeF.src = 'img/uno.svg'
        this.life2 = new Image()
        this.life2.src = 'img/dos.svg'
        this.life3 = new Image()
        this.life3.src = 'img/tres.svg'
        this.img1 = new Image()
        this.img1.src = '/img/simsv.svg'
     }
    
     draw(){

        if (this.lifes===3){
            ctx.drawImage(this.life3, this.x, this.y, this.width, this.height)
            console.log(this.lifes)
        }
         if (this.lifes===2){
            ctx.drawImage(this.life2,this.x, this.y, this.width, this.height)
            console.log(this.lifes)
        }
        else if (this.lifes===1){
            ctx.drawImage(this.lifeF, this.x, this.y, this.width, this.height)
            console.log(this.lifes)
        }

    }
}

const life1= new Lifies(5)

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
    this.img1.src = '/img/bloquealien.png'
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
            this.y = $canvas.height+13; 
            this.width =$canvas.width
            this.height =50
            this.velX = 0
            this.velY = 0
            this.imgP= new Image()
            this.imgP.src = '/img/picos.png' 
        }
        draw() {
            if(frames % 200==0){
                this.y-=3
            }
            ctx.drawImage(this.imgP, this.x, this.y, this.width, this.height)

        }
    }

    const line = new DeadLine()

    // class Arrow{
    //     constructor(x){
    //     this.x=x
    //     this.y=40
    //     this.width=50
    //     this.height=50
    //     this.img4 = new Image()
    //     this.img4.src = '/img/simple.png'
    //     }
    //     draw(){
    //         ctx.drawImage(this.img4, this.x, this.y, this.width, this.height)
    //     }
    //     }
