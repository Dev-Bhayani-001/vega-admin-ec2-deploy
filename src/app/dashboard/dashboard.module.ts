import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonTableComponent } from '../common-table/common-table.component';
import { FormsModule } from '@angular/forms';import { DashboardRoutingModule } from './dashboard-routing.module';
;



@NgModule({
  declarations: [
    CommonTableComponent,],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
