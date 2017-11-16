import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Configuration } from '../app.configuration';

import 'rxjs/add/operator/toPromise';

import { Study } from '../models/study.model';

@Injectable()
export class StudyService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private configuration: Configuration) { }

  // /api/studies
  getStudies(): Promise<Study[]> {
    const url = this.configuration.server + this.configuration.apiUrl + 'studies';
    return this.http.get(url, this.options)
               .toPromise()
               .then(response => response.json().content as Study[])
               .catch(this.handleError);
  }

  // /api/clients/:id/studies
  getStudiesByClient(id: number): Promise<Study[]> {
    const url = this.configuration.server + this.configuration.apiUrl + `clients/${id}/studies`;
    return this.http.get(url, this.options)
               .toPromise()
               .then(response => response.json().content as Study[])
               .catch(this.handleError);
  }

  // /api/studies/:id
  getStudy(id: number): Promise<Study> {
    const url = this.configuration.server + this.configuration.apiUrl + `studies/${id}`;
    return this.http.get(url, this.options)
              .toPromise()
              .then(response => response.json() as Study)
              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
