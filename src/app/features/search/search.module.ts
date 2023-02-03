import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SearchEffects } from './store/search.effects';
import { searchReducer, SearchReducerState } from './store/search.reducer';

export interface SearchState {
  search: SearchReducerState;
}

const reducers: ActionReducerMap<SearchState> = {
  search: searchReducer,
};

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('search', reducers),
    EffectsModule.forFeature([SearchEffects]),
  ],
})
export class SearchModule {}
