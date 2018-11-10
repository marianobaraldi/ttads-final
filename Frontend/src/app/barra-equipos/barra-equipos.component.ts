import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-barra-equipos',
  templateUrl: './barra-equipos.component.html',
  styleUrls: ['./barra-equipos.component.css']
})
export class BarraEquiposComponent implements OnInit {
  urlEquipos: string = 'http://localhost:3000/api/equipos/';  
  equipos;

  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.http.get(this.urlEquipos).subscribe(data => {
      this.equipos = data;
    });
  }

}
