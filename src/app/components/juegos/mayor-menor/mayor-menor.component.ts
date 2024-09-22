import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {
  mostrarCargando : boolean = false;
  interrogacion : boolean = true;
  puntos = 0;
  gano = false;
  perdio = false;
  numero : number = 0;
  cartaAnterior : number = 0;

  numeros = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
  ];


  ngOnInit(): void {
    this.numero = Math.floor(Math.random() * 10) + 1;
  }

  numeroMenor(){
    let rondaGanador : boolean;
    this.chequearNumero()

    if ( this.numero < this.cartaAnterior){
      console.log("NUMERO MENOR: CARTA ANTERIOR: " + this.cartaAnterior + " CARTA NUEVA: " + this.numero);
      rondaGanador = true;
    }
    else{
      rondaGanador = false;
      console.log("LA CARTA ES MAYOR, PERDISTE");

    }
    this.verificaGanador(rondaGanador);
  };

  numeroMayor(){
    let rondaGanador : boolean;
    this.chequearNumero()
    if (this.numero > this.cartaAnterior){
      console.log("NUMERO MAYOR: CARTA ANTERIOR: " + this.cartaAnterior + " CARTA NUEVA: " + this.numero);
      rondaGanador = true;
    }
    else{
      rondaGanador = false;
      console.log("LA CARTA ES MENOR, PERDISTE");
    }

    this.verificaGanador(rondaGanador);
  }

  chequearNumero(){
    do {
      this.cartaAnterior = this.numero;
      this.numero = Math.floor(Math.random() * 10) + 1;
      console.log("numero nuevo: " + this.numero + " | carta Anterior: "+  this.cartaAnterior);

    }while(this.numero == this.cartaAnterior);


  }
  verificaGanador(accion : boolean) {
    this.mostrarCargando = true;
    if (accion== true){
      this.puntos += 1;
      this.gano = true;
      console.log("Usuario GANO");
    }
    else{
      this.perdio = true;
      this.puntos = 0;
      console.log("Usuario perdio");
      
    }


    setTimeout(() => {
      console.log('Acción realizada después de 3 segundos');

      
      this.mostrarCargando = false;
      this.gano = false;
      this.perdio = false;
      this.interrogacion = true;
    }, 5000); 
  }



}
