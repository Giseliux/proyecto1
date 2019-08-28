const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

class Escenario {
    constructor() {
      this.x = 0
      this.y = 0
      this.width = canvas.width
      this.height = canvas.height
      this.img = new Image()
      this.img.src ='./assets/escenarioBien.jpg'
      this.img.onload = () => {
      this.draw()
      }
    }
    draw() {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
  }

  class Lombriz {
    constructor(x, y) {
      this.arregloDerecha=new Array()
      this.arregloIzquierda=new Array()

      // this.arregloDerecha= new Image(3)
      // this.arregloIzquierda= new Image(3)
      this.x = x
      this.y = y
      this.width = 75
      this.height = 35
      this.estado=0
      //acceder a los arreglos
      this.direccion='izquierda'
      
      this.arregloIzquierda[0]=new Image()
      this.arregloIzquierda[1]=new Image()
      this.arregloIzquierda[2]=new Image()
      this.arregloIzquierda[3]=new Image()

      this.arregloDerecha[0]=new Image()
      this.arregloDerecha[1]=new Image()
      this.arregloDerecha[2]=new Image()
      this.arregloDerecha[3]=new Image()

      this.arregloIzquierda[0].src='./assets/frame-01.gif'
      this.arregloIzquierda[1].src='./assets/frame-03.gif'
      this.arregloIzquierda[2].src='./assets/frame-05.gif'
      this.arregloIzquierda[3].src='./assets/frame-07.gif'

      this.arregloDerecha[0].src='./assets/frame-12.gif'
      this.arregloDerecha[1].src='./assets/frame-14.gif'
      this.arregloDerecha[2].src='./assets/frame-16.gif'
      this.arregloDerecha[3].src='./assets/frame-18.gif'
    }
    draw() {
      
      console.log(this.direccion)
      
        if(this.direccion=='derecha'){
          //imgDerecha es un arreglo de derecha
          ctx.drawImage(this.arregloDerecha[this.estado], this.x, this.y, this.width, this.height)
        }
        else if(this.direccion=='izquierda'){
          ctx.drawImage(this.arregloIzquierda[this.estado], this.x, this.y, this.width, this.height)
        }
    }
   moveLeft(){
        this.x -= 10
        this.direccion='izquierda'
        if(this.estado<3){
          this.estado++
        }else if(this.estado==0){
        this.direccion='izquierda'
        }else if(this.estado==3){
          this.estado=0
        }
   }
   moveRight(){
    this.x += 10
    this.direccion='derecha'
      
    if(this.estado<3){
      this.estado++
    }else if(this.estado==0){
    this.direccion='derecha'
    }else if(this.estado==3){
      this.estado=0
    }
}
    // isTouching(obstacle) {
    //   return (
    //     this.x < obstacle.x + obstacle.width &&
    //     this.x + this.width > obstacle.x &&
    //     this.y < obstacle.y + obstacle.height &&
    //     this.y + this.height > obstacle.y
    //   )
    // }
}
  class Composta {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.width = 200
      this.height = 200
      this.img = new Image()
      this.img.src ='./assets/composta2.png'
      }
      draw() {
        // this.y++
         ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
       }
  }

  const board = new Escenario()
  const jugador = new Lombriz(300,10)
  
  const composta = new Composta(0,canvas.height-170)

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    board.draw()
    jugador.draw()
    composta.draw()
    console.log(jugador)
    console.log(board)
  }

  document.onkeydown = e => {
    switch (e.keyCode) {
      case 37:
        jugador.moveLeft()
        break
      case 39:
        jugador.moveRight()
        break
      case 70:
        restart()
        break
  
      default:
        break
    }
  }

  
  window.onload = function() {
    document.getElementById("start-button").onclick = function() {
    startGame();
    };
  
   function startGame() {
    interval = setInterval(update, 1000 / 60)
    }
  
  };
  
