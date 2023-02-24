import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  env=environment
  constructor(private http:HttpClient) { }

  getnotif(): Observable<any>{
    return this.http.get(`${this.env.api}/notification/listnotification`)
  }
  getnotifbyid(id:any): Observable<any>{
    return this.http.get(`${this.env.api}/notification/getnotfbyid/${id}`);
  }

}
