import { TrpComponent } from './trp/trp.component';
import { ApplicationComponent } from './application/application.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ChartNbVenduComponent } from './MyCharts/MarcheCharts/chart-nb-vendu/chart-nb-vendu.component';
import { ChartPrixExpComponent } from './MyCharts/MarcheCharts/chart-prix-exp/chart-prix-exp.component';
import { PerimetreTaxeComponent } from './MyCharts/FiscaliteCharts/perimetre-taxe/perimetre-taxe.component';
import { PerimetreRentableComponent } from './MyCharts/FiscaliteCharts/perimetre-rentable/perimetre-rentable.component';
import { QteProduiteTemperatureComponent } from './MyCharts/ProductionCharts/qte-produite-temperature/qte-produite-temperature.component';
import { QteProduitePerimetreComponent } from './MyCharts/ProductionCharts/qte-produite-perimetre/qte-produite-perimetre.component';
import { QteProduiteProduitComponent } from './MyCharts/ProductionCharts/qte-produite-produit/qte-produite-produit.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';




import { BodyComponent } from './components/body/body.component';
import { CalculComponent } from './components/calcul/calcul.component';
import { RedevanceComponent } from './components/redevance/redevance.component';

import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { StatistiqueComponent } from './components/statistique/statistique.component';
import { DataUpdateComponent } from './components/data-update/data-update.component';
import { DataMonthComponent } from './components/data-month/data-month.component';
import { DataYearComponent } from './components/data-year/data-year.component';
import { MyheaderComponent } from './components/myheader/myheader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MybuttonComponent } from './components/mybutton/mybutton.component';
import { LastUpdateComponent } from './components/last-update/last-update.component';
import { PopupRdvComponent } from './PopUps/popup-rdv/popup-rdv.component';
import { PopupTrpComponent } from './PopUps/popup-trp/popup-trp.component';
import { PopupBilanComponent } from './PopUps/popup-bilan/popup-bilan.component';
import { PopupPrixExpComponent } from './PopUps/Month/popup-prix-exp/popup-prix-exp.component';
import { PopupTauxChComponent } from './PopUps/Month/popup-taux-ch/popup-taux-ch.component';
import { PopupQteprodComponent } from './PopUps/Month/popup-qteprod/popup-qteprod.component';
import { PopupP1defComponent } from './PopUps/Month/popup-p1def/popup-p1def.component';
import { PopupP1provComponent } from './PopUps/Month/popup-p1prov/popup-p1prov.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { PopupCoutFComponent } from './PopUps/Year/popup-cout-f/popup-cout-f.component';
import { PopupPrixMNComponent } from './PopUps/Year/popup-prix-mn/popup-prix-mn.component';
import { PopupInvstComponent } from './PopUps/Year/popup-invst/popup-invst.component';
import { PopupTarifTransComponent } from './PopUps/Year/popup-tarif-trans/popup-tarif-trans.component';
import { DataInvstComponent } from './components/data-invst/data-invst.component';
import { PopupPrevisionsAnnuellesComponent } from './PopUps/Invst/popup-previsions-annuelles/popup-previsions-annuelles.component';
import { PopupImposRemuComponent } from './PopUps/Invst/popup-impos-remu/popup-impos-remu.component';
import { PopupQteGazComponent } from './PopUps/Invst/popup-qte-gaz/popup-qte-gaz.component';
import { PopupRemunerationComponent } from './PopUps/Invst/popup-remuneration/popup-remuneration.component';
import { ChartModule } from 'primeng/chart';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';

import { AnalyseMarcheMondialComponent } from './components/analyse-marche-mondial/analyse-marche-mondial.component';

import { LoginComponent } from './login/login.component';
import { AuthenticationInterceptor } from './Interceptor';
import { SubscribtionComponent } from './components/subscribtion/subscribtion.component';
import { TopcinqPerimComponent } from './topcinq-perim/topcinq-perim.component';
import { AccesDeniedComponent } from './acces-denied/acces-denied.component';


@NgModule({
  declarations: [
    AppComponent,
    
    SidebarComponent,
    BodyComponent,
    CalculComponent,
    RedevanceComponent,
    AcceuilComponent,
    StatistiqueComponent,
    DataUpdateComponent,
    DataMonthComponent,
    DataYearComponent,
    MyheaderComponent,
    MybuttonComponent,
    LastUpdateComponent,
    PopupRdvComponent,
    PopupTrpComponent,
    PopupBilanComponent,
    PopupPrixExpComponent,
    PopupTauxChComponent,
    PopupQteprodComponent,
    PopupP1defComponent,
    PopupP1provComponent,
    PopupCoutFComponent,
    PopupPrixMNComponent,
    PopupInvstComponent,
    PopupTarifTransComponent,
    DataInvstComponent,
    PopupPrevisionsAnnuellesComponent,
    PopupImposRemuComponent,
    PopupQteGazComponent,
    PopupRemunerationComponent,
    QteProduiteProduitComponent,
    QteProduitePerimetreComponent,
    QteProduiteTemperatureComponent,
    PerimetreRentableComponent,
    PerimetreTaxeComponent,
    
    AnalyseMarcheMondialComponent,
    ChartPrixExpComponent,
    ChartNbVenduComponent,
    LoginComponent,
    
    NotFoundComponent,
    ApplicationComponent,
    TrpComponent,
    SubscribtionComponent,
    TopcinqPerimComponent,
    AccesDeniedComponent,

    

   

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartModule,
    CalendarModule,
    BrowserAnimationsModule, // Required for PrimeNG
    RouterModule.forRoot([
    ]),
    FontAwesomeModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi:true

  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
