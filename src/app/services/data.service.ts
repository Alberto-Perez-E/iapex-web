import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Institution, Hospital, User } from "../interfaces/index";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) {}

  getHospitals() {
    return this.http.get<Hospital[]>("../../assets/data/Hospitals.json");
  }
  getInstitutions() {
    return this.http.get<Institution[]>("../../assets/data/Institutions.json");
  }
  getUsers() {
    return this.http.get<User[]>("../../assets/data/Users.json");
  }
}
