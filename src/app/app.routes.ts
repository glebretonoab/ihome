import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { StudyComponent } from './components/study/study.component';
import { PdfComponent } from './components/pdf/pdf.component';

import { ClientResolver } from './resolvers/client.resolver';

export const ROUTES: Routes = [
  {
    path: 'study/:id',
    component: StudyComponent,
    resolve: {
      client: ClientResolver
    }
  },
  { path: 'study/:id/pdf', component: PdfComponent },
  { path: '*', component: AppComponent }
]
