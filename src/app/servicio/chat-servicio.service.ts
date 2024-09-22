import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SComunicacionService } from '../service/s-comunicacion.service';
import { Mensajes } from '../service/entidades/Mensajes';

@Injectable({
  providedIn: 'root'
})
export class ChatServicioService {
  private messages: { name: string; text: string; timestamp: Date }[] = [];
  private messageSubject = new BehaviorSubject<{ name: string; text: string; timestamp: Date }[]>([]);

  constructor(private comunicacion : SComunicacionService) { }


  sendMessage(message: string, sender: string) {
    const timestamp = new Date().getTime();

    this.comunicacion.guardarMensaje({
      mensaje: message,
      usuario: sender,
      tiempo: timestamp
    });
  }

  getMessages() {
    return this.comunicacion.cargarMensaje();
  }
  

  /*
  getMessages() : Observable<Mensajes[]> {
    return this.comunicacion.cargarMensaje();//this.messageSubject.asObservable();
  }*/

  /*
  sendMessage(name: string, text: string) {
    const newMessage = {
      name,
      text,
      timestamp: new Date()
    };
    this.messages.push(newMessage);
    this.messageSubject.next([...this.messages]);

    this.comunicacion.guardarMensaje({
      nombre: name,
      mensaje:text,
      fecha:new Date()
    })
  }*/
  
}
