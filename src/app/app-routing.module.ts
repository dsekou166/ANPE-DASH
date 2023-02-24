import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemandeursComponent } from './demandeurs/demandeurs.component';
import { RecruteursComponent } from './recruteurs/recruteurs.component';
import { RecruteurService } from './Services/recruteur.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'connexion', pathMatch: 'full'
  },
  { path: 'connexion', component: ConnexionComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'recruteurs', component: RecruteursComponent},
  { path: 'demandeurs', component: DemandeursComponent},
  { path: 'admin', component: AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
