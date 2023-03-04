import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  passwordadmin:any
  emailadmin:any
  form: any = {
    emailadmin: null,
    passwordadmin: null
};
isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];


constructor(
  private storage: StorageService,
  private router:Router,
  private admin:AdminService,
 


){}
ngOnInit(): void{
  if (this.storage.isLoggedIn()) {
    this.isLoggedIn = true;
    this.roles = this.storage.getUser().roles;
    
  }
}
/*async errorToast() {
  let toast = this.toast.create({
    message: 'Email ou mots de passe incorrectes',
    duration: 3000,
    color:'danger',
    position: 'bottom'
  });
  (await toast).present();
}*/

onSubmit(): void {
  const { emailadmin, passwordadmin } = this.form;
  this.admin.loginadmin(emailadmin, passwordadmin).subscribe({
    next: data => {
      this.storage.saveUser(data);
      this.router.navigateByUrl('/dashboard')
      this.formreset()
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.storage.getUser().roles;
    },
   /* error: err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
      if(err.error.error=="Unauthorized"){
        this.errorToast()
      }
    }*/
  });
}

reloadPage(): void {
  window.location.reload();
}
formreset(){
   
  this.emailadmin="",
  this.passwordadmin=""
}
}
