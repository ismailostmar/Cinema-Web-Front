import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CinemaService} from "../services/cinema.service";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes:any;
  public cinemas:any;
  public currentVille:any;
  public currentCinema:any;
  public salles:any;
  public currentProjection: any;

  constructor(private cinemaService:CinemaService) { }

  ngOnInit(): void {
      // envoyer une requete httpClientModule
    this.cinemaService.getVilles()
      .subscribe(data=>{
        this.villes=data;
      },error =>{
        console.log(error);
      } )
  }

  onGetCinemas(v: any) {
    this.currentVille=v;
    this.cinemaService.getCinemas(v)
      .subscribe(data=>{
        this.cinemas=data;
      },error =>{
        console.log(error);
      } )
  }

  onGetSalles(c: any) {
    this.currentCinema=c;
    this.cinemaService.getSalles(c)
      .subscribe(data=> {
        this.salles=data;
        this.salles._embedded.salles.forEach((s: { projections: Object; })=>{
          this.cinemaService.getProjection(s)
            .subscribe(data=> {
              s.projections=data;
            },err=>{
              console.log(err);
            })
        })
        },err=>{
        console.log(err);
      })
  }

  onGetTicketsPlaces(p: any) {

  }
}
