import { Component, OnInit } from '@angular/core';
import { DemandeurService } from '../Services/demandeur.service';

@Component({
  selector: 'app-demandeurs',
  templateUrl: './demandeurs.component.html',
  styleUrls: ['./demandeurs.component.scss']
})
export class DemandeursComponent implements OnInit {
  searhText:any
  responsive=true
  p:number=1
  iddemandeur!:number
  nomDemandeur:any
  prenomDemandeur:any
  adresseDemandeur: any
  ageDemandeur:any
  emailDemandeur:any
  cv:any
  //retour:any
  dossierDemandeur:any
  profilDemandeur:any
  photodemandeur:any
  passwordDemandeur: any
  //role:any
  demandeurdata:any
  message!: string
  erreur!: boolean
  file: any
  image: any
  undemandeur:any
  Demandeurs: any = [];
  constructor(private demandeurserv:DemandeurService){ }

  ngOnInit() {
    this.demandeurserv.getdemandeur().subscribe(data => {

      this.undemandeur = data
      console.log(this.undemandeur)
    }
    )
  }

  add(){
    //console.log(this.nomposte)
    var demandeur=[{
      "nomDemandeur":this.nomDemandeur,
      "prenomDemandeur":this.prenomDemandeur,
      "adresseDemandeur":this.adresseDemandeur,
      "ageDemandeur":this.ageDemandeur,
      "emailDemandeur":this.emailDemandeur,
      "cv":"",
      //"retour":this.retour,
      "dossierDemandeur":"",
      "profilDemandeur":this.profilDemandeur,
      "photoDemandeur":"",
      "passwordDemandeur":this.passwordDemandeur,
     //"role":this.role,

    }] 
    const data=new FormData
    data.append('image',this.image)
    data.append('cv',this.cv)
    data.append('dossierDemandeur',this.dossierDemandeur)
    data.append('demandeur', JSON.stringify(demandeur).slice(1,JSON.stringify(demandeur).lastIndexOf(']')));
    console.log("mes donnees avant",demandeur);
    this.demandeurserv.demandeurregister(demandeur,this.image,this.dossierDemandeur,this.cv).subscribe(data=>{
      this.demandeurdata=data
      console.log(demandeur)
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
        this.image=e.target['files'][0];
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
        this.dossierDemandeur=e.target['files'][0];
        console.log(this.dossierDemandeur);
      }
    }

    //verification du type de fichier choisi pour recaler si ce n'est pas une photo
    var typeFichier=e.target.files[0].type;
    if(e.target.files){
      var reader= new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.message="";
        //this.fichier=event.target.result;
        this.cv=e.target['files'][0];
        console.log(this.cv);
      }
    }
  }

  ionViewDidEnter() {
    this.demandeurserv.getdemandeur().subscribe((response) => {
      this.Demandeurs = response;
    })
  }

  removeDemandeur(iddemandeur:number) {
    if (window.confirm('Etes-vous sure de vouloir supprimé ?')) {
      this.demandeurserv.deletedemandeur(iddemandeur)
      
      .subscribe(() => {
          this.ionViewDidEnter();
          console.log('User deleted!')
          
        }
      )
      window.location.reload();
    }
  }
  reloadPage(): void {
    window.location.reload();
  }

}
