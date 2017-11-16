import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { StudyService } from '../../services/study.service';
import { ClientService } from '../../services/client.service';
import { SolarpanelService } from '../../services/solarpanel.service';
import { DataService } from '../../services/data.service';
import { PdfService } from '../../services/pdf.service';

import { Study } from '../../models/study.model';
import { Client } from '../../models/client.model';
import { Solarpanel } from '../../models/solarpanel.model';
import { Configuration } from '../../app.configuration';

@Component({
  selector: 'study',
  templateUrl: './study.component.html',
  styles: [require('./study.component.scss').toString()]
})

export class StudyComponent implements OnInit {

  studyId: number;
  study: Study;
  studies: Study[];
  @Output() studiesEvent = new EventEmitter<Study[]>();
  client: Client;
  solarpanel: Solarpanel;

  // Leaflet configuration
  private lat: number;
  private lng: number;
  private zoom: number = 13;
  private layer: any;
  private options: any;

  constructor(
    private studyService: StudyService,
    private clientService: ClientService,
    private solarpanelService: SolarpanelService,
    private dataService: DataService,
    private pdfService: PdfService,
    private router: Router,
    private route: ActivatedRoute,
    private configuration: Configuration
  ) {}

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.studyId = id;
        this.dataService.onStudyIdDataChange(this.studyId);
        this.studyService.getStudy(this.studyId)
          .then(study => {
            // Study Id
            this.study = study;

            // Solar panels
            this.solarpanelService.getSolarpanelsByStudy(this.studyId)
              .then(solarpanels => {
                this.solarpanel = solarpanels[0];
              });

            // Studies list
            this.studyService.getStudiesByClient(this.study.clientId)
              .then(studies => {
                this.dataService.onStudiesDataChange(studies);
              });
          });
      });

      this.client = this.route.snapshot.data['client'];
      if (this.client.location[0] != 'undefined') this.lng = this.client.location[0];
      if (this.client.location[1] != 'undefined') this.lat = this.client.location[1];
      this.loadMap();
  }

  /**
   * Load OSM Map
   */
  public loadMap() {
    /*this.layer = L.marker([ this.lat, this.lng ], {
     	icon: L.icon({
     		iconSize: [ 20, 35 ],
     		iconAnchor: [ 13, 0 ],
     		iconUrl: '/assets/images/marker-icon.2273e3d8ad9264b7daa5bdbf8e6b47f8.png',
     		shadowUrl: '/assets/images/marker-shadow.44a526eed258222515aa21eaffd14a96.png'
     	})
    });

    this.options = {
    	layers: [
    		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18
        }),
        this.layer
    	],
    	zoom: this.zoom,
    	center: L.latLng({ lat: this.lat, lng: this.lng }),
      zoomControl: false
    };*/
  }

  /**
   * Create study PDF
   */
  public printPdf() {
    let datas = new Array();
    datas['study'] = this.study;
    datas['client'] = this.client;
    this.pdfService.generateStudyPdf(datas);
  }
}
