import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecruteurService } from '../Services/recruteur.service';
import { StorageService } from '../Services/storage.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-recruteurs',
  templateUrl: './recruteurs.component.html',
  styleUrls: ['./recruteurs.component.scss']
})
export class RecruteursComponent implements OnInit {
  searhText:any
  responsive=true
  p:number=1
  unrecruteur:any;
  idrecruteur:any;
  nomentreprise:any;
 // message:any
  secteur:any
  photoentreprise:any
  passwordadmin:any
  adresseentreprise:any
  emailentreprise:any
  passwordentreprise:any
  recruteurdata:any
  messagee!: string
  erreur!: boolean
  
  fichier:any
  Recruteurs: any = [];


  constructor(
    private route:ActivatedRoute,
    private servrecr:RecruteurService,
    private storageService:StorageService,
    private router:Router) { }
    ngOnInit(): void {
      //this.currentUser = this.storageService.getUser;
      this.idrecruteur= this.storageService.getUser();
  
      this.servrecr.getrecruteurbyid(this.idrecruteur.id).subscribe(data=>{
        this.unrecruteur= data;
        //this.nomdemandeur= this.undemandeur.nomdemandeur
      })
  
      this.servrecr.getrecruteur().subscribe(data => {
  
        this.unrecruteur = data
        console.log(this.unrecruteur)
      }
      )
    }

    add(){
      //console.log(this.nomposte)
      var recruteur=[{
        "nomentreprise":this.nomentreprise,
        "secteur":this.secteur,
        "adresseentreprise":this.adresseentreprise,
        "emailentreprise":this.emailentreprise,
        //"message":this.message,
        "photoentreprise":'',
        "passwordentreprise":this.passwordentreprise,
       //"role":this.role,
  
      }] 
      
      const data=new FormData
      data.append('image',this.fichier)
      data.append('recruteur', JSON.stringify(recruteur).slice(1,JSON.stringify(recruteur).lastIndexOf(']')));
      console.log("mes donnees avant",recruteur);
      this.servrecr.recruteurregister(recruteur,this.fichier).subscribe(data=>{
        this.recruteurdata=data

        console.log(recruteur)
      })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Recruteur ajouté avec succès',
        showConfirmButton: false,
        timer: 1500,
        heightAuto:false
      })
      this.formreset()
    }
    
    selectFile(e:any){
      //verification si une photo a été choisie ou pas
      if(!e.target.files[0] || e.target.files[0].length==0){
        this.messagee="Vous devez choisir un fichier  !";
        this.erreur=true;
        return;
      }
  
      //verification du type de fichier choisi pour recaler si ce n'est pas une photo
      var typeFichier=e.target.files[0].type;
      if(e.target.files){
        var reader= new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=(event:any)=>{
          this.messagee="";
          //this.fichier=event.target.result;
          this.fichier=e.target['files'][0];
        }
      }
    }


      ionViewDidEnter() {
        this.servrecr.getrecruteur().subscribe((response) => {
          this.Recruteurs = response;
        })
      }
    
      removeRecruteur(idrecruteur:number) {
        
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
            
          this.servrecr.deleterecruteur(idrecruteur)
          
          .subscribe(() => {
              this.ionViewDidEnter();
             // console.log('Recruteur deleted!')
              
            }
          )
            Swal.fire(
              'Supprimé !',
              'Le recruteur a été supprimé.',
              'success'
            )
          }
        })
          //window.location.reload();
        
      }
      reloadPage(): void {
        window.location.reload();
      }

      formreset(){
        this.nomentreprise='',
        this.secteur= '',
        this.photoentreprise='',
        this.adresseentreprise='',
        this.emailentreprise='',
        this.passwordentreprise=''
      }

  }