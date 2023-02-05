import { createFeature, createReducer, on } from '@ngrx/store';
import { Movie } from 'src/app/types/movie.types';
import {
  getDetails,
  getDetailsError,
  // eslint-disable-next-line prettier/prettier
  getDetailsSuccess
} from './details.actions';

export interface DetailsFeatureState {
  result: Movie;
  id: string;
  isLoading: boolean;
  isError: boolean;
}

export const initialState: DetailsFeatureState = {
  result: {} as Movie,
  id: '',
  isLoading: false,
  isError: false,
};

export const detailsFeature = createFeature({
  name: 'details',
  reducer: createReducer(
    initialState,
    on(
      getDetails,
      (state, { id }) =>
        ({
          ...state,
          id,
          isLoading: true,
        } satisfies DetailsFeatureState)
    ),
    on(
      getDetailsSuccess,
      (state, { response }) =>
        ({
          ...state,
          result: response,
          isLoading: false,
          isError: response.Response === 'False',
        } satisfies DetailsFeatureState)
    ),
    on(
      getDetailsError,
      (state) =>
        ({
          ...state,
          isLoading: false,
          isError: true,
        } satisfies DetailsFeatureState)
    )
  ),
});
