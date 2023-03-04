import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../Services/admin.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  searhText:any
  responsive=true
  p:number=1
  unadmin: any;
  idadmin: any;
  nomadmin:any
  prenomadmin:any
  emailadmin:any
  passwordadmin:any
  photoadmin:any
  admindata:any
  message!: string
  erreur!: boolean
  image: any
  fichier:any
  Admins: any = [];

  constructor(private route:ActivatedRoute,private servAdmin:AdminService,private storageService:StorageService,private router:Router) { }

  ngOnInit(): void {
    //this.currentUser = this.storageService.getUser;
    this.idadmin= this.storageService.getUser();

    this.servAdmin.getadminbyid(this.idadmin.id).subscribe(data=>{
      this.unadmin= data;
      //this.nomdemandeur= this.undemandeur.nomdemandeur
    })

    this.servAdmin.getadmin().subscribe(data => {

      this.unadmin = data
      console.log(this.unadmin)
    }
    )
  }

  add(){
    //console.log(this.nomposte)
    var admin=[{
      "nomadmin":this.nomadmin,
      "prenomadmin":this.prenomadmin,
      "emailadmin":this.emailadmin,
      "photoadmin":"",
      "passwordadmin":this.passwordadmin,
     //"role":this.role,

    }] 
    const data=new FormData
    data.append('image',this.fichier)
    data.append('admin', JSON.stringify(admin).slice(1,JSON.stringify(admin).lastIndexOf(']')));
    console.log("mes donnees avant",admin);
    this.servAdmin.adminregister(admin,this.fichier).subscribe(data=>{
      this.admindata=data
      console.log(admin)
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Admin ajouté avec succès',
      showConfirmButton: false,
      timer: 1500,
      heightAuto:false
    })
    this.formreset()
  }
  
  selectFile(e:any){
    //verification si une photo a été choisie ou pas
    if(!e.target.files[0] || e.target.files[0].length==0){
      this.message="Vous devez choisir un fichier  !";
      this.erreur=true;
      return;
    }

    //verification du type de fichier choisi pour recaler si ce n'est pas une photo
    var typeFichier=e.target.files[0].type;
    if(e.target.files){
      var reader= new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.message="";
        //this.fichier=event.target.result;
        this.fichier=e.target['files'][0];
      }
    }
  }

  ionViewDidEnter() {
    this.servAdmin.getadmin().subscribe((response) => {
      this.Admins = response;
    })
  }
  removeAdmin(idadmin:number) {
    Swal.fire({
      title: 'Etes vous sure?',
      text: "Vous ne pourrez pas revenir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.servAdmin.deleteadmin(idadmin)
      
      .subscribe(() => {
          this.ionViewDidEnter();
         // console.log('Recruteur deleted!')
          
        }
      )
        Swal.fire(
          'Supprimé !',
          'Admin a été supprimé.',
          'success'
        )
      }
    })


}
reloadPage(): void {
  window.location.reload();
}

formreset(){
  this.nomadmin="",
  this.passwordadmin="",
  this.emailadmin="",
  this.prenomadmin="",
  this.photoadmin=""
}

}
