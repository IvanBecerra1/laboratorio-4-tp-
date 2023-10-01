import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';
import { collectionData } from '@angular/fire/firestore';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './entidades/Usuario';
import { EstadoAutenticacion } from './entidades/EstadoAutenticacion';

@Injectable({
  providedIn: 'root'
})
export class SComunicacionService {
  
  estaLogeado  = new BehaviorSubject<EstadoAutenticacion>(new EstadoAutenticacion);

  constructor(
    private firestore: Firestore,
    private fireAuth: Auth,
  ) { }


  GetStudentsList() {
  }


  get estadoUsuario() : Observable<EstadoAutenticacion>{
    return this.estaLogeado.asObservable();
  }

  async logout() {
    // Lógica de cierre de sesión aquí
    await signOut(this.fireAuth)
    this.estaLogeado.next(new EstadoAutenticacion);
  }
  async registrarse(nombre: string, clave: string, email: string) : Promise<boolean> {

    try {

      
      const usuarioRegistrado = await createUserWithEmailAndPassword(this.fireAuth, email, clave);
      const usuarioId = usuarioRegistrado.user.uid;

      const datos = {
        nombre: nombre,
        fecha: new Date()
      }
      const usuarioRef = doc(this.firestore, 'usuarios_auth', usuarioId);
      await setDoc(usuarioRef, datos);


      await this.iniciarSesion(email,clave);

      return true;
    } catch (error) {
      throw(error);
    }
  }

  async iniciarSesion(email: string, clave: string) {
    try {
      const usuario = await signInWithEmailAndPassword(this.fireAuth, email, clave);

      const usuarioId = usuario.user.uid;
      const usuarioRef = doc(this.firestore, 'usuarios_auth', usuarioId);

      const usuarioSnapshot = await getDoc(usuarioRef);

      if (usuarioSnapshot.exists()) {
        // Accede a los datos del documento utilizando data()
        const datosUsuario = usuarioSnapshot.data() as Usuario;
        datosUsuario.email = email;

        console.log('Datos del usuario Beveheior:', datosUsuario);
        this.estaLogeado.next({
          estalogeado : true,
          usuario : datosUsuario
        });

        return true;
      } else {
        console.log('El usuario no existe.');
        return false;
      }
    } catch (error) {

      console.log("se produjo un error : " + error)
      return false;
    }
  }
}
