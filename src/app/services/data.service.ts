import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class DataService {
  private studiesSource = new Subject<string>();
  studiesObservable$ = this.studiesSource.asObservable();

  private studyIdSource = new Subject<string>();
  studyIdObservable$ = this.studyIdSource.asObservable();

  onStudiesDataChange(data: any) {
    this.studiesSource.next(data);
  }

  onStudyIdDataChange(data: any) {
    this.studyIdSource.next(data);
  }
}
