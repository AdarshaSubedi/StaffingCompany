import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobComponent } from './job.component';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { JobFormComponent } from './job-form/job-form.component';

const routes: Routes = [
  { path: '', component: JobComponent }
];

@NgModule({
  declarations: [
    JobComponent,
    JobFormComponent
  ],
  entryComponents:[JobFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdkTableModule
  ],
  exports: [
    JobComponent
  ],
  providers: [
    JobComponent
  ]
})
export class JobModule { }
