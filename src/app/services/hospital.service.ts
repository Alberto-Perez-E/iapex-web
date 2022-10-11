import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { StorageService } from "app/pages/core/services/storage.service";

@Injectable({
  providedIn: "root",
})
export class HospitalService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getHospitals() {
    try {
      return this.http.get<any>(`${environment.API_URL}Hospitals`, {
        headers: this.storageService.headerToken(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  createHospital(hospital) {
    try {
      return this.http.post<any>(`${environment.API_URL}Hospitals`, hospital, {
        headers: this.storageService.headerToken(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  editHospital(hospital) {
    try {
      return this.http.put<any>(
        `${environment.API_URL}Hospitals/${hospital.id}`,
        hospital,
        {
          headers: this.storageService.headerToken(),
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  deleteHospital(id) {
    try {
      return this.http.delete<any>(`${environment.API_URL}Hospitals/${id}`, {
        headers: this.storageService.headerToken(),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
