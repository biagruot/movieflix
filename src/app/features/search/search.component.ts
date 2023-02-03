import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { search } from 'src/app/features/search/store/search.actions';
import { SearchState } from './search.module';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  private searchFormSubscription: any;

  constructor(private store: Store<SearchState>) {}

  ngOnInit() {
    this.initSearchFormSubscription();
  }

  ngOnDestroy() {
    this.searchFormSubscription.unsubscribe();
  }

  private initSearchFormSubscription() {
    this.searchFormSubscription = this.searchForm
      .get('search')
      ?.valueChanges.pipe(
        filter((value: string) => value.length > 1),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((query: string) => {
        this.store.dispatch(search({ query }));
      });
  }
}
