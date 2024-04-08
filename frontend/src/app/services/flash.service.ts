import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FlashMessage {
  type: 'success' | 'error' | 'info';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class FlashService {
  private flashMessage = new BehaviorSubject<FlashMessage | null>(null);

  getFlashMessage() {
    return this.flashMessage.asObservable();
  }

  setFlashMessage(type: 'success' | 'error' | 'info', message: string) {
    const flashMessage: FlashMessage = { type, message };
    this.flashMessage.next(flashMessage);
    localStorage.setItem('flashMessage', JSON.stringify(flashMessage));
  }

  clearFlashMessage() {
    this.flashMessage.next(null);
    localStorage.removeItem('flashMessage');
  }
}