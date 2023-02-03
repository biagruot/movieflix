import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { SearchMoviesResponse } from 'src/app/types/movie.types';
import { environment } from 'src/environments/environment';
import { search, searchError, searchSuccess } from './search.actions';

@Injectable()
export class SearchEffects {
  doSearch = createEffect(() =>
    this.actions$.pipe(
      ofType(search),
      switchMap(({ query }) => {
        return this.httpClient
          .get<SearchMoviesResponse>(environment.api_url, {
            params: {
              apikey: environment.api_key,
              s: query,
            },
          })
          .pipe(
            map((response) => searchSuccess({ response })),
            catchError(() => of(searchError()))
          );
      })
    )
  );

  constructor(private actions$: Actions, private httpClient: HttpClient) {}
}
