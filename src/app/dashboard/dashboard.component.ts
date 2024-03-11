import { Component } from '@angular/core';
import { LoaderService } from '../service/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor( private router : Router,private readonly loaderService : LoaderService) {}
  public navbar  = [{
    title: 'HOME',
    url: '/dashboard/home'
  },
  {
    title: 'ABOUT US',
    url: '/dashboard/aboutUs'
  },
  {
    title: 'PORTFOLIO-IMAGE',
    url: '/dashboard/portfolio-image'
  },
 
  {
    title: 'PORTFOLIO-VIDEO',
    url: '/dashboard/portfolio-video'
  },
  {
    title: 'TESTIMONIALS',
    url: '/dashboard/testimonial'
  },
  {
    title: 'OUR CLIENT',
    url: '/dashboard/our-clients'
  },
  {
    title: 'SERVICES',
    url: '/dashboard/service'
  },
  {
    title: 'BLOGS',
    url: '/dashboard/blogs'
  },
]

onLogout(){
  localStorage.clear()
  this.loaderService.createToast('success', 'Loged Out Succesfully!',1500);
  this.router.navigate(['/login']);
}
}
