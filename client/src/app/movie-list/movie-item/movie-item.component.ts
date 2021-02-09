import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie-list.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent implements OnInit {
  @Input() movie: Movie;
  infoToggle = false;
  constructor() {}

  ngOnInit(): void {
  }

  onClick() {
    this.infoToggle = !this.infoToggle;
  }
}
