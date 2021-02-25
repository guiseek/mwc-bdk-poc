import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MwcModule } from './../../mwc/mwc.module';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MwcModule,
  ],
})
export class HomeModule {}
