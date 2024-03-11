import { Component } from '@angular/core';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vega-admin-pannel';
  constructor(public loaderService: LoaderService){}
}
