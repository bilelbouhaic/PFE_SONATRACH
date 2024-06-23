import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5286/api';

  constructor(private http: HttpClient) { }

  uploadExcelFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(`${this.baseUrl}/ExcelUpload/extract`, formData);
  }

  // Autres méthodes de service si nécessaire
}
