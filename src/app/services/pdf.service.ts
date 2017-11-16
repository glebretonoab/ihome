import { Injectable }    from '@angular/core';
import { Configuration } from '../app.configuration';

@Injectable()
export class PdfService {

  constructor(private configuration: Configuration) { }

  generateStudyPdf(datas: Array<any>) {

    // Require
    let jsPDF = require('jspdf');
    require('jspdf-autotable');
    let myImage = require('../../images/logo_engie_pdf.png');

    // Datas
    let client = datas['client'];
    let study = datas['study'];
    let headers = [
      {title: 'DESIGNATION', dataKey: 'des'},
      {title: 'QTE', dataKey: 'qte'},
      {title: 'PRIX', dataKey: 'px'},
      {title: 'TOTAL', dataKey: 'total'}
    ];
    let data = [
        {
          'des': 'Installation du matériel',
          'qte': 'x 1',
          'px': '1000,00 €',
          'total': '1000,00 €'
        },
        {
          'des': 'Panneaux solaires',
          'qte': 'x 6',
          'px': '432,67 €',
          'total': '2596,00 €'
        },
        {
          'des': '',
          'qte': 'TOTAL HT',
          'px': '',
          'total': '2596,00 €'
        },
        {
          'des': '',
          'qte': 'TVA',
          'px': '20%',
          'total': '719,20 €'
        },
        {
          'des': '',
          'qte': 'TOTAL',
          'px': '',
          'total': '3596,00 €'
        }
    ];
    let x = 15;

    // -----------------------------
    // ----- Init pdf document -----
    // -----------------------------
    let doc = new jsPDF({orientation: 'p', lineHeight: 1.4});

    // Date of study
    // let studyDate = this.study.validationDate
    doc.setTextColor(141, 135, 135);
    doc.setFontSize(10);
    doc.setFont('verdana');
    doc.text(x, 15, 'Le 09 mars 2017');

    // ENGIE Address (blue background)
    doc.setDrawColor(0);
    doc.setFillColor(0, 159, 227);
    doc.rect(150, 45, 60, 39, 'F');

    doc.setTextColor(247, 247, 247);
    doc.setFontType('bold');
    doc.setFontSize(13);
    doc.text('ENGIE', 155, 52);

    var splitText = doc.splitTextToSize('Service Clients TSA 42108 76934 ROUEN CEDEX 09', 30);
    doc.setFontType('bold');
    doc.setFontType('normal');
    doc.setFontSize(11);
    doc.text(splitText, 155, 58);

    // Title
    doc.setTextColor(0, 159, 227);
    doc.setFontType('bold');
    doc.setFontSize(13);
    doc.text('DEVIS', 15, 47);

    let interval = 6;
    let blockStartY = 57;

    // Study number
    doc.setTextColor(0, 0, 0);
    doc.setFontType('bold');
    doc.setFontSize(11);
    doc.text('N° de devis :', 15, blockStartY);

    doc.setTextColor(141, 135, 135);
    doc.setFontType('normal');
    doc.setFontSize(11);
    doc.text('f143335b0b15d15', 45, blockStartY);

    // Client
    doc.setTextColor(0, 0, 0);
    doc.setFontType('bold');
    doc.setFontSize(11);
    doc.text('Client :', 15, blockStartY + interval);

    doc.setTextColor(141, 135, 135);
    doc.setFontType('normal');
    doc.setFontSize(11);
    doc.text(client.firstname + ' ' + client.lastname, 45, blockStartY + interval);
    doc.text(client.address.number + ' ' + client.address.street, 45, blockStartY + (interval * 2));
    doc.text(client.address.postcode + ' ' + client.address.city, 45, blockStartY + (interval * 3));

    // Objet
    doc.setTextColor(0, 0, 0);
    doc.setFontType('bold');
    doc.setFontSize(11);
    doc.text('Objet :', 15, blockStartY + (interval * 4));

    doc.setTextColor(141, 135, 135);
    doc.setFontType('normal');
    doc.setFontSize(11);
    doc.text('Installation de panneaux solaires', 45, blockStartY + (interval * 4));

    let startTableY = 100;
    doc.autoTable(headers, data, {
      styles: {
        cellPadding: 2
      },
      headerStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: 'bold'
      },
      columnStyles: {
        des: {
          textColor: [0, 159, 227],
          fontStyle: 'bold',
          columnWidth: 100
        },
        qte: {
          textColor: [0, 0, 0],
          fontStyle: 'bold'
        },
        px: {
          textColor: [0, 0, 0],
          fontStyle: 'bold'
        },
        total: {
          textColor: [0, 0, 0],
          fontStyle: 'bold'
        }
      },
      margin: {
        top: startTableY
      },
      // Add solar panel description after solar panel row
      drawRow: function(row: any, data: any) {
        if (row.index === 2) {
          let content = [
            'Référence : Sp-3000-155AB23',
            'Dimensions : Larg. : 990mm / Long. : 1660 mm',
            'Poids : 30 kg',
            'Puissance nominale :  250 Wc',
            'Emplacement :  X: 30,8  Y: 50,6  Z: 31,5',
            'Orientation : X: 10,8  Y: 60,6  Z: 31,5'
          ];

          let cellHeight = 35;
          doc.setTextColor(141, 135, 135);
          doc.setFillColor(255, 255, 255);
          doc.setFontSize(10);
          doc.setFontType('normal');
          doc.rect(data.settings.margin.left, row.y, data.table.width, cellHeight, 'F');
          doc.autoTableText(
            content.join('\n'),
            data.settings.margin.left + 2,
            (row.y + row.height / 2) - 3,
            {
              halign: 'left',
              valign: 'top'
            }
          );
          data.cursor.y += cellHeight;
        }
      },
      // Colorize three last rows
      drawCell: function(cell: any, data: any) {
        var rows = data.table.rows;
        if (data.row.index >= rows.length - 3 && data.row.index < rows.length - 1) {
          doc.setFontType('normal');
        }
        if (data.row.index >= rows.length - 3) {
          doc.setFillColor(245, 245, 245);
        }
      }
    });

    // Call Engie contact
    doc.setFontSize(14);
    doc.setFontType('bolditalic');
    doc.setTextColor(133, 131, 131);
    let text = 'Appeler un conseiller ENGIE au 09 69 399 993';
    var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(text, textOffset, doc.internal.pageSize.height - 15);

    // Add logo + save the PDF
    let imgLogo = new Image();
    imgLogo.src = this.configuration.server + 'assets/images/logo_engie_pdf.406960a21c010848098107081bccf9ed.png';
    imgLogo.onload = function() {
      doc.addImage(this, 'png', 157, 15, 45, 15);
      doc.output('datauri', 'devis.pdf');
    };
  }
}
