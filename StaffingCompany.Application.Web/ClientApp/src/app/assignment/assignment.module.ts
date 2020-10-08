import { AssignmentComponent } from './assignment.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';

const routes: Routes = [
  { path: '', component: AssignmentComponent }
];

@NgModule({
  declarations: [AssignmentComponent, AssignmentFormComponent],
  entryComponents:[AssignmentFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdkTableModule
  ],
  exports: [
    AssignmentComponent
  ],
  providers: [
    AssignmentComponent
  ]
})
export class AssignmentModule { }
