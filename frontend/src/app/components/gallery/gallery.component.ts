import { Component, EventEmitter } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

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
  lazyLoadedImages = new Set<string>();
  uploadProgress: number | null = null;

  constructor(
    private galleryService: GalleryService,
  ) {
    
  }
  ngOnInit() {
    this.fetchUserImages();
  }

  getImageUrl(filePath: string): string{
    return this.galleryService.getImageUrl(filePath);
  }

  fetchUserImages() {
    this.galleryService.getImages().subscribe(
      {
        next : (data) => {
          this.images = data
        },
        error : (e) => {
          console.log('Error fetching image',e);
        }
      }
    );
  }
  observeImageVisibility() {
    // Use Intersection Observer to track image visibility
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const imagePath = entry.target.getAttribute('src');
          if (imagePath && !this.lazyLoadedImages.has(imagePath)) {
            this.lazyLoadedImages.add(imagePath);
            (entry.target as HTMLImageElement).src = imagePath;
          }
        }
      });
    });

    // Observe all images in the gallery
    this.images.forEach((image) => {
      const imgElement = document.querySelector(`img[src^="/api/images/${image.path.split('/').pop()}"]`);
      if (imgElement) {
        observer.observe(imgElement);
      }
    });
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  // downloadImage(image: any) {
  //   this.galleryService.downloadImage(image.filePath);
  // }
  downloadImage(imagePath: string) {
    this.galleryService.downloadImage(imagePath).subscribe(
      (blob : Blob)=>{
        const blobUrl = window.URL.createObjectURL(blob);
    // Create a temporary anchor element
    const anchor = document.createElement('a');
    // Set the anchor's href to the blob URL
    anchor.href = blobUrl;
    // Set the anchor's download attribute to specify the filename for the download
    anchor.download = 'image.png'; // You can set a default filename here
    // Programmatically click the anchor element to trigger the download
    anchor.click();
    // Clean up by revoking the blob URL
    window.URL.revokeObjectURL(blobUrl);
  }, (error: any) => {
    console.error('Error downloading image:', error);
    // Handle the error as needed
  });
      }
    
  

  uploadImage(event : Event) {
    if (this.selectedFile) {
      this.uploadProgress = 0;
      this.galleryService.uploadImage(this.selectedFile).pipe(
        finalize(() => {
          this.uploadProgress = null;
          this.fetchUserImages();
        })
      )
      .subscribe(
        (response) => {
          this.images.push(response);
          this.selectedFile = null;
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
      this.galleryService.getUploadProgress$().subscribe((progress) => {
        this.uploadProgress = progress;
      });
    }
  }


}