import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { CommonTableComponent } from '../common-table/common-table.component';
import { DashboardComponent } from './dashboard.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { AuthGuard } from '../service/auth.guard';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: CommonTableComponent },
      { path: 'portfolio', component: CommonTableComponent },
      { path: 'aboutUs', component: AboutUsComponent },
      { path: 'portfolio-image', component: CommonTableComponent },
      { path: 'portfolio-category', component: CommonTableComponent },
      { path: 'category/:category', component: CommonTableComponent },
      { path: 'portfolio-video', component: CommonTableComponent },
      { path: 'service', component: CommonTableComponent },
      { path: 'testimonial', component: CommonTableComponent },
      { path: 'our-clients', component: CommonTableComponent },
      { path: 'blogs', component: CommonTableComponent },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
@NgModule({
  declarations: [],
  imports: [
   RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
