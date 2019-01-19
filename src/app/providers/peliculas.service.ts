import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apikey = 'your api key';
  private urlMoviedb = 'https://api.themoviedb.org/3';
  peliculas: any[] = [];

  constructor(private http: HttpClient) { }

  getPopulares() {
    let url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }&language=es`;
    return this.http.get(url).pipe(map(data => data['results']));
  }

  buscarPelicula( texto: string ) {
    let url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es`;
    return this.http.get(url).pipe(map((data: any) => {
      this.peliculas = data['results'];
      return data['results'];
    } ));
  }

  getCartelera() {
    let desde = new Date();
    let hasta = new Date();
    hasta.setDate(hasta.getDate() + 7);
    let desdeStr = `${desde.getFullYear()}-${desde.getMonth() + 1}-${desde.getDay()}`;
    let hastaStr = `${hasta.getFullYear()}-${hasta.getMonth() + 1}-${hasta.getDay()}`;

    let url = `${ this.urlMoviedb }/discover/movie?primary_release_date.gte=${desdeStr}&
    primary_release_date.lte=${hastaStr}&api_key=${ this.apikey }&language=es`;

    return this.http.get(url).pipe(map(data => data['results']));
  }

  getPopularesNinios() {
    let url = `${ this.urlMoviedb }/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc
    &api_key=${ this.apikey }&language=es`;

    return this.http.get(url).pipe(map(data => data['results']));
  }

  getPelicula(id: string) {
    let url = `${ this.urlMoviedb }/movie/${ id }?api_key=${ this.apikey }`;
    return this.http.get(url).pipe(map(data => data));
  }
}
