import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { PersonalComponent } from "../../pages/personal/personal.component";
import { InstitucionesComponent } from "../../pages/instituciones/instituciones.component";
import { HospitalesComponent } from "../../pages/hospitales/hospitales.component";
import { IngresadosComponent } from "../../pages/ingresados/ingresados.component";
import { BusquedasComponent } from "../../pages/busquedas/busquedas.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    PersonalComponent,
    InstitucionesComponent,
    HospitalesComponent,
    IngresadosComponent,
    BusquedasComponent,
  ],
})
export class AdminLayoutModule {}
