import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Torneo } from '../../models/torneo';
import {Router} from "@angular/router"


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'})
}

@Component({
  selector: 'app-muestra-fechas',
  templateUrl: './muestra-fechas.component.html',
  styleUrls: ['./muestra-fechas.component.css']
})


export class MuestraFechasComponent implements OnInit {
  urlTorneos: string = 'http://localhost:3000/api/torneos/';  
  torneo: Torneo;
  respuesta;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  confirmarTorneo(){
    console.log("Confirmando torneo...");
    
    console.log(JSON.stringify(this.torneo));
    this.http.post<Torneo>(this.urlTorneos, this.torneo, httpOptions ).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/']);
      },err => {
        console.log(err);
        this.router.navigate(['/']);
      }
    );
  }
  
}