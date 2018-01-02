import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule }    from '@angular/http';
import { MaterialModule } from './modules/material.module';

// Plugins
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

// Configuration
import { Configuration } from './app.configuration';

// Routes
import { ROUTES } from './app.routes';

// Components
import { AppComponent } from './app.component';
import { MenucardComponent } from './components/menucard/menucard.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    AppComponent,
    MenucardComponent
  ],
  providers: [
    Configuration
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
