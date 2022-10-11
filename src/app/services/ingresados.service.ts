import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { StorageService } from "app/pages/core/services/storage.service";

@Injectable({
    providedIn: "root",
})
export class IngresadosService {
    constructor(
        private http: HttpClient,
        private storageService: StorageService
    ) {}

    getIngresados() {
        try {
            return this.http.get<any>(`${environment.API_MongoDB_URL}registros`);
        } catch (error) {
            console.log(error);
        }
    }
}