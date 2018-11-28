import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreacionTorneoComponent } from './creacion-torneo/creacion-torneo.component';
import { MuestraFechasComponent } from './muestra-fechas/muestra-fechas.component';
import { TarjetaPartidoComponent } from './tarjeta-partido/tarjeta-partido.component';
import { TarjetaTorneoComponent } from './tarjeta-torneo/tarjeta-torneo.component';
import { AuthGuard } from '../guards/auth.guard';
import { FormsModule } from '@angular/forms';
import {CarouselModule} from "angular2-carousel";
import { LoaderFechas } from '../loader-fechas.service'


const routes: Routes = [
  {         
        path: '',
        component: CreacionTorneoComponent,
        canActivate: [AuthGuard]   
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CreacionTorneoComponent,
    MuestraFechasComponent,
    TarjetaPartidoComponent,
    TarjetaTorneoComponent
  ],
  exports: [RouterModule],
  providers: [LoaderFechas],
  entryComponents: [MuestraFechasComponent]
})
export class InternalModule { }
