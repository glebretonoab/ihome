import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Configuration } from '../app.configuration';

import 'rxjs/add/operator/toPromise';

import { Solarpanel } from '../models/solarpanel.model';

@Injectable()
export class SolarpanelService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private configuration: Configuration) { }

  // /api/studies/:id/solarpanels
  getSolarpanelsByStudy(id: number): Promise<Solarpanel[]> {
    const url = this.configuration.server + this.configuration.apiUrl + `studies/${id}/solarpanels`;
    return this.http.get(url, this.options)
               .toPromise()
               .then(response => response.json().content as Solarpanel[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
