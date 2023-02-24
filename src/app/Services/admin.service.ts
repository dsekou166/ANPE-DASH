
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  env=environment
  constructor(private http: HttpClient) {}

  loginadmin(emailadmin: string, passwordadmin: string): Observable<any> {
    console.log(emailadmin);
    console.log(passwordadmin)
    return this.http.post(
      AUTH_API + 'signin/Admin',
      {
        emailadmin,
        passwordadmin,
      },
      httpOptions
    );
  }

  adminregister(admin:any,image:any):Observable<any>{
    
    const data:FormData=new FormData();
    data.append('image',image)
    
    data.append('admin', JSON.stringify(admin).slice(1,JSON.stringify(admin).lastIndexOf(']')));
    
    return this.http.post(`http://localhost:8080/api/auth/signup/Admin`,data);
  }

  logoutadmin(): Observable<any> {
    return this.http.post(AUTH_API + 'signout/Admin', { }, httpOptions);
  }

  getadminbyid(id:any): Observable<any>{
    return this.http.get(`${this.env.api}/auth/getadminbyid/${id}`);
  }

  getadmin(): Observable<any>{
    return this.http.get(`${this.env.api}/auth/listadmin`)
  }

  deleteadmin(id:number) {
    return this.http.delete(`${this.env.api}/auth/deletedemandeur/${id}`)
      
  }
}