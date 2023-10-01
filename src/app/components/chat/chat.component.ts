import { Component, OnInit } from '@angular/core';
import { EstadoAutenticacion } from 'src/app/service/entidades/EstadoAutenticacion';
import { SComunicacionService } from 'src/app/service/s-comunicacion.service';
import { ChatServicioService } from 'src/app/servicio/chat-servicio.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatActive : boolean = false;
  messages: { name: string; text: string; timestamp: Date }[] = [];
  name : string | undefined = 'Anonimus';
  text: string = '';
  estaLogeado! : EstadoAutenticacion;

  constructor(private chatService: ChatServicioService, private readonly login : SComunicacionService) {}

  ngOnInit() {
    this.chatService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });

    this.login.estadoUsuario.subscribe(connect=>{
      this.estaLogeado = connect;
      this.name = this.estaLogeado.usuario.nombre;
      console.log(this.estaLogeado);
    });
  }
  sendMessage() {
    if (this.name && this.text) {
      this.chatService.sendMessage(this.name, this.text);
      this.text = '';
    }
  }

  enableChat(){
    this.chatActive = !this.chatActive;
  }
}