import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { select, Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  Subscription,
  switchMap,
  take,
} from 'rxjs';
import {
  clearSearch,
  search,
} from 'src/app/features/search/store/search.actions';
import { GroupedMovies, Types } from 'src/app/types/movie.types';
import { MovieService } from '../movie.service';
import { SearchFeatureState } from './store/search.reducer';
import {
  selectFilterType,
  selectSearchIsError,
  selectSearchIsLoading,
  selectSearchQuery,
  selectSearchResults,
  selectSearchTotalResults,
} from './store/search.selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  public movies$: Observable<GroupedMovies> = this.store.pipe(
    select(selectSearchResults),
    switchMap((movies) => {
      return this.movieService.getMoviesGroupedByYear(movies);
    })
  );

  public totalResults$: Observable<string> = this.store.pipe(
    select(selectSearchTotalResults)
  );

  public isLoading$: Observable<boolean> = this.store.pipe(
    select(selectSearchIsLoading)
  );

  public isError$: Observable<boolean> = this.store.pipe(
    select(selectSearchIsError)
  );

  public form = new FormGroup({
    search: new FormControl(),
    type: new FormControl(),
  });

  private searchFormSubscription: Subscription | undefined;
  private typeFormSubscription: Subscription | undefined;

  public filterTypes = [
    { value: undefined, viewValue: 'All' },
    { value: 'movie', viewValue: 'Movies' },
    { value: 'series', viewValue: 'Series' },
    { value: 'episode', viewValue: 'Episodes' },
  ];

  public pageIndex = 0;

  constructor(
    private store: Store<SearchFeatureState>,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.initFormGroup();
    this.initSearchFormSubscription();
    this.initTypeFormSubscription();
  }

  ngOnDestroy() {
    // Unsubscribe from the form value changes subscriptions to prevent memory leaks
    this.searchFormSubscription?.unsubscribe();
    this.typeFormSubscription?.unsubscribe();
  }

  private initFormGroup() {
    this.store
      .pipe(select(selectSearchQuery), take(1))
      .subscribe((query) =>
        this.form.setControl('search', new FormControl(query))
      );

    this.store
      .pipe(
        select(selectFilterType),
        filter((filterType: Types | undefined) => filterType !== undefined),
        take(1)
      )
      .subscribe((filterType) =>
        this.form.setControl('type', new FormControl(filterType))
      );
  }

  private initSearchFormSubscription() {
    this.searchFormSubscription = this.form
      .get('search') // get the search form control
      ?.valueChanges.pipe(
        filter((value: string) => value.length > 1), // only emit a value if it is longer than 1 character
        debounceTime(1000), // wait for 1 second after the latest value change before emitting
        distinctUntilChanged() // only emit a value if it is different from the previous value
      )
      .subscribe((query: string) => {
        this.store.dispatch(
          search({
            query: query.trim(),
            filterType: this.form.get('type')?.value,
            page: this.pageIndex + 1,
          })
        );
      });
  }

  private initTypeFormSubscription() {
    this.typeFormSubscription = this.form
      .get('type') // get the type form control
      ?.valueChanges.subscribe((filterType: Types) => {
        if (this.form.get('search')?.value.trim()) {
          this.store.dispatch(
            search({
              query: this.form.get('search')?.value.trim(),
              filterType,
              page: this.pageIndex + 1,
            })
          );
        }
      });
  }

  public clearSearch() {
    // reset the search form control value
    this.store.dispatch(clearSearch());
    this.form.get('search')?.setValue('');
  }

  public changePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.store.dispatch(
      search({
        query: this.form.get('search')?.value.trim(),
        filterType: this.form.get('type')?.value,
        page: this.pageIndex + 1,
      })
    );
  }
}
