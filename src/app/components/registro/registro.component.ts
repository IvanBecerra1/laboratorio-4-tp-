import { Component } from '@angular/core';

import { EmailValidator, FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { SComunicacionService } from 'src/app/service/s-comunicacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  msgErrorNombre: string = "";
  msgErrorClave: string = "";
  msgErrorEmail: string = "";
  controller: FormGroup;
  emailEnUso : boolean = false;

  constructor(private readonly builder: FormBuilder, private router: Router,
    private servicio : SComunicacionService) {

    // incializacion del controlador con el builder form
    this.controller = this.initFormGroup();

  }

  initFormGroup() : FormGroup{
    // agregamos validaciones y registramos los campos
    return this.builder.group({
      name: ["Nombre",[Validators.required]],
      email: ["@ejemplo.com", [Validators.required, Validators.email]],
      password : ["", [Validators.minLength(5), Validators.required]]  
    })
  }
  async registrar() : Promise<void>{

    if (this.controller.invalid){
      this.controller.markAllAsTouched(); // marca a todos los inputs como tocados.
      return;
    }

    const datos = {
      nombre : this.controllerName?.value,
      email : this.controllerEmail?.value,
      password : this.controllerPassword?.value
    }

    await this.servicio.registrarse(this.controllerName?.value, this.controllerPassword?.value, this.controllerEmail?.value)
    .then(()=>{
      console.log("usuario_registrado" + JSON.stringify(datos));
      localStorage.setItem("usuario_registrado", JSON.stringify(datos)); // guarda en el local storage
      this.router.navigateByUrl("/home/juegos");
    })
    .catch((error) =>{
      if (error.code === 'auth/invalid-email') {
        console.log("El email es invalido");
      } else if (error.code === 'auth/email-already-in-use') {

        console.log("El email esta en uso");
        this.emailEnUso = true;
      }
    })
  }

  validarCampoNombre() : Boolean {
    if ( !(this.controllerName?.touched)   || !this.controllerName.invalid )
      return false;

    this.msgErrorNombre = "El campo es requerido";
    return true;
  }

  validarCampoEmail() : boolean{
    if (!(this.controllerEmail?.touched) || !this.controllerEmail.invalid)
      return false;


    this.msgErrorEmail = "El campo email no es valido"
    return true;
  }

  validarCampoClave() : boolean{
    if (!(this.controllerPassword?.touched)  || !this.controllerPassword.invalid)
      return false;

    this.msgErrorClave = "Escribe una clave de almenos 5 caracteres";
    return true;
  }

  get controllerName() { return this.controller.get("name"); }
  get controllerEmail(){ return this.controller.get("email");}
  get controllerPassword() {return this.controller.get("password");}

}
