const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
const ayudantes = []
const enemigos = []

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
      this.x = x
      this.y = y
      this.width = 85
      this.height = 45
      this.estado=0//index
      this.saludable='si'
      //si es menor a 20 tiene hambre-necesita comida
      this.hambre=20
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
      
        if(this.direccion=='derecha'){
          //arregloDerecha es un arreglo de derecha
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
    moveUp(){
      this.y-=10
    }
    moveDown(){
      this.y+=10
    }
}
  class Composta {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.width = 200
      this.height = 200
      this.img = new Image()
      this.img.src ='./assets/composta2.png'
      this.sinmoscas='si'
      this.ph=7
      this.humedad=60
      }
      draw() {
        // this.y++
         ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
       }
  }

  class Vegetales {
    constructor(x, y,index) {
      this.arregloVegetales=new Array()
      this.x = x
      this.y = y
      this.width = 50
      this.height = 50
      this.index=index
      this.duracionVisible=5

      this.arregloVegetales[0]=new Image()
      this.arregloVegetales[1]=new Image()
      this.arregloVegetales[2]=new Image()
      this.arregloVegetales[3]=new Image()

      this.arregloVegetales[0].src='./assets/verdura1.png'
      this.arregloVegetales[1].src='./assets/verdura4.png'
      this.arregloVegetales[2].src='./assets/verdura5.png'
      this.arregloVegetales[3].src='./assets/verdura2.png'

      // this.img = new Image()
      // this.img.src ='./assets/verdura5.png'
      }
      draw() {
        // this.y++
         ctx.drawImage(this.arregloVegetales[this.index], this.x, this.y, this.width, this.height)
      }
  }

  class Mosca {
    constructor(x, y) {
      this.arregloMosca=new Array()
      this.x = x
      this.y = y
      this.width =88
      this.height = 51

      this.arregloMosca[0]=new Image()
      this.arregloMosca[1]=new Image()
      this.arregloMosca[0].src='./assets/mosca1.gif'
      this.arregloMosca[1].src='./assets/mosca2.gif'

      // this.img = new Image()
      // this.img.src ='./assets/mosca.gif'
      }
      draw() {
        if(this.y<canvas.height-100){
          this.y++
         ctx.drawImage(this.arregloMosca[0], this.x, this.y, this.width, this.height)
         ctx.drawImage(this.arregloMosca[1], this.x, this.y, this.width, this.height)
        }else{
          ctx.drawImage(this.arregloMosca[0], this.x, this.y, this.width, this.height)
          ctx.drawImage(this.arregloMosca[1], this.x, this.y, this.width, this.height)
        } 
      }
      isTouching(obstacle) {
        return (
          this.x < obstacle.x + obstacle.width &&
           this.x + this.width > obstacle.x &&
           this.y < obstacle.y-197 + obstacle.height &&
           this.y  > obstacle.y
          //this.y<canvas.height-100

         // this.y
        )
      }
  }

  const board = new Escenario()
  const jugador = new Lombriz(300,canvas.height-70)
  const composta = new Composta(0,canvas.height-170)
  const mosca= new Mosca(10,50)

  function update(){
    let titulo= document.getElementById('tituloph')
     titulo.innerHTML=`Nivel de pH: ${composta.ph}`
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    frames++
    board.draw()
    jugador.draw()
    composta.draw()
    //verdura.draw()
    mosca.draw()
    generateVegetales()
    checaLombriz()
    checarMosca()
    
  }

     //checar si la mosca toco la composta 
  function checarMosca() {
      if (this.isTouching(composta)){ 
        composta.ph=composta.ph-1
       }
         console.log(composta.ph)
  }

function checaLombriz(){
 /* arregloVegetales.forEach(element => {
      if(girl.crashing(element)){
          let index = arregloVegetales.indexOf(element);
          arregloVegetales.splice(index, 1);
          element.active = false*/
          
          // if(element.type == 'computadora'){

          //     points += 100
          // }else{

          //     points -= 30
          // }
    //  } 
  //})
}



// function crashObject(){

//   enemies.forEach(element => {

//       if(girl.crashing(element)){

//           let index = enemies.indexOf(element);

//           enemies.splice(index, 1);

//           element.active = false

//           if(element.type == 'computadora'){

//               points += 100

//           }else{

//               points -= 30

//           }

//       } 

//   })

// }



  function generaPosicionAleatoriaX()
  {
    const minX = 50
    const maxX = 700
    const resX= (Math.floor(Math.random() * (maxX - minX)))+10
    console.log(resX)
    return resX
  }

  function generaPosicionAleatoriaY()
  {
    const minY = 50
    const maxY = 400
    const resY= (Math.floor(Math.random() * (maxY - minY)))+15
    console.log(resY)
    return resY
  }

  function generateVegetales() {
    if (frames % 150 === 0) {
      let randomImagen= Math.floor(Math.random() * (3 - 0))
      ayudantes.push(new Vegetales(generaPosicionAleatoriaX(),generaPosicionAleatoriaY(),randomImagen))
    }
     ayudantes.forEach(e => {
      e.draw()
    })
  }

  // function generaMoscas(){
  //   let randomImagenMos= Math.floor(Math.random() * (1 - 0))
  //   const mosca=new Mosca(10,50,randomImagenMos)
  //   console.log(mosca)
  //   mosca.draw()
  // }


  document.onkeydown = e => {
    switch (e.keyCode) {
      case 37:
        jugador.moveLeft()
        break
      case 39:
        jugador.moveRight()
        break
      case 38:
          jugador.moveUp()
          break;
      case 40:
          jugador.moveDown()
          break;
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
  
