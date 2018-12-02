import { Component, OnInit, Input } from '@angular/core';
import { Partido } from '../models/partido';

@Component({
  selector: 'app-tarjeta-partido',
  templateUrl: './tarjeta-partido.component.html',
  styleUrls: ['./tarjeta-partido.component.css']
})
export class TarjetaPartidoComponent implements OnInit {

  @Input() partido: Partido;

  constructor() { }

  ngOnInit() {
  }

}
