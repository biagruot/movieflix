import { Component, Input } from '@angular/core';
import { GroupedMovies } from 'src/app/types/movie.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() movies: GroupedMovies | null = {};
}
