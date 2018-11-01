import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-muestra-fechas',
  templateUrl: './muestra-fechas.component.html',
  styleUrls: ['./muestra-fechas.component.css']
})
export class MuestraFechasComponent implements OnInit {

  torneo: Array<any>;

  constructor() { }

  ngOnInit() {
  }

}
