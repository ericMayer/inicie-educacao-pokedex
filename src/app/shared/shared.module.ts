import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestStateModule } from './components/request-state/request-state.module';

@NgModule({
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RequestStateModule
  ]
})
export class SharedModule { }
