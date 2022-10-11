import { Component } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IngresadosService } from "app/services/ingresados.service";

@Component({
  selector: 'app-ingresados',
  templateUrl: './ingresados.component.html'
})
export class IngresadosComponent {
  ingresados: any[];
  indx: number = 0;

  constructor(
    private modal: NgbModal,
    private ingresadosService: IngresadosService
  ) {
    this.ingresadosService.getIngresados().subscribe((response) => {
      localStorage.setItem("ingresados", JSON.stringify(response));
      this.ingresados = JSON.parse(localStorage.getItem("ingresados"));
    });
  }

  openDetalles(detalles, index) {
    this.modal.open(detalles, { size: "lg" });
    this.indx = index;
  }
}
