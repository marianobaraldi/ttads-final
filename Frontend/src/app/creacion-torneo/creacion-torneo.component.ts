import { Component, OnInit, Inject, ViewContainerRef, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import{ LoaderFechas } from '../loader-fechas.service'
import { MuestraFechasComponent } from '../muestra-fechas/muestra-fechas.component';

@Component({
  selector: 'app-creacion-torneo',
  templateUrl: './creacion-torneo.component.html',
  styleUrls: ['./creacion-torneo.component.css']
})
export class CreacionTorneoComponent implements OnInit {
  urlEquipos: string = 'http://localhost:3000/api/equipos/';  
  torneo;torneoDev;
  equipos;
  equiposElegidosArray: Array<any> = [];
  serviceLoader;
  
  @ViewChild('dynamic', { 
    read: ViewContainerRef 
  }) viewContainerRef: ViewContainerRef
  

  constructor(private http: HttpClient,
    @Inject(LoaderFechas) service){
      this.serviceLoader = service
     }


  ngOnInit() {    
    this.getEquipos();
    
    this.serviceLoader.setRootViewContainerRef(this.viewContainerRef);
  }

  getEquipos(){
    this.http.get(this.urlEquipos).subscribe(data => {
      this.equipos = data;
    });
  }

  onChange(equipo:any, isChecked: boolean) {
    if(isChecked) {
      this.equiposElegidosArray.push(equipo);
    } else {
      let index = this.equiposElegidosArray.indexOf(equipo);
      this.equiposElegidosArray.splice(index,1);
    }
}

clickOnTournamentButton(){

  this.generaTorneo();
  this.viewContainerRef.clear();
  this.serviceLoader.addDynamicComponent();
  this.serviceLoader.componentRef.instance.torneo = this.torneo;
}

  generaTorneo(){
    var equipos = this.equiposElegidosArray;
    //mezcla los elementos
    equipos = equipos.map(a => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map(a => a[1]);
    var cantFechas = equipos.length-1;
    var fechas = []; //torneo final, arreglo de fechas
    var f = [];  //una fecha 

    //Metodo ROUND-ROBIN
    //https://stackoverflow.com/questions/6648512/scheduling-algorithm-for-a-round-robin-tournament

    //cargo mitad del arreglo en upper y mitad en lower (y revierto el lower)
    var upper = equipos.filter((_,i) => i % 2 == 0);
    var lower = equipos.filter((_,i) => i % 2 == 1);
    lower = lower.reverse();

    //arma primera fecha emparejando los elementos de upper y lower
    fechas.push(upper.map((e, i) => [e, lower[i]]));

    
    for (var i = 0; i < cantFechas-1; i++) {    //resto de las fechas      
      //lo guardo como array para
      var lastUpper = upper.slice(upper.length-1,upper.length);      
      
      //El primer elemento de upper se queda, sube el primero del lower, y el resto de upper se corren para la derecha (se pierde el ultimo)
      upper = upper.slice(0,1).concat(lower.slice(0,1)).concat(upper.slice(1,upper.length-1));
       //Todos los elementos de lower se corren para la izquierda (se pierde el primero), y entra al final el ultimo de upper
      lower = lower.slice(1,lower.length).concat(lastUpper)

      //arma fecha pares de equipos
      fechas.push(upper.map((e, i) => [e, lower[i]]));
    }
    this.torneo = fechas.map(f =>  f.map(p => p.map(e => e.url)));    
    
  }



}
