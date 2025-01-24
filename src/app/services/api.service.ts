import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api/creator/upload-ip';

  constructor(private http: HttpClient) {}

  uploadData(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }
}
