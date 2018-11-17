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
import { BarraEquiposComponent } from './barra-equipos/barra-equipos.component';
import { SocialLoginModule,AuthServiceConfig,GoogleLoginProvider } from "angular4-social-login";
import { FormsModule } from '@angular/forms';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("656512028146-pdharlfe2docln6afq78i6gqurpbomac.apps.googleusercontent.com")
  }
]);

export function provideConfig() {
  return config;
}

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
    TarjetaPartidoComponent,
    BarraEquiposComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    CarouselModule,
    SocialLoginModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'partidos/:id',
        component: PartidosComponent
      },
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
        path: 'principal/:test',
        component: MyDashboardComponent
      },
      {
        path: 'nuevo-torneo',
        component: CreacionTorneoComponent
      }
    ])
  ],
  providers: [LoaderFechas,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
    ],
  bootstrap: [AppComponent],
  entryComponents: [MuestraFechasComponent]
})
export class AppModule { }
