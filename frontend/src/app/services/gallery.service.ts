import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private apiUrl = 'http://localhost:8000/gallery';
  private imageBaseUrl = '/images/';

  constructor(private http: HttpClient) {}

  getImages(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    console.log(headers)
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  getImageUrl(filePath: string): string {
    return `${this.imageBaseUrl}${filePath}`;
  }

  uploadImage(image: File): Observable<any> {

    const headers = this.getAuthHeaders();
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<any>(this.apiUrl, formData, {headers});
  }
  downloadImage(filePath: string): void {

    const imageUrl = this.getImageUrl(filePath);
    window.open(imageUrl, '_blank');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token_id');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
  

  // deleteImage(imageId: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${imageId}`);
  // }
}
