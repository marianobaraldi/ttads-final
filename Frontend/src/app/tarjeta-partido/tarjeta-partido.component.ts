import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-partido',
  templateUrl: './tarjeta-partido.component.html',
  styleUrls: ['./tarjeta-partido.component.css']
})
export class TarjetaPartidoComponent implements OnInit {

  @Input() partido;

  constructor() { }

  ngOnInit() {
  }

}
