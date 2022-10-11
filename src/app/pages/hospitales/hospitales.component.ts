import { Component, OnInit } from "@angular/core";
import { Constants } from "assets/Config";
import { Hospital, User } from "../../interfaces/index";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "app/services/data.service";
import { HospitalService } from "app/services/hospital.service";
import { EmployeeService } from "app/services/employee.service";
import { EstadosMunicipios } from "assets/Config/Constants";

@Component({
  selector: "app-hospitales",
  templateUrl: "./hospitales.component.html",
})
export class HospitalesComponent {
  user: User[];
  hospital: Hospital[];
  indx: number = 0;
  nombre_hospital: String = '';
  direccion: String = '';
  estado: String = '';
  ciudad: String = '';
  codigo_postal: String = '';
  id_user: number = 0;
  show: boolean = false;
  auxHospital: Hospital;

  estadosMunicipios = Constants.EstadosMunicipios;
  ciudades: [] = null;

  NombreHospitalError: string = '';
  DireccionError: string = '';
  EstadoError: string = '';
  CiudadError: string = '';
  CPError: string = '';
  IdUserError: string = '';

  constructor(
    private modal: NgbModal,
    private service: DataService,
    private hospitalService: HospitalService,
    private employeeService: EmployeeService
  ) {
    this.hospitalService.getHospitals().subscribe((request) => {
      localStorage.setItem("hospitals", JSON.stringify(request));
      this.hospital = JSON.parse(localStorage.getItem("hospitals"));
      console.log(this.hospital);
    });

    this.employeeService.getEmployees().subscribe((response) => {
      localStorage.setItem("users", JSON.stringify(response));
      this.user = JSON.parse(localStorage.getItem("users"));
      console.log(this.user);
    });
  }

  openSM(contenido) {
    this.modal.open(contenido, { size: "lg" });
  }
  openUp(update, index) {
    console.log(this.hospital[index]);
    this.nombre_hospital = this.hospital[index].nombre_hospital;
    this.direccion = this.hospital[index].direccion;
    this.estado = this.hospital[index].estado;
    this.ciudad = this.hospital[index].ciudad;
    this.codigo_postal = this.hospital[index].codigo_postal;
    this.id_user = this.hospital[index].id_user;

    this.modal.open(update, { size: "lg" });
    this.indx = index;
  }
  openDl(borrar, index) {
    this.modal.open(borrar, { size: "lg" });
    this.indx = index;
  }

  private blanco() {
    this.nombre_hospital = null;
    this.direccion = null;
    this.estado = null;
    this.ciudad = null;
    this.codigo_postal = null;
    this.id_user = null;
  }

  validarCampos(datos, validarDuplicados: boolean) {
    let error = false;

    // VALIDAR - Nombre Hospital
    if (datos.nombre_hospital.trim() == '') {
      this.NombreHospitalError = Constants.MesaggeError.requiredError;
      error = true;
    } else if (validarDuplicados == true) {
      if (this.validateNombreHospital(datos)) {
        this.NombreHospitalError = Constants.MesaggeError.nombreHospitalDuplicateError;
        error = true;
      }
    } else {
      this.NombreHospitalError = '';
    }
    
    // VALIDAR - Estado
    if (datos.estado.trim() == '') {
      this.EstadoError = Constants.MesaggeError.requiredError;
      error = true;
    } else {
      this.EstadoError = '';
    }
    
    // VALIDAR - Ciudad
    if (datos.ciudad.trim() == '') {
      this.CiudadError = Constants.MesaggeError.requiredError;
      error = true;
    } else {
      this.CiudadError = '';
    }

    // VALIDAR - Dirección
    if (datos.direccion.trim() == '') {
      this.DireccionError = Constants.MesaggeError.requiredError;
      error = true;
    } else {
      this.DireccionError = '';
    }

    // VALIDAR - Código Postal
    if (datos.codigo_postal.trim() == '') {
      this.CPError = Constants.MesaggeError.requiredError;
      error = true;
    } else if (datos.codigo_postal.length < 5) {
      this.CPError = Constants.MesaggeError.codigoPostalLengthError;
      error = true;
    } else {
      this.CPError = '';
    }

    // VALIDAR - Director
    if (datos.id_user <= 0) {
      this.IdUserError = Constants.MesaggeError.requiredError;
      error = true;
    } else {
      this.IdUserError = '';
    }

    if (error == false) {
      return true;
    } else {
      return false;
    }
  }

  validateNombreHospital(datas) {
    for (let i = 0; i < this.hospital.length; i++) {
      if (datas.nombre_hospital === this.hospital[i].nombre_hospital) {
        return true;
      }
    }
    this.NombreHospitalError = '';
    return false;
  }

  createHospital(validar) {
    let datas = {
      nombre_hospital: this.nombre_hospital,
      direccion: this.direccion,
      estado: this.estado,
      ciudad: this.ciudad,
      codigo_postal: this.codigo_postal,
      id_user: Number(this.id_user),
    };
    if (this.validarCampos(datas, true)) {
      this.hospitalService.createHospital(datas).subscribe((request) => {
        console.log(request);
        this.hospital.push(request);
      });
      this.blanco();
      this.modal.dismissAll();
    }
  }

  updateHospital(id) {
    let datas = {
      id: id,
      nombre_hospital: this.nombre_hospital,
      direccion: this.direccion,
      estado: this.estado,
      ciudad: this.ciudad,
      codigo_postal: this.codigo_postal,
      id_user: Number(this.id_user),
    };
    datas.id_user = Number(datas.id_user);
    console.log(datas);
    if(this.validarCampos(datas, false)) {
      this.hospitalService
        .editHospital(datas)
        .subscribe((request) => console.log(request));
      this.blanco();
      this.modal.dismissAll();
      window.location.reload();
    }
  }

  deleteHospital(id, indx) {
    this.hospitalService.deleteHospital(id).subscribe((request) => {
      console.log(request, indx);
      this.hospital.splice(indx, 1);
    });
    this.modal.dismissAll();
  }

  clear() {
    this.NombreHospitalError = '';
    this.DireccionError = '';
    this.EstadoError = '';
    this.CiudadError = '';
    this.CPError = '';
    this.IdUserError = '';
  }

  seleccionarEstado(event) {
    this.ciudades = EstadosMunicipios[event.target.value];
    console.log(this.ciudades);
  }
}
