import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { Study } from './models/study.model';

@Component({
  selector: 'sun-app',
  templateUrl: './app.component.html',
  styles: [require('./app.component.scss').toString()]
})

export class AppComponent {
  isActiveSidebar: false;
  isActivePrintSidebar: false;
  private studies: any;
  private studyId: any;

  constructor(private router: Router, private dataService: DataService) {
    this.dataService.studiesObservable$.subscribe(
      studiesSource => {
        this.studies = studiesSource;
    });

    this.dataService.studyIdObservable$.subscribe(
      studyIdSource => {
        this.studyId = studyIdSource;
    });
  }

  /**
   * Navigate to another study
   */
  studyChanged(id:number) {
    this.router.navigate(['study/', id]);
  }
}
