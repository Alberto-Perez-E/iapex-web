/**
 * Created by xavi on 5/16/17.
 */
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Session } from "../models/session.model";
import { User } from "../../../interfaces";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class StorageService {
  private localStorageService;
  private currentSession: Session = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem("token", JSON.stringify(session['Token']));
    this.localStorageService.setItem("rol", JSON.stringify(session['DatosUsuario'].Rol));
  }

  loadSessionData(): Session {
    var sessionStr = this.localStorageService.getItem("token");
    return sessionStr ? <Session>JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem("token");
    this.localStorageService.removeItem("rol");
    this.currentSession = null;
  }

  getCurrentUser(): User {
    var session: Session = this.getCurrentSession();
    return session && session.user ? session.user : null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentToken() != null ? true : false;
  }

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return session && session.token ? session.token : null;
  }

  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(["/login"]);
  }

  headerToken() {
    let token = this.localStorageService.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${<Session>JSON.parse(token)}`,
    });
    return headers;
  }
}
