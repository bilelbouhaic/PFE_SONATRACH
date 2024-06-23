import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService3 {
  generatePdf(taxeData: any, rentableData: any, kpiData: any) {
    const doc = new jsPDF();

    // Define styles for titles and subtitles
    const titleFontSize = 20;
    const subtitleFontSize = 12;
    const contentFontSize = 11;

    // Add the report title (H1)
    doc.setFontSize(titleFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text('Rapport d\'analyse de fiscalite', 10, 20); // (x: 10, y: 20)

    // Add production date and report generation date (H2)
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(subtitleFontSize);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date de production : ${currentDate}`, 10, 30); // (x: 10, y: 30)
    doc.text(`Généré le : ${currentDate}`, 10, 40); // (x: 10, y: 40)

    // Add introduction (H2)
    doc.text('Introduction :', 10, 50); // (x: 10, y: 50)
    doc.setFontSize(contentFontSize);
    doc.text('Ce rapport analyse les données des périmètres pour fournir des insights sur les taxes et la rentabilité.', 10, 60); // (x: 10, y: 60)

    // Add section for Périmètres Taxe (H3)
    doc.setFontSize(subtitleFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text('Top 5 Périmètres par Taxe :', 10, 70); // (x: 10, y: 70)

    // Define columns and data for taxeData table
    const columnsTaxe = ['Périmètre', 'Taxe'];
    const rowsTaxe = (taxeData || []).map((item: { nom: string; valeur: number }) => [
      item.nom || 'N/A', 
      (item.valeur !== undefined ? item.valeur.toFixed(2) : 'N/A')
    ]);

    // Generate table for taxeData
    autoTable(doc, {
      head: [columnsTaxe],
      body: rowsTaxe,
      startY: 80 // Start table at y: 80
    });

    // Get final position of the taxeData table
    const finalYTaxe = (doc as any).lastAutoTable.finalY;

    // Add section for Périmètres Rentables (H3)
    doc.setFontSize(subtitleFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text('Top 5 Périmètres Rentables :', 10, finalYTaxe + 10); // (x: 10, y: finalYTaxe + 10)

    // Define columns and data for rentableData table
    const columnsRentable = ['Périmètre', 'Rentabilité'];
    const rowsRentable = (rentableData || []).map((item: { nom: string; valeur: number }) => [
      item.nom || 'N/A', 
      (item.valeur !== undefined ? item.valeur.toFixed(2) : 'N/A')
    ]);

    // Generate table for rentableData
    autoTable(doc, {
      head: [columnsRentable],
      body: rowsRentable,
      startY: finalYTaxe + 20 // Start table after the previous one
    });

    // Get final position of the rentableData table
    const finalYRentable = (doc as any).lastAutoTable.finalY;

    // Add section for KPIs (H3)
    doc.setFontSize(subtitleFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text('KPI :', 10, finalYRentable + 10); // (x: 10, y: finalYRentable + 10)

    // Define columns and data for kpiData table
    const columnsKPI = ['KPI', 'Valeur'];
    const rowsKPI = [
      ['Valeur Totale', kpiData.valeur.toFixed(2)],
      ['Valeur 1', kpiData.valeur1.toFixed(2)],
      ['Valeur 2', kpiData.valeur2.toFixed(2)],
    ];

    // Generate table for kpiData
    autoTable(doc, {
      head: [columnsKPI],
      body: rowsKPI,
      startY: finalYRentable + 20 // Start table after the previous one
    });

    // Save the PDF
    doc.save('rapport_perimetres.pdf');
  }
}
