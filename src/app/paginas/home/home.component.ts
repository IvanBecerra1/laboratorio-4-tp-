import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/service/entidades/Usuario';
import { SComunicacionService } from 'src/app/service/s-comunicacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  estaLogeado! : Usuario;
  msgLogeado = "Iniciar sesion";


  constructor(private readonly servicio : SComunicacionService){}

  ngOnInit(): void {
  }


  /**
   *   estaLogeado : boolean = false;

    constructor(private iComunicacion : IComunicacionService){
    }
  ngOnInit(): void {
    this.iComunicacion.estadoUsuario.subscribe(connect=>{
      this.estaLogeado = connect;
    });
  }

   */
}
