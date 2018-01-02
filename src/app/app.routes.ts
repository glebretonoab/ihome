import { Routes } from '@angular/router';

import { AppComponent } from './app.component';

export const ROUTES: Routes = [
  /*{
    path: 'study/:id',
    component: StudyComponent,
    resolve: {
      client: ClientResolver
    }
  },
  { path: 'study/:id/pdf', component: PdfComponent },*/
  { path: '*', component: AppComponent }
]
