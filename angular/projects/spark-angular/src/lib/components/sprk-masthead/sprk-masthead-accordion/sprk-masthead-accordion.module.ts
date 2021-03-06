import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SprkIconModule } from '../../sprk-icon/sprk-icon.module';
import {
  SprkMastheadAccordionComponent
} from './sprk-masthead-accordion.component';

@NgModule({
  imports: [CommonModule, RouterModule, SprkIconModule],
  declarations: [SprkMastheadAccordionComponent],
  exports: [SprkMastheadAccordionComponent]
})
export class SprkMastheadAccordionModule {}
