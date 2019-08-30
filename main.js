const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
const ayudantes = []
const enemigos = []
const audio=new Audio('./assets/la-atmosfera_4.mp3')
const avanzaLombri=new Audio('./assets/mario-bros-jump.mp3')
const comeLombri=new Audio('./assets/pacman-eating-cherry.mp3')
const sonidoMosca=new Audio('./assets/ANIMALFLY_6049_60.mp3')
const perdiste=new Audio('./assets/010609168_prev.mp3')
const ganaste=new Audio('./assets/bites-ta-da-winner.mp3')
let tiempoJuego= 0

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
      this.width = 95
      this.height = 55
      this.estado=0//index
      this.saludable='si'
      //si es menor a 20 tiene hambre-necesita comida
      this.hambre=40
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
        this.x -= 20
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
    this.x += 20
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
      this.y-=20
    }
    moveDown(){
      this.y+=20
    }
    siChocaAyudante(obstacle) {
      return (
        this.x < obstacle.x + obstacle.width &&
        this.x + this.width > obstacle.x &&
        this.y < obstacle.y + obstacle.height &&
        this.y + this.height > obstacle.y
      )
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
      this.duracionVisible=350
      this.tipo=''

      this.arregloVegetales[0]=new Image()
      this.arregloVegetales[1]=new Image()
      this.arregloVegetales[2]=new Image()
      this.arregloVegetales[3]=new Image()
      this.arregloVegetales[4]=new Image()
      this.arregloVegetales[5]=new Image()

      this.arregloVegetales[0].src='./assets/verdura1.png'
      this.arregloVegetales[1].src='./assets/verdura4.png'
      this.arregloVegetales[2].src='./assets/verdura5.png'
      this.arregloVegetales[3].src='./assets/verdura2.png'
      this.arregloVegetales[4].src='./assets/cascaron.png'
      this.arregloVegetales[5].src='./assets/gota-grande_2.gif'
      }
      draw() {
        // this.y+
         if(this.index==0 || this.index==1 || this.index==2 || this.index==3){
           this.tipo='vegetal'
         }else if(this.index==4){
          this.tipo='cascaron'
         }
         else if(this.index==5){
          this.tipo='humedad'
         }
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
      this.duracionVisibleMos=460

      this.arregloMosca[0]=new Image()
      this.arregloMosca[0].src='./assets/mosca1.gif'

      }
      draw() {
        
        if(this.y<canvas.height-100){
          this.y++
          sonidoMosca.play()
         ctx.drawImage(this.arregloMosca[0], this.x, this.y, this.width, this.height)
        }else{
          sonidoMosca.play()
          ctx.drawImage(this.arregloMosca[0], this.x, this.y, this.width, this.height)
        } 
      }
      isTouching(obstacle) {
        return (
          this.x < obstacle.x + obstacle.width &&
           this.x + this.width > obstacle.x &&
           this.y < obstacle.y-197 + obstacle.height &&
           this.y  > obstacle.y
        )
      }
  }

  const board = new Escenario()
  const jugador = new Lombriz(300,canvas.height-70)
  const composta = new Composta(0,canvas.height-170)
  const mosca= new Mosca(10,50)
  
  function update(){
    audio.play()//para mandar llamar mi audio
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    frames++
    mosca.duracionVisibleMos--
    if (frames % 30 === 0){
      tiempoJuego++
    }
   
    board.draw()
    jugador.draw()
    composta.draw()

    ctx.font='20px Courier'
    //color
    ctx.fillStyle='#000000'
    ctx.fillText(`pH: ${composta.ph}`,90,40)
    ctx.fillText(`vida lombriz: ${jugador.hambre}`,200,40)
    ctx.fillText(`humedad: ${composta.humedad}%`,450,40)
    ctx.font='30px Courier'

    ctx.fillText(`Tiempo: ${tiempoJuego}`,650,40)
  
    //cascaron.draw()
    //verdura.draw()
    if(mosca.duracionVisibleMos>0){
     
      mosca.draw()
    }
    else {
     setTimeout(() => {
       mosca.y=10
      mosca.duracionVisibleMos=460
     },3500)
    }
    generateAyudantes()
    checaLombriz()
    checarMosca()
    checaHumedad()
    seAcaboTiempo()
  }


  function seAcaboTiempo(){
    if(tiempoJuego==60){
      clearInterval(interval)//limpio mi intervalo
      interval=null
       if(composta.humedad==60 && jugador.hambre>30 && composta.ph==7){
        ctx.font='50px Courier'
      //color
        ctx.fillStyle='#000000'
        ctx.fillText(`GANASTE !! `,170,150)
        ctx.fillText(`ya sabes realizar `,100,270)
        ctx.fillText(`lombricomposta `,100,370)
        ganaste.play()
      }
      else{
        ctx.font='50px Courier'
      //color
        ctx.fillStyle='#000000'
        ctx.fillText(`Sigue intentando`,170,150)
        ctx.fillText(` tu lombricomposta`,100,270)
        ctx.fillText(` aún puede mejorar`,100,370)
        perdiste.play()
      }
    }
  }

  function checaHumedad(){
    if(composta.humedad>0 && frames % 200 === 0)
    {
      composta.humedad--
      jugador.hambre--
    }
  }

  //checar si la mosca toco la composta 
  function checarMosca() {
      if (mosca.isTouching(composta)){ 
          composta.ph=composta.ph-1
       }
  }

function checaLombriz(){

  ayudantes.forEach(element => {
      if(jugador.siChocaAyudante(element)){
          let indiceAyudante = ayudantes.indexOf(element);
          if(element.tipo == 'vegetal'){
            //si colisiona
            comeLombri.play()
           jugador.hambre=jugador.hambre+1
           ayudantes.splice(indiceAyudante, 1);
        }else if(element.tipo == 'cascaron'){
          composta.ph++
          comeLombri.play()
          ayudantes.splice(indiceAyudante, 1);
       }
       else if(element.tipo == 'humedad'){
        composta.humedad++
        comeLombri.play()
        ayudantes.splice(indiceAyudante, 1);
      }
    }
  })
}

  function generaPosicionAleatoriaX()
  {
    const minX = 50
    const maxX = 700
    const resX= (Math.floor(Math.random() * (maxX - minX)))+10
    //console.log(resX)
    return resX
  }

  function generaPosicionAleatoriaY()
  {
    const minY = 50
    const maxY = 400
    const resY= (Math.floor(Math.random() * (maxY - minY)))+15
    return resY
  }

  function generateAyudantes() {
    if (frames % 150 === 0) {
      let randomImagen= Math.floor(Math.random() * (6 - 0))
      ayudantes.push(new Vegetales(generaPosicionAleatoriaX(),generaPosicionAleatoriaY(),randomImagen))
    }
      ayudantes.forEach(e => {
       e.duracionVisible--
       if(e.duracionVisible>0){
         e.draw()
       }else  if(e.duracionVisible==0){
         let indice=ayudantes.indexOf(e)
         ayudantes.slice(indice,1);
       }
     
    })
  }

  document.onkeydown = e => {
    e.preventDefault()
    switch (e.keyCode) {
      case 37:
        jugador.moveLeft()
        avanzaLombri.play()
        break
      case 39:
        jugador.moveRight()
        avanzaLombri.play()
        break
      case 38:
          jugador.moveUp()
          avanzaLombri.play()
          break;
      case 40:
          jugador.moveDown()
          avanzaLombri.play()
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
      var div = document.getElementById("portada2");
      div.style.display = "none"
      var div2 = document.getElementById("portada1");
      div2.style.display = "none"
      var div3 = document.getElementById("portada3");
      div3.style.display = "block"
    startGame();
    };

    document.getElementById("start-button2").onclick = function() {
      var div = document.getElementById("portada2");
      div.style.display = "none"
      var div2 = document.getElementById("portada1");
      div2.style.display = "none"
      var div3 = document.getElementById("portada3");
      div3.style.display = "block"
    startGame();
    };
    
    document.getElementById("instruc-button").onclick = function(){
      var div = document.getElementById("portada2");
      div.style.display = "block"
      var div2 = document.getElementById("portada1");
      div2.style.display = "none"
    };


    
   function startGame() {
    interval = setInterval(update, 1000 / 60)
    }
  
  };
  
