import { createAction, props } from '@ngrx/store';
import { SearchMoviesResponse, Types } from 'src/app/types/movie.types';

export const search = createAction(
  '[Search] Search',
  props<{ query: string; filterType: Types; page: number }>()
);

export const searchSuccess = createAction(
  '[Search] Search Success',
  props<{ response: SearchMoviesResponse }>()
);

export const changePage = createAction(
  '[Search] Change page',
  props<{ pageIndex: number }>()
);

export const clearSearch = createAction('[Search] Clear Search');

export const searchError = createAction('[Search] Search Error');
