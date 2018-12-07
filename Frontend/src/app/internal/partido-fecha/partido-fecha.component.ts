import { Component, OnInit, Input } from '@angular/core';
import { Partido } from '../../models/partido';

@Component({
  selector: 'app-partido-fecha',
  templateUrl: './partido-fecha.component.html',
  styleUrls: ['./partido-fecha.component.css']
})
export class PartidoFechaComponent implements OnInit {

  @Input() partido: Partido;
  
  @Input() mini;

  constructor() { }

  ngOnInit() {
  }

}




