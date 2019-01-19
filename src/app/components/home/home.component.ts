import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../providers/peliculas.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  cartelera: any;
  populares: any;
  ninios: any;
  constructor(public _ps: PeliculasService) {
    this._ps.getCartelera().subscribe(data => {
      console.log(data);
      this.cartelera = data;
    });
    this._ps.getPopulares().subscribe(data => {
      console.log(data);
      this.populares = data;
    });
    this._ps.getPopularesNinios().subscribe(data => {
      console.log(data);
      this.ninios = data;
    });
  }

  ngOnInit() {
  }

}
