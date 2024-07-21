import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminWebApi: any = "https://localhost:7247/api/Admin";
  constructor(private http: HttpClient) { }

  getAdmin() {
   return this.http.get<any>(this.adminWebApi);
  }
  getAdminById(id: any) {
    return this.http.get<any>(`${this.adminWebApi}/${id}`);
  }
  postAdmin(admin:any) {
   return this.http.post<any>(this.adminWebApi,admin);
  }
  login(admin:any) {
    return this.http.post(`${this.adminWebApi}/adminAuthenticate`, admin);
  }
}
