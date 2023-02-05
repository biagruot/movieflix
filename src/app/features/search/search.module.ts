import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { MatPaginatorModule } from '@angular/material/paginator';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SearchEffects } from './store/search.effects';
import { searchFeature } from './store/search.reducer';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatPaginatorModule,
    StoreModule.forFeature(searchFeature),
    EffectsModule.forFeature([SearchEffects]),
  ],
})
export class SearchModule {}
