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
   
  }

  comprobar(numero : any) {

    this.numero = Math.floor(Math.random() * 10) + 1;

    this.interrogacion = false;

    this.verificaGanador(this.numero, numero);
  }

  verificaGanador(numeroAleatorio : any, numero : any) {

    if (this.numero == numero){
      this.puntos += 1;
      this.gano = true;
      console.log("Usuario GANO");
    }
    else{
      this.perdio = true;
      this.puntos = 0;
      console.log("Usuario perdio");
    }
    this.mostrarCargando = true;

    setTimeout(() => {
      console.log('Acción realizada después de 3 segundos');

      this.mostrarCargando = false;
      this.gano = false;
      this.perdio = false;
      this.interrogacion = true;
    }, 5000); 

  }



}
