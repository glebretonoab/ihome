import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StudyService } from '../../services/study.service';
import { ClientService } from '../../services/client.service';
import { PdfService } from '../../services/pdf.service';
import { Study } from '../../models/study.model';
import { Client } from '../../models/client.model';
import { Configuration } from '../../app.configuration';

@Component({
  selector: 'pdf',
  template: ''
})

export class PdfComponent implements OnInit {
  studyId: number;
  study: Study;
  studies: Study[];
  client: Client;


  constructor(private studyService: StudyService, private clientService: ClientService, private pdfService: PdfService, private route: ActivatedRoute, private configuration: Configuration) {}

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.studyId = id;
        this.studyService.getStudy(this.studyId)
          .then(study => {
            // Study Id
            this.study = study;

            // Study client
            // this.clientService.getClient(this.study.clientId)
            //   .then(client => {
            //     this.client = client;
            //
            //     let datas = new Array();
            //     datas['study'] = this.study;
            //     datas['client'] = this.client;
            //     this.pdfService.generateStudyPdf(datas);
            //   });
          });
      });
  }
}
