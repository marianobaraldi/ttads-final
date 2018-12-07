import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit {
  urlTorneos: string = 'http://localhost:3000/api/torneos/'; 
  torneos;
  showTournamentCards = false;

  constructor(private http: HttpClient) {} 

  ngOnInit() {
    this.http.get(this.urlTorneos).subscribe(data => {
      this.torneos = data;
    });
  }

  manageTournamentCards(loggedIn){
    if (loggedIn) this.showTournamentCards = true;
     else this.showTournamentCards = false;
  }

}
