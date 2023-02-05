import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [CardComponent, ListComponent],
  exports: [CardComponent, ListComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
