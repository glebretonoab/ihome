import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Configuration } from '../../app.configuration';

import { MenuCard } from '../../models/menucard.model';

@Component({
  selector: 'menucard',
  templateUrl: './menucard.component.html',
  styles: [require('./menucard.component.scss').toString()]
})

export class MenucardComponent implements OnInit {

  myMenucard: MenuCard;

  constructor(
    private configuration: Configuration
  ) {
    this.myMenucard.weekNumber = '52';
  }

  ngOnInit() {
  }
}