import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { StorageService } from "app/pages/core/services/storage.service";
import { error } from "protractor";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  user = "users";
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getEmployees() {
    try {
      return this.http.get<any>(`${environment.API_URL}${this.user}`, {
        headers: this.storageService.headerToken(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  createEmployee(user: any) {
    try {
      return this.http.post<any>(`${environment.API_URL}${this.user}`, user, {
        headers: this.storageService.headerToken(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  updateEmployee(user: any) {
    try {
      return this.http.put<any>(
        `${environment.API_URL}${this.user}/${user.id}`,
        user,
        {
          headers: this.storageService.headerToken(),
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  deleteEmploye(id) {
    try {
      return this.http.delete<any>(`${environment.API_URL}${this.user}/${id}`, {
        headers: this.storageService.headerToken(),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
