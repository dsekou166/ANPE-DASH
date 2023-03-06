import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../Services/annonce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searhText:any
  responsive=true
  p:number=1
  nomposte:any
  typecontrat:any
  experience: any
  lieu:any
  datedebut:any
  datefin:any
  descriptionannonce:any
  profil:any
  photo:any
  dossierannonce:any
  annoncedata: any;
  message!: string;
  erreur!: boolean;
  fichier: any;
  dossier: any;
  uneannonce: any;
  Annonces:any = [];
  idannonce!:number
  
  constructor(private annonceserv:AnnonceService) { }

  ngOnInit() {

    this.annonceserv.getannonce().subscribe(data => {

      this.uneannonce = data
      console.log(this.uneannonce)
    }
    )
  }

  add(){
    console.log(this.nomposte)
    var annonce=[{
      "nomposte":this.nomposte,
      "typecontrat":this.typecontrat,
      "photo":'',
      "profil":this.profil,
      "descriptionannonce":this.descriptionannonce,
      "datedebut":this.datedebut,
      "datefin":this.datefin,
      "lieu":this.lieu,
      "dossierannonce":'',
      "experience":this.experience,
  
    }] 
    const data=new FormData
    data.append('file',this.fichier)
    data.append('dossier',this.dossier)
    data.append('annonce', JSON.stringify(annonce).slice(1,JSON.stringify(annonce).lastIndexOf(']')));
    console.log("mes donnees avant",annonce);
    this.annonceserv.creerannonce(this.nomposte,annonce,this.fichier,this.dossier).subscribe(data=>{
      this.annoncedata=data
      console.log(this.annoncedata)
    })
    /*window.location.reload();*/
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
  selectdoc(e:any){
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
        this.dossier=e.target['files'][0];
        console.log(this.dossier);
      }
    }
  }
  ionViewDidEnter() {
    this.annonceserv.getannonce().subscribe((response) => {
      this.Annonces = response;
    })
  }

  removeAnnonce(idannonce:number) {
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
        
        this.annonceserv.deleteannonce(idannonce)
      
      .subscribe(() => {
          this.ionViewDidEnter();
         // console.log('Recruteur deleted!')
          
        }
      )
        Swal.fire(
          'Supprimé !',
          'Annonce a été supprimé.',
          'success'
        )
      }
    })


}
  reloadPage(): void {
    window.location.reload();
  }


}

