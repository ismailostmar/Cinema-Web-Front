import {Component, OnInit} from '@angular/core';
import {CinemaService} from "../services/cinema.service";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes: any;
  public cinemas: any;
  public salles: any;
  public currentVille: any;
  public currentCinema: any;
  public  currentProjection: any;
  private selectedTickets: any;

  constructor(public cinemaService: CinemaService) {
  }

  ngOnInit(): void {
    // envoyer une requete httpClientModule
    this.cinemaService.getVilles()
      .subscribe(data => {
        this.villes = data;
      }, error => {
        console.log(error);
      })
  }

  onGetCinemas(v: any) {
    this.currentVille = v;
    this.currentCinema = undefined;
    this.salles = undefined;
    this.cinemaService.getCinemas(v)
      .subscribe(data => {
        this.cinemas = data;
      }, error => {
        console.log(error);
      })
  }

  onGetSalles(c: any) {
    this.currentCinema = c;
    this.currentProjection = undefined;
    this.cinemaService.getSalles(c)
      .subscribe(data => {
        this.salles = data;
        this.salles._embedded.salles.forEach((s: { projections: Object; }) => {
          this.cinemaService.getProjection(s)
            .subscribe(data => {
              s.projections = data;
            }, err => {
              console.log(err);
            })
        })
      }, err => {
        console.log(err);
      })
  }

  onGetTicketsPlaces(p: any) {
    this.currentProjection = p;
    this.cinemaService.getTicketsPlaces(p)
      .subscribe(data => {
        this.currentProjection.onGetTicketsPlaces = data;
      },err => {
        console.log(err);
      })
  }

  onGetPlaces(p: any) {

  }

  onSelectTicket(ticket: any) {
    ticket.selected = true;
    this.selectedTickets.push(ticket);
  }
}
