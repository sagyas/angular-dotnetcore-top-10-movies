import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Movie, MovieListService } from '../movie-list/movie-list.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit {
  categoryList = [];
  form: FormGroup;
  error: boolean = false;
  errorMessage = '';
  constructor(private movieListService: MovieListService) {}

  ngOnInit(): void {
    this.categoryList = this.movieListService.getCategoryList();

    this.form = new FormGroup({
      movieName: new FormControl(null),
      category: new FormControl(this.categoryList[0]),
      ranking: new FormControl(null),
      image: new FormControl(null),
    });

    this.movieListService.error.subscribe((resp: any) => {
      this.error = true;
      this.errorMessage = resp.error;
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.error = true;
      this.errorMessage = 'Must fill all fields';
      return;
    }
    this.error = false;

    const newMovie = new Movie();
    newMovie.name = this.form.value.movieName;
    newMovie.category = this.form.value.category;
    newMovie.ranking = this.form.value.ranking;
    newMovie.image = this.form.value.image;
    this.movieListService.addMovie(newMovie);
  }
}
