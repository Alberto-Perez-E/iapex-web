import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "environments/environment";
import { StorageService } from "app/pages/core/services/storage.service";

@Injectable({
  providedIn: "root",
})
export class InstitutionsService {
  private url: string = `http://localhost:5000/api/`;
  private bearer = this.storageService.headerToken();
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getInstitutions() {
    try {
      return this.http.get<any>(`${environment.API_URL}Institutions`, {
        headers: this.storageService.headerToken(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  createInstitution(data) {
    try {
      return this.http.post<any>(`${environment.API_URL}Institutions`, data, {
        headers: this.storageService.headerToken(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  updateInstitution(data) {
    try {
      return this.http.put<any>(
        `${environment.API_URL}Institutions/${data.id}`,
        data,
        {
          headers: this.storageService.headerToken(),
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  deleteInstitution(id) {
    try {
      return this.http.delete<any>(`${environment.API_URL}Institutions/${id}`, {
        headers: this.storageService.headerToken(),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
