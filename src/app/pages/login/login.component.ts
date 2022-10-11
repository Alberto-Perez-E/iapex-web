import { Component } from '@angular/core';
import { Constants } from "assets/Config";
import { Router } from "@angular/router";
import { AuthenticationService } from "app/shared/authentication.service";
import { StorageService } from "../core/services/storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // VARIABLES - Campos de formulario
  correo: String = '';
  contrasena: String = '';

  // VARIABLES - Mensajes de error
  correoError: string = '';
  contrasenaError: string = '';

  correoPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  espaciosPattern = new RegExp(/\s/);

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private storageService: StorageService
  ) { }

  iniciarSesion() {
    const datos = {
      Usuario: this.correo,
      Contrasena: this.contrasena
    };

    if (this.validarCampos(datos)) {
      this.authenticationService.login(datos).subscribe((response) => {
        console.log(response);
        this.storageService.setCurrentSession(response);
        this.router.navigate(["ingresados"]);
      },
      (error) => {
        this.contrasenaError = Constants.MesaggeError.loginError;
      });
    }
  }

  validarCampos(datos) {
    let error = false;

    // VALIDAR - Correo
    if (datos.Usuario.trim() == '') {
      this.correoError = Constants.MesaggeError.requiredError;
      error = true;
    } else if (!this.correoPattern.test(datos.Usuario)) {
      this.correoError = Constants.MesaggeError.correoWrongError;
      error = true;
    } else {
      this.correoError = '';
    }

    // VALIDAR - Contraseña
    if (datos.Contrasena.trim() == '') {
      this.contrasenaError = Constants.MesaggeError.requiredError;
      error = true;
    } else if (this.espaciosPattern.test(datos.Contrasena)) {
      this.contrasenaError = Constants.MesaggeError.espaciosError;
      error = true;
    } else {
      this.contrasenaError = '';
    }

    if (error == false) {
      return true;
    } else {
      return false;
    }
  }

}
