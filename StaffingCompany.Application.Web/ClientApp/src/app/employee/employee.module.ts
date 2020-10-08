import { EmployeeComponent } from './employee.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent}
]

@NgModule({
  declarations: [EmployeeComponent, EmployeeFormComponent],
  entryComponents:[EmployeeFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdkTableModule
  ],
  exports: [
    EmployeeComponent
  ],
  providers: [
    EmployeeComponent
  ]
})
export class EmployeeModule { }
