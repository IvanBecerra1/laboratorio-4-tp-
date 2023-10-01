import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServicioService {
  private messages: { name: string; text: string; timestamp: Date }[] = [];
  private messageSubject = new BehaviorSubject<{ name: string; text: string; timestamp: Date }[]>([]);

  constructor() { }

  getMessages() {
    return this.messageSubject.asObservable();
  }

  sendMessage(name: string, text: string) {
    const newMessage = {
      name,
      text,
      timestamp: new Date()
    };
    this.messages.push(newMessage);
    this.messageSubject.next([...this.messages]);
  }
  
}
