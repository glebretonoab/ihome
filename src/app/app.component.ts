import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ihome-app',
  templateUrl: './app.component.html',
  styles: [require('./app.component.scss').toString()]
})

export class AppComponent {

  /*users = [
    {firstname: 'Gaetan', lastname: 'Lebreton', email: 'lebreton.gaetan@gmail.com', avatar: '../images/avatar/avatar_8.jpg'},
    {firstname: 'Estelle', lastname: 'Brehault', email: 'estellebrehault84@hotmail.com', avatar: '../images/avatar/avatar_7.jpg'},
    {firstname: 'Corentin', lastname: 'Lebreton Brehault', email: '...', avatar: '../images/avatar/avatar_6.jpg'}
  ];*/

  constructor(private router: Router) {}
}
