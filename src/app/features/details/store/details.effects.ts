import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Movie, SearchMoviesResponse } from 'src/app/types/movie.types';
import { environment } from 'src/environments/environment';
import {
  getDetails,
  getDetailsError,
  getDetailsSuccess,
} from './details.actions';

@Injectable()
export class DetailsEffects {
  doGetDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(getDetails),
      switchMap(({ id }) => {
        return this.httpClient
          .get<SearchMoviesResponse | Movie>(environment.api_url, {
            params: {
              apikey: environment.api_key,
              i: id,
            },
          })
          .pipe(
            map((response) => {
              if (response['Response'] === 'False') {
                return getDetailsError();
              } else {
                return getDetailsSuccess({
                  response: response as Movie,
                });
              }
            }),
            catchError(() => of(getDetailsError()))
          );
      })
    )
  );

  constructor(private actions$: Actions, private httpClient: HttpClient) {}
}
