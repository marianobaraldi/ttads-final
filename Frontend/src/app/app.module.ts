import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { PartidosComponent } from './partidos/partidos.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DetallePartidoComponent } from './detalle-partido/detalle-partido.component';
import { RouterModule }   from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from "@angular/http";
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { CreacionTorneoComponent } from './creacion-torneo/creacion-torneo.component';
import { MuestraFechasComponent } from './muestra-fechas/muestra-fechas.component';
import { LoaderFechas } from './loader-fechas.service'
import {CarouselModule} from "angular2-carousel";
import { TarjetaPartidoComponent } from './tarjeta-partido/tarjeta-partido.component';

@NgModule({
  declarations: [
    AppComponent,
    PartidosComponent,
    FooterComponent,
    HeaderComponent,
    DetallePartidoComponent,
    MyDashboardComponent,
    CreacionTorneoComponent,
    MuestraFechasComponent,
    TarjetaPartidoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    CarouselModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'detalle/:id',
        component: DetallePartidoComponent
      },
      {
        path: '',
        redirectTo: '/principal',
        pathMatch: 'full'
      },
      {
        path: 'principal',
        component: MyDashboardComponent
      },
      {
        path: 'nuevo-torneo',
        component: CreacionTorneoComponent
      }
    ])
  ],
  providers: [LoaderFechas],
  bootstrap: [AppComponent],
  entryComponents: [MuestraFechasComponent]
})
export class AppModule { }
