import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  title = "Ahorcado";
  
  palabras = [
    "PELOTA",
    "LAMPARA",
    "MESSI",
    "ARGENTINA"
  ];


  palabra : any = "";

  mostrarCargando : boolean = false;
  rondasGanadas : number = 0;
  rondasPerdidas : number = 0;

  palabraOculta = "";
  intentos = 0;
  gano = false;
  perdio = false;
  letras = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];

  constructor(){
    this.palabraOculta = "_ ".repeat(this.palabra.length);
  }
  ngOnInit(): void {
    let numero : number = Math.floor(Math.random() * this.palabras.length) + 1;
    this.palabra = this.palabras[numero];
  }
  comprobar(letra : any) {
    this.existeLetra(letra);
    const palabraOcultaArreglo = this.palabraOculta.split(" ");

    for (let i = 0; i <= this.palabra.length; i++) {
      if (this.palabra[i] === letra) {
        palabraOcultaArreglo[i] = letra;
      }
    }
    this.palabraOculta = palabraOcultaArreglo.join(" ");
    this.verificaGanador();
  }
  verificaGanador() {
    const palabraArr = this.palabraOculta.split(" ");
    const palabraEvaluar = palabraArr.join("");

    if (palabraEvaluar === this.palabra) {
      this.mostrarCargando = true;
      this.gano = true;
      this.rondasGanadas++;
      console.log("Usuario GANO");

      this.actualizarPalabra();
    }
    if (this.intentos === 9) {
      this.mostrarCargando = true;
      this.perdio = true;
      this.rondasPerdidas++;
      this.actualizarPalabra();
      console.log("Usuario perdio");
    }
  }

  existeLetra(letra : any) {
    if (this.palabra.indexOf(letra) >= 0) {
      //console.log("La letra existe" + letra);
    } else {
      this.intentos++;
    }
  }

  
  actualizarPalabra(){
    setTimeout(() => {
      console.log('Acción realizada después de 3 segundos');
      let numero : number = Math.floor(Math.random() * this.palabras.length) + 1;
      this.palabra = this.palabras[1];

      this.perdio = false;
      this.gano = false;
      this.mostrarCargando = false;
      this.intentos = 0;
      this.palabraOculta = ""; 
    }, 5000); 
  }
}
