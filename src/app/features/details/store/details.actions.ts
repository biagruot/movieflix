import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/types/movie.types';

export const getDetails = createAction(
  '[Details] Get movie details',
  props<{ id: string }>()
);

export const getDetailsSuccess = createAction(
  '[Details] Get movie details success',
  props<{ response: Movie }>()
);

export const getDetailsError = createAction(
  '[Details] Get movie details error'
);
