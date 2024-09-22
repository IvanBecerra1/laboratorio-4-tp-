import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoAutenticacion } from 'src/app/service/entidades/EstadoAutenticacion';
import { SComunicacionService } from 'src/app/service/s-comunicacion.service';
import { ChatServicioService } from 'src/app/servicio/chat-servicio.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {
  estaLogeado! : EstadoAutenticacion;
  juegoAhorcado : boolean = false;
  juegoMayorMenor : boolean = false;
  juegoCategoria : number = -1;
  game = "";

  advertenciaJuego : boolean = false;

  constructor(private login : SComunicacionService, private readonly router : Router) {}


  ngOnInit() {
    this.login.estadoUsuario.subscribe(connect=>{
      this.estaLogeado = connect;
      console.log(this.estaLogeado);
    });
  }

  iniciarAhorcado(){
    if (this.estaLogeado.estalogeado == false){
      this.advertenciaJuego = true;
      return;
    }
   // this.router.navigateByUrl("/home/juegos/Ahorcado");
    this.juegoAhorcado = true;
    this.juegoMayorMenor = false;
    this.game = "mayor-menor";
  }

  iniciarMayorMenor(){
    if (this.estaLogeado.estalogeado == false){
      this.advertenciaJuego = true;
      return;
    }

    this.juegoAhorcado = false;
    this.juegoMayorMenor = true;
    this.game = "ahorcado";
  }

  cerrarJuego(){
    this.game = "";
  }
  cerrarMensaje(){
    this.advertenciaJuego = false;
  }
}
