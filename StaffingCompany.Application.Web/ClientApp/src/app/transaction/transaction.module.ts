import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { RouterModule, Routes } from '@angular/router';
import { TransactionComponent } from './transaction.component';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

const routes: Routes = [
  { path: '', component: TransactionComponent }
];

@NgModule({
  declarations: [
    TransactionComponent,
    TransactionFormComponent
  ],
  entryComponents: [TransactionFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdkTableModule
  ],
  exports: [
    TransactionComponent
  ],
  providers: [
    TransactionComponent
  ]
})
export class TransactionModule { }
