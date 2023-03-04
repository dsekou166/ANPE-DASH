
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  nomadmin:any
  unadmin: any;
  idadmin: any;
  emailadmin:any;
  passwordadmin:any;

  constructor(
    private admin:AdminService,
    private storage:StorageService,
    private router:Router
  ){}
  ngOnInit(): void {
   
      //this.currentUser = this.storageService.getUser;
      this.idadmin= this.storage.getUser();
  
      this.admin.getadminbyid(this.idadmin.id).subscribe(data=>{
        this.unadmin= data;
        //this.nomdemandeur= this.undemandeur.nomdemandeur
       
        
      })
    }
  

  logout(): void {
    this.admin.logoutadmin().subscribe({
      next: res => {
        console.log(res);
        this.storage.clean();
        this.router.navigateByUrl("/connexion")
        this.formreset()
        //window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  formreset(){
   
    this.emailadmin="",
    this.passwordadmin=""
  }

}
