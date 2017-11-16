import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Configuration } from '../app.configuration';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';

import { Client } from '../models/client.model';


@Injectable()
export class ClientService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private configuration: Configuration) { }

  // /api/clients/:id
  getClient(id: number): Promise<Client> {
    const url = this.configuration.server + this.configuration.apiUrl + `clients/${id}`;
    return this.http.get(url, this.options)
              .toPromise()
              .then(response => response.json().content as Client)
              .catch(this.handleError);
  }

  // /api/studies/:id/client
  getClientByStudy(id: number): Observable<Client> {
    const url = this.configuration.server + this.configuration.apiUrl + `studies/${id}/client`;
    return this.http.get(url, this.options)
              .map(response => response.json() as Client);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
