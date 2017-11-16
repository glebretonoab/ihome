import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule }    from '@angular/http';

// Plugins
// import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';

// Configuration
import { Configuration } from './app.configuration';

// Routes
import { ROUTES } from './app.routes';

// Components
import { AppComponent } from './app.component';
import { StudyComponent } from './components/study/study.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { ThreeviewerComponent } from './components/threeviewer/threeviewer.component';

// Services
import { StudyService } from './services/study.service';
import { ClientService } from './services/client.service';
import { SolarpanelService } from './services/solarpanel.service';
import { PdfService } from './services/pdf.service';
import { DataService } from './services/data.service';

// Resolvers
import { ClientResolver } from './resolvers/client.resolver';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    LeafletModule
  ],
  declarations: [
    AppComponent,
    StudyComponent,
    PdfComponent,
    ThreeviewerComponent
  ],
  providers: [
    Configuration,
    StudyService,
    ClientService,
    SolarpanelService,
    PdfService,
    DataService,
    ClientResolver
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
