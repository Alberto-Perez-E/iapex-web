import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginObject } from "../services/login-object.model";
import { Session } from "../pages/core/models/session.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  login(datos: any): Observable<Session> {
    try {
      return this.http.post<any>(`${environment.API_URL}login/web`, datos);
    } catch (error) {
      console.log(error);
    }
  }

  logout(): Observable<Boolean> {
    return this.http.post<Boolean>(`${environment.API_URL}logout`, {});
  }

}
