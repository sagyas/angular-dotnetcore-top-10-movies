import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Movie {
  name: string;
  ranking: number;
  image: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  private defaultImage = '../../assets/unnamed.png';
  private movieList: Movie[] = [];
  public moviesLoaded: EventEmitter<Movie[]>;
  public error: EventEmitter<string>;

  private categoryList = {
    Drama: true,
    Action: true,
    SciFi: true,
  };

  constructor(private httpClient: HttpClient) {
    this.moviesLoaded = new EventEmitter<Movie[]>();
    this.error = new EventEmitter<string>();
    this.loadMovies();
  }

  public getMovieList() {
    return this.movieList.slice();
  }

  private loadMovies() {
    this.httpClient
      .get('http://localhost:5000/api/movies')
      .subscribe((resp: Movie[]) => {
        resp.forEach((element) => {
          if (element.image === '') {
            element.image = this.defaultImage;
          }
        });
        this.movieList = resp;
        this.moviesLoaded.next(this.movieList);
      });
  }

  public getCategoryList() {
    const list = [];
    for (const key of Object.entries(this.categoryList)) {
      list.push(key[0]);
    }
    return list;
  }

  public addMovie(newMovie: Movie) {
    if (newMovie.image === null) {
      newMovie.image = this.defaultImage;
    }
    this.httpClient
      .post('http://localhost:5000/api/movies', newMovie)
      .subscribe(
        () => {
          this.loadMovies();
        },
        (error) => this.error.emit(error)
      );
  }
}
