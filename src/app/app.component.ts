import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
//import { DataService } from './services/data.service';

@Component({
  selector: 'ihome-app',
  templateUrl: './app.component.html',
  styles: [require('./app.component.scss').toString()]
})

export class AppComponent {

  constructor(private router: Router) {}
}
