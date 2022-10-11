import { Component, Injectable, Input, OnInit, Optional } from "@angular/core";
import { User } from "../../interfaces/index";
import { Constants } from "assets/Config";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "app/services/data.service";
import { ReactiveFormsModule } from "@angular/forms";
import { EmployeeService } from "app/services/employee.service";
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { constants } from "buffer";

@Component({
  selector: "app-personal",
  templateUrl: "./personal.component.html",
})
export class PersonalComponent {
  ErroMessage: String;
  Aux: String;
  user: any[];
  indx: number = 0;
  Myform: FormGroup;
  local_data: any;
  datos: any;

  nombre: String = '';
  Apellido_paterno: String = '';
  Apellido_materno: String = '';
  Correo: String = '';
  Contrasena: String = '';
  Telefono: String = '';
  Curp: String = '';
  Ine: String = '';
  Fecha_nacimiento: Date = null;
  rol: String = '';

  NombreError: string = '';
  ApPaternoError: string = '';
  ApMaternoError: string = '';
  CorreoError: string = '';
  ContrasenaError: string = '';
  TelefonoError: string = '';
  CURPError: string = '';
  FechaNacimientoError: string = '';
  INEError: string = '';

  correoPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  espaciosPattern = new RegExp(/\s/);

  Fecha_hoy: Date = new Date();

  constructor(
    private modal: NgbModal,
    private service: DataService,
    private employeeService: EmployeeService
  ) {
    this.employeeService.getEmployees().subscribe((response) => {
      localStorage.setItem("users", JSON.stringify(response));
      this.user = JSON.parse(localStorage.getItem("users"));
      console.log(this.user);
    });
  }

  getEmplo() {
    this.employeeService.getEmployees().subscribe((response) => {
      this.user = response;
      console.log(response);
    });
  }

  openSMA(contenido) {
    this.modal.open(contenido, { size: "lg" });
  }
  openDetalles(detalles, index) {
    this.modal.open(detalles, { size: "lg" });
    this.indx = index;
  }
  openUp(update, index) {
    this.modal.open(update, { size: "lg" });
    this.indx = index;
    this.Apellido_materno = this.user[index].apellido_materno;
    this.Apellido_paterno = this.user[index].apellido_paterno;
    this.Contrasena = this.user[index].contrasena;
    this.Correo = this.user[index].correo;
    this.Curp = this.user[index].curp;
    this.Fecha_nacimiento = this.user[index].fecha_nacimiento;
    this.Ine = this.user[index].ine;
    this.Telefono = this.user[index].telefono;
    this.nombre = this.user[index].nombre;
    this.rol = this.user[index].rol;
  }
  openDl(borrar, indx) {
    this.modal.open(borrar, { size: "lg" });
    this.indx = indx;
  }

  private blanco() {
    this.rol = null;
    this.nombre = null;
    this.Apellido_paterno = null;
    this.Apellido_materno = null;
    this.Correo = null;
    this.Contrasena = null;
    this.Telefono = null;
    this.Curp = null;
    this.Ine = null;
    this.Fecha_nacimiento = null;
  }

  validarCampos(datos, validarDuplicados: boolean) {
    let error = false;

    // VALIDAR - Nombre
    if (datos.nombre.trim() == '') {
      this.NombreError = Constants.MesaggeError.requiredError;
      error = true;
    } else {
      this.NombreError = '';
    }

    // VALIDAR - Apellido Paterno
    if (datos.Apellido_paterno.trim() == '') {
      this.ApPaternoError = Constants.MesaggeError.requiredError;
      error = true;
    } else {
      this.ApPaternoError = '';
    }

    // VALIDAR - Apellido Materno
    if (datos.Apellido_materno.trim() == '') {
      this.ApMaternoError = Constants.MesaggeError.requiredError;
      error = true;
    } else {
      this.ApMaternoError = '';
    }

    // VALIDAR - Correo
    if (datos.Correo.trim() == '') {
      this.CorreoError = Constants.MesaggeError.requiredError;
      error = true;
    } else if (!this.correoPattern.test(datos.Correo)) {
      this.CorreoError = Constants.MesaggeError.correoWrongError;
      error = true;
    } else if (validarDuplicados == true) {
      if (this.validateEmail(datos)) {
        this.CorreoError = Constants.MesaggeError.correoDuplicateError;
        error = true;
      }
    } else {
      this.CorreoError = '';
    }

    // VALIDAR - Contraseña
    if (datos.Contrasena.trim() == '') {
      this.ContrasenaError = Constants.MesaggeError.requiredError;
      error = true;
    } else if (this.espaciosPattern.test(datos.Contrasena)) {
      this.ContrasenaError = Constants.MesaggeError.espaciosError;
      error = true;
    } else {
      this.ContrasenaError = '';
    }

    // VALIDAR - Teléfono
    if (datos.Telefono.trim() == '') {
      this.TelefonoError = Constants.MesaggeError.requiredError;
      error = true;
    } else if (datos.Telefono.length < 10) {
      this.TelefonoError = Constants.MesaggeError.telefonoLengthError;
      error = true;
    } else if (isNaN(datos.Telefono)) {
      this.TelefonoError = Constants.MesaggeError.telefonoisNaNError;
      error = true;
    } else {
      this.TelefonoError = '';
    }

    // VALIDAR - CURP
    if (datos.Curp.trim() == '') {
      this.CURPError = Constants.MesaggeError.requiredError;
      error = true;
    } else if (datos.Curp.length < 18) {
      this.CURPError = Constants.MesaggeError.curpLengthError;
      error = true;
    } else if (validarDuplicados == true) {
      if (this.validateCurp(datos)) {
        this.CURPError = Constants.MesaggeError.curpDuplicateError;
        error = true;
      }
    } else {
      this.CURPError = '';
    }

    // VALIDAR - INE
    if (datos.Ine.trim() == '') {
      this.INEError = Constants.MesaggeError.requiredError;
      error = true;
    } else {
      this.INEError = '';
    }

    // VALIDAR - Fecha de Nacimiento
    if (datos.Fecha_nacimiento == null) {
      this.FechaNacimientoError = Constants.MesaggeError.requiredError;
      error = true;
    } else if (datos.Fecha_nacimiento.getFullYear() > this.Fecha_hoy.getFullYear()) {
      this.FechaNacimientoError = Constants.MesaggeError.fechaNacimientoRangoError;
      error = true;
    } else {
      this.FechaNacimientoError = '';
    }

    if (error == false) {
      return true;
    } else {
      return false;
    }
  }

  validateCurp(datas) {
    for (let i = 0; i < this.user.length; i++) {
      if (datas.Curp === this.user[i].curp) {
        return true;
      }
    }
    this.CURPError = '';
    return false;
  }
  validateEmail(datas) {
    for (let i = 0; i < this.user.length; i++) {
      if (datas.Correo === this.user[i].correo) {
        return true;
      }
    }
    this.CorreoError = '';
    return false;
  }

  imprimo(validar) {
    const datas = {
      nombre: this.nombre,
      Apellido_paterno: this.Apellido_paterno,
      Apellido_materno: this.Apellido_materno,
      Correo: this.Correo,
      Contrasena: this.Contrasena,
      Telefono: this.Telefono,
      Curp: this.Curp,
      Ine: this.Ine,
      Fecha_nacimiento: new Date(this.Fecha_nacimiento),
    };
    console.log(datas);
    if (this.validarCampos(datas, true)) {
      this.employeeService.createEmployee(datas).subscribe((response) => {
        this.user.push(response);
        console.log(response);
      });
      this.blanco();
      this.modal.dismissAll();
    }
  }

  updateEmployee(id, user) {
    const datas = {
      id: id,
      nombre: this.nombre,
      Apellido_paterno: this.Apellido_paterno,
      Apellido_materno: this.Apellido_materno,
      Correo: this.Correo,
      Contrasena: this.Contrasena,
      Telefono: this.Telefono,
      Curp: this.Curp,
      Ine: this.Ine,
      Fecha_nacimiento: new Date(this.Fecha_nacimiento),
      Rol: this.rol
    };
    console.log(datas, user);
    if (this.validarCampos(datas, false)) {
      this.employeeService.updateEmployee(datas).subscribe((response) => {
        console.log(response);
      });
      this.blanco();
      this.modal.dismissAll();
    }
  }

  deleteEmployee(id, indx) {
    this.employeeService.deleteEmploye(id).subscribe((response) => {
      console.log(response);

      this.user.splice(indx, 1);
    },
    (error) => {
      console.log('TEST');
    });
    console.log(id);
    this.modal.dismissAll();
  }

  clear() {
    this.NombreError = '';
    this.ApPaternoError = '';
    this.ApMaternoError = '';
    this.CorreoError = '';
    this.ContrasenaError = '';
    this.TelefonoError = '';
    this.CURPError = '';
    this.FechaNacimientoError = '';
    this.INEError = '';
  }
}
