import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { PersonalComponent } from "../../pages/personal/personal.component";
import { InstitucionesComponent } from "../../pages/instituciones/instituciones.component";
import { HospitalesComponent } from "../../pages/hospitales/hospitales.component";
import { IngresadosComponent } from "../../pages/ingresados/ingresados.component";
import { BusquedasComponent } from "../../pages/busquedas/busquedas.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user", component: UserComponent },
  { path: "personal", component: PersonalComponent },
  { path: "instituciones", component: InstitucionesComponent },
  { path: "hospitales", component: HospitalesComponent },
  { path: "ingresados", component: IngresadosComponent },
  { path: "busquedas", component: BusquedasComponent },
];
