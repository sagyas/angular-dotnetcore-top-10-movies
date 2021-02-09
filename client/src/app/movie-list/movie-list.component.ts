import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Movie, MovieListService } from './movie-list.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  movieList: Movie[] = [];
  categoryList = [];
  moviesSubscription: EventEmitter<Movie[]>;

  constructor(private movieListService: MovieListService) {}

  ngOnInit(): void {
    this.movieList = this.movieListService.getMovieList();
    this.categoryList = this.movieListService.getCategoryList();

    this.moviesSubscription = this.movieListService.moviesLoaded;
    this.moviesSubscription.subscribe((list: Movie[]) => {
      this.movieList = list;
    });
  }

  onChange(categoryName: string) {
    if (categoryName === '') {
      this.movieList = this.movieListService.getMovieList();
    } else {
      this.movieList = this.movieListService
        .getMovieList()
        .filter((movie) => movie.category === categoryName);
    }
  }

  ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe();
  }
}
