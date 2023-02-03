import { createReducer, on } from '@ngrx/store';
import { Movie } from 'src/app/types/movie.types';
import { search, searchSuccess } from './search.actions';

export interface SearchReducerState {
  results: Array<Movie>;
  totalResults: string;
  query: string;
  isLoading: boolean;
}

export const initialState: SearchReducerState = {
  results: [],
  totalResults: '0',
  query: '',
  isLoading: false,
};

export const searchReducer = createReducer(
  initialState,
  on(
    search,
    (state, { query }) =>
      ({ ...state, query, isLoading: true } satisfies SearchReducerState)
  ),
  on(
    searchSuccess,
    (state, { response }) =>
      ({
        ...state,
        results: response.Search,
        totalResults: response.totalResults,
        isLoading: false,
      } satisfies SearchReducerState)
  )
);
