import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class RecruteurService {
  env=environment
  constructor(private http: HttpClient) {}

  loginrecruteur(emailentreprise: string, passwordentreprise: string): Observable<any> {
    console.log(emailentreprise);
    console.log(passwordentreprise)
    return this.http.post(
      AUTH_API + 'signin/Recruteur',
      {
        emailentreprise,
        passwordentreprise,
      },
      httpOptions
    );
  }

  recruteurregister(recruteur:any,image:any):Observable<any>{
    
    const data:FormData=new FormData();
    data.append('image',image)
    
    data.append('recruteur', JSON.stringify(recruteur).slice(1,JSON.stringify(recruteur).lastIndexOf(']')));
    
    return this.http.post(`http://localhost:8080/api/auth/signup/Recruteur`,data);
  }

  logoutdemandeur(): Observable<any> {
    return this.http.post(AUTH_API + 'signout/Recruteur', { }, httpOptions);
  }

  getrecruteurbyid(id:any): Observable<any>{
    return this.http.get(`${this.env.api}/auth/getrecruteureurbyid/${id}`);
  }

  getrecruteur(): Observable<any>{
    return this.http.get(`${this.env.api}/auth/listrecruteur`)
  }

  deleterecruteur(id:number) {
    return this.http.delete(`http://localhost:8080/api/auth/deleterecruteur/${id}`)
      
  }
}