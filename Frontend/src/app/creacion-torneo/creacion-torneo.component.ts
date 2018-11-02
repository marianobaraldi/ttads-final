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
    equipos = this.shuffle(equipos);
    var cantFechas = equipos.length-1;
    var fechas = []; //torneo final, arreglo de fechas
    var f = [];  //una fecha 
    //Metodo ROUND-ROBIN
    //https://stackoverflow.com/questions/6648512/scheduling-algorithm-for-a-round-robin-tournament
    var upper = [];
    var lower = [];

    //cargo mitad del arreglo en upper y mitad en lower (y revierto el lower)
    upper = equipos.filter((_,i) => i % 2 == 0)
    lower = equipos.filter((_,i) => i % 2 == 1)
    lower = lower.reverse();

    f =  upper.map((e, i) => [e, lower[i]]); //armo primera fecha pares de equipos
    fechas.push(f);

    
    for (var i = 0; i < cantFechas-1; i++) {    //resto de las fechas
      var lastUpper = upper [upper.length-1]
      upper = this.armaUpper(upper,lower[0]);
      lower = this.armaLower(lower,lastUpper);  

      //arma fecha pares de equipos
      f = upper.map((e, i) => [e, lower[i]]);
      fechas.push(f);
    }
    this.torneo = fechas.map(f =>  f.map(p => p.map(e => e.url)));
    
  }

  //El primer elemento de upper se queda, sube el primero del lower, y el resto de upper se corren para la derecha (se pierde el ultimo)
  armaUpper(upper, firstLower){
    var res = [];
    res[0] = upper[0];
    res[1] = firstLower;
    for (var i = 1; i < upper.length-1; i++) {
      res[i+1] = upper[i]; 
    }
    return res;
  }

  //Todos los elementos de lower se corren para la izquierda (se pierde el primero), y entra al final el ultimo de upper
  armaLower(lower, lastUpper){
    var res = [];
    for (var i = 0; i < lower.length-1; i++) {
      res[i] = lower[i+1];
    }
    res[lower.length-1] = lastUpper;
    return res;
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

}
