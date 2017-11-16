// client.resolver.ts

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ClientService } from '../services/client.service';

@Injectable()
export class ClientResolver implements Resolve<any> {

  constructor(
    private clientService: ClientService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.clientService.getClientByStudy(route.params.id);
  }
}
