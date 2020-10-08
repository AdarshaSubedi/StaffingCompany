import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail.component';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: UserDetailComponent }
];

@NgModule({
  declarations: [
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    HttpClientModule
  ],
  exports: [
    UserDetailComponent
  ]
})
export class UserDetailModule { }
