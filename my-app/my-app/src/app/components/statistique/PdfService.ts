import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  generatePdf(data1: any, data2: any, data3: any, data4: any, data5: any, dataMeteo1: any, dataMeteo3: any, dataMeteo33: any) {
    const doc = new jsPDF();

    // Définir les styles pour les titres et sous-titres
    const titleFontSize = 20;
    const subtitleFontSize = 12;
    const contentFontSize = 11;

    // Ajouter le titre du rapport (H1)
    doc.setFontSize(titleFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text('Rapport d\'analyse', 10, 20); // (x: 10, y: 20)

    // Ajouter la date de production et la date de génération du rapport (H2)
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(subtitleFontSize);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date de production : ${currentDate}`, 10, 30); // (x: 10, y: 30)
    doc.text(`Généré le : ${currentDate}`, 10, 40); // (x: 10, y: 40)

    // Ajouter l'introduction (H2)
    doc.text('Introduction :', 10, 50); // (x: 10, y: 50)
    doc.setFontSize(contentFontSize);
    doc.setFont('helvetica', 'normal');
    doc.text('Ce rapport analyse les données de différentes sources API pour fournir des insights sur', 10, 60); // (x: 10, y: 60)

    // Ajouter la méthodologie (H2)
    doc.setFontSize(subtitleFontSize);
    doc.setFont('helvetica', 'normal');
    doc.text('Méthodologie :', 10, 70); // (x: 10, y: 70)
    doc.setFontSize(contentFontSize);
    doc.text('Les données ont été recueillies à partir des API suivantes :', 10, 80); // (x: 10, y: 80)

    // Ajouter la section de quantité produite moyenne par produit (H3)
    doc.setFontSize(subtitleFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text('Quantité produite moyenne par produit :', 10, 90); // (x: 10, y: 90)

    // Définir les colonnes et les données du tableau pour data1
    const columns1 = ['Hydrocarbure', 'Quantité produite'];
    const rows1 = [
      ['Pétrole', data1.petrole.toFixed(2)],
      ['Gaz', data1.gaz.toFixed(2)],
      ['Condensat', data1.condensat.toFixed(2)],
      ['Gpl', data1.gpl.toFixed(2)],
    ];

    // Générer le tableau pour data1
    autoTable(doc, {
      head: [columns1],
      body: rows1,
      startY: 100 // Commencer le tableau à y: 100
    });

    // Obtenir la position finale du premier tableau
    const finalY1 = (doc as any).lastAutoTable.finalY;

    // Ajouter la section de périmètre et quantité produite (H3)
    doc.setFontSize(subtitleFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text('Top 5 périmètres les plus productifs :', 10, finalY1 + 10); // (x: 10, y: finalY1 + 10)

    // Définir les colonnes et les données du tableau pour data2
    const columns2 = ['Périmètre', 'Quantité produite'];
    const rows2 = data2.map((item: { nom: any; valeur: any; }) => [item.nom, item.valeur]);

    // Générer le tableau pour data2
    autoTable(doc, {
      head: [columns2],
      body: rows2,
      startY: finalY1 + 20 // Commencer le tableau après le précédent
    });

    // Obtenir la position finale du deuxième tableau
    const finalY2 = (doc as any).lastAutoTable.finalY;

    // Fonction pour générer les lignes des tableaux des wilayas
    const generateWilayaRows = (dataWilaya: any, dataMeteo: any) => {
      const pairs = [];
      for (let i = 0; i < dataWilaya.length; i += 3) {
        pairs.push([dataWilaya[i], dataWilaya[i + 2], dataMeteo[0][Math.floor(i / 3)]]);
      }
      pairs.sort((a, b) => a[0] - b[0]);
      return pairs.map((item) => [item[0], item[1], item[2]]);
    };

    // Ajouter la section pour data3 (Wilaya Adrar)
    doc.setFontSize(subtitleFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text('Quantite produite moyenne et temperature (Adrar) :', 10, finalY2 + 10); // (x: 10, y: finalY2 + 10)

    // Générer les lignes pour le tableau d'Adrar
    const rows3 = generateWilayaRows(data3, dataMeteo1);

    // Générer le tableau pour data3
    autoTable(doc, {
      head: [['Mois', 'Quantité produite', 'Météo']],
      body: rows3,
      startY: finalY2 + 20 // Commencer le tableau après le précédent
    });

    // Obtenir la position finale du troisième tableau
    const finalY3 = (doc as any).lastAutoTable.finalY;

    // Ajouter la section pour data4 (Wilaya Laghouat)
    doc.setFontSize(subtitleFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text('Quantite produite moyenne et temperature (Laghouat) :', 10, finalY3 + 10); // (x: 10, y: finalY3 + 10)

    // Générer les lignes pour le tableau de Laghouat
    const rows4 = generateWilayaRows(data4, dataMeteo3);

    // Générer le tableau pour data4
    autoTable(doc, {
      head: [['Mois', 'Quantité produite', 'Météo']],
      body: rows4,
      startY: finalY3 + 20 // Commencer le tableau après le précédent
    });

    // Obtenir la position finale du quatrième tableau
    const finalY4 = (doc as any).lastAutoTable.finalY;

    // Ajouter la section pour data5 (Wilaya Illizi)
    doc.setFontSize(subtitleFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text('Quantite produite moyenne et temperature (Illizi) :', 10, finalY4 + 10); // (x: 10, y: finalY4 + 10)

    // Générer les lignes pour le tableau d'Illizi
    const rows5 = generateWilayaRows(data5, dataMeteo33);

    // Générer le tableau pour data5
    autoTable(doc, {
      head: [['Mois', 'Quantité produite', 'Météo']],
      body: rows5,
      startY: finalY4 + 20 // Commencer le tableau après le précédent
    });

    // Sauvegarder le PDF
    doc.save('report.pdf');
  }
}
