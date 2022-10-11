import { Component, OnInit } from "@angular/core";
import { Constants } from "assets/Config";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "../../services/data.service";
import { Institution, User } from "../../interfaces/index";
import { StorageService } from "../core/services/storage.service";
import { EmployeeService } from "../../services/employee.service";
import { InstitutionsService } from "../../services/institutions.service";
import { EstadosMunicipios } from "assets/Config/Constants";

@Component({
  moduleId: module.id,
  selector: "instituciones-cmp",
  templateUrl: "instituciones.component.html",
})
export class InstitucionesComponent {
  institution: Institution[];
  user: User[];
  indx: number = 0;
  Nombre_institucion: String = '';
  Direccion: String = '';
  Estado: String = '';
  ciudad: String = '';
  Codigo_postal: String = '';
  Id_user: Number = 0;

  estadosMunicipios = Constants.EstadosMunicipios;
  ciudades: [] = null;

  NombreInstitucionError: string = '';
  DireccionError: string = '';
  EstadoError: string = '';
  CiudadError: string = '';
  CPError: string = '';
  IdUserError: string = '';

  constructor(
    private modal: NgbModal,
    private service: DataService,
    private storageService: StorageService,
    private institutionService: InstitutionsService,
    private employeeSevice: EmployeeService
  ) {
    this.institutionService
      .getInstitutions()
      .toPromise()
      .then((data) => {
        this.institution = data;
        console.log(data);
      });
    this.employeeSevice.getEmployees().subscribe((request) => {
      this.user = request;
      console.log(this.user);
    });

    console.log(storageService.headerToken());
  }
  openSM(contenido) {
    this.modal.open(contenido, { size: "lg" });
  }
  openUp(update, index) {
    this.Nombre_institucion = this.institution[index].nombre_institucion;
    this.Direccion = this.institution[index].direccion;
    this.Estado = this.institution[index].estado;
    this.ciudad = this.institution[index].ciudad;
    this.Codigo_postal = this.institution[index].codigo_postal;
    this.Id_user = this.institution[index].id_user;

    console.log(this.institution[index].id_user);
    this.modal.open(update, { size: "lg" });
    this.indx = index;
  }
  openDl(borrar, indx) {
    this.modal.open(borrar, { size: "lg" });
    this.indx = indx;
  }

  private blanco() {
    this.Nombre_institucion = null;
    this.Direccion = null;
    this.Estado = null;
    this.ciudad = null;
    this.Codigo_postal = null;
    this.Id_user = null;
  }

  validarCampos(datos, validarDuplicados: boolean) {
    let error = false;

    // VALIDAR - Nombre Institución
    if (datos.nombre_institucion.trim() == '') {
      this.NombreInstitucionError = Constants.MesaggeError.requiredError;
      error = true;
    } else if (validarDuplicados == true) {
      if (this.validateNombreInstitucion(datos)) {
        this.NombreInstitucionError = Constants.MesaggeError.nombreInstitucionDuplicateError;
        error = true;
      }
    } else {
      this.NombreInstitucionError = '';
    }
    
    // VALIDAR - Estado
    if (datos.estado.trim() == '') {
      this.EstadoError = Constants.MesaggeError.requiredError;
      error = true;
    } else {
      this.EstadoError = '';
    }
    
    console.log(datos.ciudad);
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

    // VALIDAR - Representante
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

  validateNombreInstitucion(datas) {
    for (let i = 0; i < this.institution.length; i++) {
      if (datas.Nombre_institucion === this.institution[i].nombre_institucion) {
        return true;
      }
    }
    this.NombreInstitucionError = '';
    return false;
  }

  CreateInstitution(validar) {
    let datas = {
      nombre_institucion: this.Nombre_institucion,
      direccion: this.Direccion,
      estado: this.Estado,
      ciudad: this.ciudad,
      codigo_postal: this.Codigo_postal,
      id_user: Number(this.Id_user),
    };
    if (this.validarCampos(datas, true)) {
      this.institutionService.createInstitution(datas).subscribe((response) => {
        console.log(response);
        this.institution.push(response);
      });

      this.blanco();
      this.modal.dismissAll();
    }
  }

  updateInstitution(id) {
    let datas = {
      id: id,
      nombre_institucion: this.Nombre_institucion,
      direccion: this.Direccion,
      estado: this.Estado,
      ciudad: this.ciudad,
      codigo_postal: this.Codigo_postal,
      id_user: Number(this.Id_user),
    };
    if (this.validarCampos(datas, false)) {
      this.institutionService.updateInstitution(datas).subscribe((request) => {
        console.log(request);
      });
      this.blanco();
      this.modal.dismissAll();
    }
  }

  deleteInstitution(id, indx) {
    this.institutionService.deleteInstitution(id).subscribe((request) => {
      console.log(request);
      this.institution.splice(indx, 1);
    });
    this.modal.dismissAll();
  }

  clear() {
    this.NombreInstitucionError = '';
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
