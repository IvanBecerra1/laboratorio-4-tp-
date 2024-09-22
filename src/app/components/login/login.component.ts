import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SComunicacionService } from 'src/app/service/s-comunicacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formulario : FormGroup;
  msgErrorClave! : string;
  msgErrorEmail! : string;
  credencialesInvalido : boolean = false;

  constructor(private readonly builder : FormBuilder,
    private readonly router : Router,
    private readonly servicio : SComunicacionService){

      this.formulario = builder.group({
        email :["", Validators.required],
        clave : ["", Validators.required]
      })
    }
    

  async loginUsuario(){
    if (this.formulario.invalid){
      this.formulario.markAllAsTouched;
      return;
    }

    let datosCorrectos : boolean = await this.servicio.iniciarSesion(this.formulario.value.email, this.formulario.value.clave);

    if (datosCorrectos){
      console.log("LOGEADO: true");


      this.router.navigateByUrl("/home/juegos");
      this.formulario.reset();
    }
    else {
      console.log("LOGEADO: FALSE");
      this.credencialesInvalido = true;
    }
    /*
    if (this.formulario.value.email == "ivan" && this.formulario.value.clave == "1234"){
      console.log("LOGEADO: true");
      console.log("EMAIL: " + this.formulario.value.email);
      console.log("CLAVE: " + this.formulario.value.clave);
      this.router.navigateByUrl("/home");
      this.formulario.reset();
    }*/

  }


  validarCampoEmail() : boolean{
    if (!(this.controllerEmail?.touched) || !this.controllerEmail.invalid)
      return false;


    this.msgErrorEmail = "Ingrese un correo valido"
    return true;
  }

  validarCampoClave() : boolean{
    if (!(this.controllerPassword?.touched)  || !this.controllerPassword.invalid)
      return false;

    this.msgErrorClave = "La clave no puede estar vacio";
    return true;
  }

  get controllerEmail(){ return this.formulario.get("email");}
  get controllerPassword() {return this.formulario.get("clave");}

  loginWithGoogle(){

  }
}
