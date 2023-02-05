import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Movie } from 'src/app/types/movie.types';
import { getDetails } from './store/details.actions';
import { DetailsFeatureState } from './store/details.reducer';
import {
  selectDetails,
  selectDetailsIsError,
  selectDetailsIsLoading,
} from './store/details.selectors';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnDestroy {
  public details$: Observable<Movie> = this.store.pipe(select(selectDetails));

  public isLoading$: Observable<boolean> = this.store.pipe(
    select(selectDetailsIsLoading)
  );

  public isError$: Observable<boolean> = this.store.pipe(
    select(selectDetailsIsError)
  );

  private routeSubscription: Subscription | undefined;

  constructor(
    private store: Store<DetailsFeatureState>,
    private route: ActivatedRoute
  ) {
    this.initRouteSubscription();
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  private initRouteSubscription(): void {
    this.routeSubscription = this.route.paramMap.subscribe((paramMap) => {
      const movieId = paramMap.get('id');
      if (movieId) {
        this.store.dispatch(getDetails({ id: movieId }));
      }
    });
  }
}
