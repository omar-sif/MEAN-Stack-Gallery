import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FlashMessage, FlashService } from '../../services/flash.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-flash',
  standalone : true, 
  imports : [CommonModule],
  templateUrl:'./flash.component.html',
  styleUrls: ['./flash.component.scss']
})
export class FlashComponent implements OnInit, OnDestroy {
  flashMessage: FlashMessage | null = null;
  private subscription: Subscription | null = null;
  private timeoutId: any;

  constructor(private flashService: FlashService) {}

  ngOnInit() {
    this.subscription = this.flashService.getFlashMessage().subscribe((message) => {
      this.flashMessage = message;
      this.startFadeTimer();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.clearFadeTimer();
  }

  private startFadeTimer() {
    this.clearFadeTimer();
    this.timeoutId = setTimeout(() => {
      this.flashMessage = null;
    }, 3000);
  }

  private clearFadeTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}