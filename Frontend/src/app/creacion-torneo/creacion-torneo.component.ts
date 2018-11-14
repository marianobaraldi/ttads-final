import { Component, OnInit, Inject, ViewContainerRef, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import{ LoaderFechas } from '../loader-fechas.service'
import { Torneo } from '../models/torneo';
import { Fecha } from '../models/fecha';
import { Partido } from '../models/partido';

@Component({
  selector: 'app-creacion-torneo',
  templateUrl: './creacion-torneo.component.html',
  styleUrls: ['./creacion-torneo.component.css']
})
export class CreacionTorneoComponent implements OnInit {
  urlEquipos: string = 'http://localhost:3000/api/equipos/';  
  // torneoArray;
  torneo : Torneo;
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
  // this.serviceLoader.componentRef.instance.torneo = this.torneoArray;
  this.serviceLoader.componentRef.instance.torneo = this.torneo;
}

  generaTorneo(){
    var equipos = this.equiposElegidosArray;
    //mezcla los elementos
    equipos = equipos.map(a => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map(a => a[1]);
    var cantFechas = equipos.length-1;
  //  var fechasArray = []; //torneo final, arreglo de fechas
  //  var f = [];  //una fecha 
    var fechas : Fecha[] = [];
    var fe: Fecha;
    var partido : Partido;
    var fechaHora = new Date();

    //Metodo ROUND-ROBIN
    //https://stackoverflow.com/questions/6648512/scheduling-algorithm-for-a-round-robin-tournament

    //cargo mitad del arreglo en upper y mitad en lower (y revierto el lower)
    var upper = equipos.filter((_,i) => i % 2 == 0);
    var lower = equipos.filter((_,i) => i % 2 == 1);
    lower = lower.reverse();
    
    //arma primera fecha emparejando los elementos de upper y lower
    // fechasArray.push(upper.map((e, i) => [e, lower[i]]));
    fechas.push(fe = {
      numero: 1,
      partidos:      
        upper.map((e, i) => partido = {
                                      fecha_hora: JSON.parse(JSON.stringify(fechaHora)), //Esto es para que copie EL VALOR de la variable, si no lo hago asi copia la referencia y no me sirve
                                      equipo_local: e,
                                      equipo_visitante: lower[i],
                                      eventos: []
        })
      });
    
    for (var i = 1; i < cantFechas; i++) {    //resto de las fechas      
      //lo guardo como array para
      var lastUpper = upper.slice(upper.length-1,upper.length);      
      
      //El primer elemento de upper se queda, sube el primero del lower, y el resto de upper se corren para la derecha (se pierde el ultimo)
      upper = upper.slice(0,1).concat(lower.slice(0,1)).concat(upper.slice(1,upper.length-1));
       //Todos los elementos de lower se corren para la izquierda (se pierde el primero), y entra al final el ultimo de upper
      lower = lower.slice(1,lower.length).concat(lastUpper)

      //la fecha_hora del partido va a ser +1 semana cada fecha
      fechaHora.setDate(fechaHora.getDate() + 7);

      //arma fecha pares de equipos
      // fechasArray.push(upper.map((e, i) => [e, lower[i]]));
      fechas.push(fe = {
        numero: i+1,  //i+1 porque arranca de la "Fecha 1"
        partidos:      
          upper.map((e, i) => partido = {
                                        fecha_hora: JSON.parse(JSON.stringify(fechaHora)),  //Esto es para que copie EL VALOR de la variable, si no lo hago asi copia la referencia y no me sirve
                                        equipo_local: e,
                                        equipo_visitante: lower[i],
                                        eventos: []
          })
        });

    }
    // this.torneoArray = fechasArray.map(f =>  f.map(p => p));   
    this.torneo = {
      nombre: "Torneo"+new Date().getTime(),
      fechas: fechas
    } 
    console.log("Torneo preview: ");
    console.log(this.torneo);
    
  }



}
