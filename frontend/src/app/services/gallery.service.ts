import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private apiUrl = 'http://localhost:8000/gallery';
  private uploadProgress$ = new Subject<number>();

  constructor(private http: HttpClient) {}

  getImages(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  getImageUrl(filePath: string): string {
    return `http://localhost:8000/images/${filePath}`;
  }

  uploadImage(image: File): Observable<{ path: string }> {
    const headers = this.getAuthHeaders();
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<{ path: string }>(this.apiUrl, formData, {headers} ).pipe(
      tap((response) => {
        this.uploadProgress$.next(100); // Notify 100% progress on successful upload
      })
    );
  }

  getUploadProgress$() {
    return this.uploadProgress$.asObservable();
  }
  downloadImage(filePath: string): Observable<Blob> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/download?path=${encodeURIComponent('/'+filePath)}`;
    console.log(url);
    return this.http.get(url, { responseType: 'blob' , headers});
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token_id');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
  

  // deleteImage(imageId: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${imageId}`);
  // }
}
