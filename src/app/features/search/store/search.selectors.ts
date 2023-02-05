import { createSelector } from '@ngrx/store';
import { searchFeature } from './search.reducer';

export const selectSearchResults = createSelector(
  searchFeature.selectResults,
  (results) => results
);

export const selectSearchIsLoading = createSelector(
  searchFeature.selectIsLoading,
  (isLoading) => isLoading
);

export const selectSearchIsError = createSelector(
  searchFeature.selectIsError,
  (isError) => isError
);

export const selectSearchTotalResults = createSelector(
  searchFeature.selectTotalResults,
  (totalResults) => totalResults
);

export const selectSearchQuery = createSelector(
  searchFeature.selectQuery,
  (selectQuery) => selectQuery
);

export const selectFilterType = createSelector(
  searchFeature.selectFilterType,
  (selectFilterType) => selectFilterType
);

export const selectPageIndex = createSelector(
  searchFeature.selectPageIndex,
  (selectPageIndex) => selectPageIndex
);
