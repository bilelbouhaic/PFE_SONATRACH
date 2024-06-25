import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StatistiqueComponent } from './components/statistique/statistique.component';
import { ApplicationComponent } from './application/application.component';
import { CalculComponent } from './components/calcul/calcul.component';
import { AnalyseMarcheMondialComponent } from './components/analyse-marche-mondial/analyse-marche-mondial.component';
import { RedevanceComponent } from './components/redevance/redevance.component';
import { DataUpdateComponent } from './components/data-update/data-update.component';
import { DataMonthComponent } from './components/data-month/data-month.component';
import { DataYearComponent } from './components/data-year/data-year.component';
import { DataInvstComponent } from './components/data-invst/data-invst.component';
import { AuthGuard } from './guards/auth.guard';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { TrpComponent } from './trp/trp.component';
import { SubscribtionComponent } from './components/subscribtion/subscribtion.component';
import { RoleGuard } from './guards/autorisation.guard';
import { AccesDeniedComponent } from './acces-denied/acces-denied.component';


const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'login/Subscribe',component: SubscribtionComponent},
  
  {
    path: 'Application',
    component: ApplicationComponent,
    canActivate:[AuthGuard],
    children: [
      { path: 'Acceuil', component: AcceuilComponent ,canActivate: [RoleGuard],  data: { roles: ['Admin'] }  },
      { path: 'Statistique', component: StatistiqueComponent, canActivate: [RoleGuard],  data: { roles: ['Admin'] }  },
      { path: 'AjoutCompte', component: SubscribtionComponent , canActivate: [RoleGuard],  data: { roles: ['Admin'] } },
      { path: 'Calcul', component: CalculComponent },
      { path: 'Update', component: DataUpdateComponent },
      { path: 'Month', component: DataMonthComponent },
      { path: 'Year', component: DataYearComponent },
      { path: 'Investissement', component: DataInvstComponent },
      { path: 'Update', component: DataUpdateComponent },
      { path: 'Redevance', component: RedevanceComponent },
      { path: 'Trp', component: TrpComponent },
      { path: 'Analyse', component: AnalyseMarcheMondialComponent ,canActivate: [RoleGuard],  data: { roles: ['Admin'] } },
      { path: 'Acces', component: AccesDeniedComponent  },
      
    
    ],
  
  },

  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'**',component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
