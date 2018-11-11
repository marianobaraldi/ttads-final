import { Component, OnInit, Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent implements OnInit {

  urlActivos: string = 'http://localhost:3000/api/partidos/';
  partidos;
  mensaje;
 
  @Input() id_equipo: String;

  constructor(private http: HttpClient,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {   //recibir params
      this.partidos = [];
      this.mensaje = "";
       this.http.get(this.urlActivos+params['id']).subscribe(data => {  //traer json
        this.partidos = data;},
        error => this.mensaje = error.error.text
        );
  });
  }
  
}
