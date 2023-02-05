import { createFeature, createReducer, on } from '@ngrx/store';
import { Movie, Types } from 'src/app/types/movie.types';
import { clearSearch, search, searchSuccess } from './search.actions';

export interface SearchFeatureState {
  results: Array<Movie>;
  totalResults: string;
  query: string;
  pageIndex: number;
  filterType: Types | undefined;
  isLoading: boolean;
  isError: boolean;
}

export const initialState: SearchFeatureState = {
  results: [],
  totalResults: '0',
  pageIndex: 1,
  query: '',
  filterType: undefined,
  isLoading: false,
  isError: false,
};

export const searchFeature = createFeature({
  name: 'search',
  reducer: createReducer(
    initialState,
    on(
      search,
      (state, { query, filterType }) =>
        ({
          ...state,
          query,
          filterType,
          isLoading: true,
        } satisfies SearchFeatureState)
    ),
    on(
      searchSuccess,
      (state, { response }) =>
        ({
          ...state,
          results: response.Response === 'True' ? response.Search : [],
          totalResults: response.totalResults,
          isLoading: false,
          isError: response.Response === 'False',
        } satisfies SearchFeatureState)
    ),
    on(
      clearSearch,
      (state) =>
        ({
          ...state,
          results: [],
          totalResults: '0',
          query: '',
          filterType: undefined,
          isLoading: false,
          isError: false,
        } satisfies SearchFeatureState)
    )
  ),
});
