import { Component, OnInit } from "@angular/core";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  // { path: '/dashboard',       title: 'Dashboard',         icon:'fa-th-large',       class: '' },
  // { path: '/user',            title: 'Perfil',            icon:'fa-user-circle',    class: '' },
  { path: "/instituciones",   title: "Instituciones",     icon: "fa-building-o",    class: "" },
  { path: "/hospitales",      title: "Hospitales",        icon: "fa-h-square",      class: "" },
  { path: "/personal",        title: "Personal",          icon: "fa-user-md",       class: "" },
  { path: "/ingresados",      title: "Ingresados",        icon: "fa-male",          class: "" },
  { path: "/busquedas",       title: "Búsquedas",         icon: "fa-search",        class: "" },
];

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  private localStorageService;

  rol: string = '';
  rutasAutorizadas: RouteInfo[] = [];

  constructor() {
    this.localStorageService = localStorage;
  }

  ngOnInit() {
    this.rol = JSON.parse(this.localStorageService.getItem("rol"));

    switch (this.rol) {
      case 'Administrador':
        this.rutasAutorizadas.push(ROUTES[0]);
        this.rutasAutorizadas.push(ROUTES[1]);
        this.rutasAutorizadas.push(ROUTES[2]);
        this.rutasAutorizadas.push(ROUTES[3]);
        //this.rutasAutorizadas.push(ROUTES[4]);
        break;

      case 'Representante':
        this.rutasAutorizadas.push(ROUTES[1]);
        this.rutasAutorizadas.push(ROUTES[2]);
        this.rutasAutorizadas.push(ROUTES[3]);
        //this.rutasAutorizadas.push(ROUTES[4]);
        break;

      case 'Director':
        this.rutasAutorizadas.push(ROUTES[2]);
        this.rutasAutorizadas.push(ROUTES[3]);
        break;

      case 'Personal':
        this.rutasAutorizadas.push(ROUTES[3]);
        break;
    
      default:
        break;
    }
    
    this.menuItems = this.rutasAutorizadas.filter((menuItem) => menuItem);
  }
}
