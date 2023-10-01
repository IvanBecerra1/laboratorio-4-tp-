import { Component, OnInit } from '@angular/core';
import { EstadoAutenticacion } from 'src/app/service/entidades/EstadoAutenticacion';
import { Usuario } from 'src/app/service/entidades/Usuario';
import { SComunicacionService } from 'src/app/service/s-comunicacion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit  {
  estaLogeado! : EstadoAutenticacion;

  constructor(private readonly servicio : SComunicacionService){}

  ngOnInit(): void {

    this.servicio.estadoUsuario.subscribe(connect=>{
      this.estaLogeado = connect;
      console.log(this.estaLogeado);
    });
  }

  async logout(){
    await this.servicio.logout();
  }
}
