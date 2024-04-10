import { Component } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  images: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private galleryService: GalleryService
  ) {
    this.fetchUserImages();
  }

  getImageUrl(filePath: string): string{
    return this.galleryService.getImageUrl(filePath);
  }

  fetchUserImages() {
    this.galleryService.getImages().subscribe(
      {
        next : (data) => {
          this.images = data;
        },
        error : (e) => {
          console.log('Error fetching image',e);
        }
      }
    );
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  downloadImage(image: any) {
    this.galleryService.downloadImage(image.filePath);
  }


  uploadImage() {
    if (this.selectedFile) {
      this.galleryService.uploadImage(this.selectedFile).subscribe(
        (response) => {
          this.images.push(response);
          this.selectedFile = null;
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }


}