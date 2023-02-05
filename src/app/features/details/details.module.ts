import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HeaderComponent } from './components/header/header.component';
import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { DetailsEffects } from './store/details.effects';
import { detailsFeature } from './store/details.reducer';

@NgModule({
  declarations: [DetailsComponent, HeaderComponent],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    StoreModule.forFeature(detailsFeature),
    EffectsModule.forFeature([DetailsEffects]),
  ],
})
export class DetailsModule {}
