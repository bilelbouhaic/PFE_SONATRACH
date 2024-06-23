import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyService {

  constructor(private http: HttpClient) { }

  postData(data: any) {
    return this.http.post<any>('http://localhost:5286/api/PrixBase', data);
  }
}