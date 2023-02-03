import { SearchState } from '../search.module';

export const getSearchMovieResults = (state: SearchState) =>
  state?.search?.results;

export const getSearchTotalResults = (state: SearchState) =>
  state?.search?.totalResults;
