
  function checkKeys() {
    if (keys["ArrowUp"]) {
      // mint1.img1.src="/img/simsv.svg"  
      mint1.jump()
    }
    if (keys["ArrowLeft"]) {
      // mint1.imgLeft.src="/img/izq.png" 
      mint1.velX--
    }
    if (keys["ArrowRight"]) {
        // mint1.imgRight.src="/img/der.png" 
       mint1.velX++
    }
  }
  
  document.onkeydown = e => {
    keys[e.key] = true
  }
  
  document.onkeyup = e => {
    keys[e.key] = false
  }


