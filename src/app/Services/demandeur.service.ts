import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';


const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class DemandeurService {
  env=environment
  constructor(private http: HttpClient) {}

  loginadmin(emailDemandeur: string, passwordDemandeur: string): Observable<any> {
    console.log(emailDemandeur);
    console.log(passwordDemandeur)
    return this.http.post(
      AUTH_API + 'signin/Demandeur',
      {
        emailDemandeur,
        passwordDemandeur,
      },
      httpOptions
    );
  }

  demandeurregister(demandeur:any,image:any,dossierdemandeur:any,cv:any):Observable<any>{
    
    const data:FormData=new FormData();
    data.append('image',image)
    data.append('dossierdemandeur',dossierdemandeur)
    data.append('cv',cv)
    data.append('demandeur', JSON.stringify(demandeur).slice(1,JSON.stringify(demandeur).lastIndexOf(']')));
    
    return this.http.post(`http://localhost:8080/api/auth/signup/Demandeur`,data);
  }

  logoutdemandeur(): Observable<any> {
    return this.http.post(AUTH_API + 'signout/Demandeur', { }, httpOptions);
  }

  getdemandeurbyid(id:any): Observable<any>{
    return this.http.get(`${this.env.api}/auth/getdemandeurbyid/${id}`);
  }

  getdemandeur(): Observable<any>{
    return this.http.get(`${this.env.api}/auth/listdemandeur`)
  }

  deletedemandeur(id:number) {
    return this.http.delete(`${this.env.api}/auth/deletedemandeur/${id}`)
      
  }
}