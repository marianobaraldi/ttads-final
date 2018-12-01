import { Component, OnInit, Input } from '@angular/core';
import { Torneo } from '../models/torneo';
import { Partido } from '../models/partido';

@Component({
  selector: 'app-tarjeta-torneo',
  templateUrl: './tarjeta-torneo.component.html',
  styleUrls: ['./tarjeta-torneo.component.css']
})
export class TarjetaTorneoComponent implements OnInit {

  @Input() torneo: Torneo;
  partidoDestacado : Partido;

  constructor() { }

  ngOnInit() {
    this.partidoDestacado = this.torneo.fechas[0].partidos[0];
  }

}
