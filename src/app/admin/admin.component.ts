import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route:ActivatedRoute,private servdemd:AdminService,private storageService:StorageService,private router:Router) { }

  ngOnInit(): void {
    //this.currentUser = this.storageService.getUser;
    this.idadmin= this.storageService.getUser();

    this.servdemd.getadminbyid(this.idadmin.id).subscribe(data=>{
      this.unadmin= data;
      //this.nomdemandeur= this.undemandeur.nomdemandeur
    })

    this.servdemd.getadmin().subscribe(data => {

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
    this.servdemd.adminregister(admin,this.fichier).subscribe(data=>{
      this.admindata=data
      console.log(admin)
    })
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
}
