import { Component, OnInit, Input } from '@angular/core';
import { Torneo } from '../models/torneo';
import { Partido } from '../models/partido';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-tarjeta-torneo',
  templateUrl: './tarjeta-torneo.component.html',
  styleUrls: ['./tarjeta-torneo.component.css']
})
export class TarjetaTorneoComponent implements OnInit {
  urlTorneos: string = 'http://localhost:3000/api/torneos/';  

  @Input() torneo;
  partidoDestacado : Partido;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.partidoDestacado = this.torneo.fechas[0].partidos[0];
  }

  eliminarTorneo(){
    console.log(this.torneo);
    this.http.delete<Torneo>(this.urlTorneos+this.torneo._id).subscribe(
      res => {
        console.log(res);
        window.location.reload();
      },err => {
        console.log(err);
        window.location.reload();
      }
    );
  }
}
