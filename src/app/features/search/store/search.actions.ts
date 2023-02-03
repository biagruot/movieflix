import { createAction, props } from '@ngrx/store';
import { SearchMoviesResponse } from 'src/app/types/movie.types';

export const search = createAction(
  '[Search] Search',
  props<{ query: string }>()
);

export const searchSuccess = createAction(
  '[Search] Search Success',
  props<{ response: SearchMoviesResponse }>()
);

export const searchError = createAction('[Search] Search Error');
