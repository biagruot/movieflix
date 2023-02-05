import { createSelector } from '@ngrx/store';
import { detailsFeature } from './details.reducer';

export const selectDetails = createSelector(
  detailsFeature.selectResult,
  (results) => results
);

export const selectDetailsIsLoading = createSelector(
  detailsFeature.selectIsLoading,
  (isLoading) => isLoading
);

export const selectDetailsIsError = createSelector(
  detailsFeature.selectIsError,
  (isError) => isError
);
