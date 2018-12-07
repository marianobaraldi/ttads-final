import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreacionTorneoComponent } from './creacion-torneo/creacion-torneo.component';
import { MuestraFechasComponent } from './muestra-fechas/muestra-fechas.component';
import { AuthGuard } from '../guards/auth.guard';
import { FormsModule } from '@angular/forms';
import {CarouselModule} from "angular2-carousel";
import { LoaderFechas } from '../loader-fechas.service'
import { PartidoFechaComponent } from './partido-fecha/partido-fecha.component'


const routes: Routes = [
  { path: 'internal', canActivate: [AuthGuard],
    children: [
      { path: 'creacion-torneo', component: CreacionTorneoComponent }
    ]
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
    PartidoFechaComponent
  ],
  exports: [RouterModule],
  providers: [LoaderFechas],
  entryComponents: [MuestraFechasComponent]
})
export class InternalModule { }
