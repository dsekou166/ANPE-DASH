import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
env=environment
  constructor(private http:HttpClient) { }
  creerannonce(nomposte:any,annonce:any,file:any,dossier:any):Observable<any>{
    const data:FormData=new FormData();
    data.append('file',file)
    data.append('dossier',dossier)

    data.append('annonce', JSON.stringify(annonce).slice(1,JSON.stringify(annonce).lastIndexOf(']')));
    return this.http.post(`http://localhost:8080/api/Annonce/add/${nomposte}`,data);
  }

  getannonce(): Observable<any>{
    return this.http.get(`${this.env.api}/Annonce/list`)
  }
  getannoncebyid(id:any): Observable<any>{
    return this.http.get(`${this.env.api}/Annonce/getannoncebyid/${id}`);
  }

    postuler(iddemandeur:any, idannonce:any): Observable<any>{
    const data: FormData = new FormData();
    
    return this.http.post(`http://localhost:8080/api/postuler/${iddemandeur}/${idannonce}`,null);
  }

  deleteannonce(id:number) {
    return this.http.delete(`http://localhost:8080/api/Annonce/delete/${id}`)
      
  }

}
