import { Component, OnInit } from '@angular/core';
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

  constructor(private login : SComunicacionService) {}

  ngOnInit() {
    this.login.estadoUsuario.subscribe(connect=>{
      this.estaLogeado = connect;
      console.log(this.estaLogeado);
    });
  }

  iniciarAhorcado(){
    this.juegoAhorcado = true;
    console.log("test");
  }
}
