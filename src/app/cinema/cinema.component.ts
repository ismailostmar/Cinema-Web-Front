import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes:any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
      // envoyer une requete httpClientModule
    this.http.get("http://localhost:8082/villes")
      .subscribe(data=>{
        this.villes=data;
      },error =>{
        console.log(error);
      } )
  }

}
