import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlashMessage, FlashService } from '../../services/flash.service';
import { Router } from '@angular/router';
import { SigninService } from '../../services/signin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  flashMessage : FlashMessage | null = null;

  constructor( 
    private flashService : FlashService,
    private router : Router,
    private signinService : SigninService
  ){
    this.flashService.getFlashMessage().subscribe((message) => {
      this.flashMessage = message;
    });

  }

  onLogoutClick(){

    this.signinService.logout();
    this.flashService.setFlashMessage('success', 'You have been logged out ');            
  }
  isLogged(): boolean {
    return this.signinService.isLoggedIn();
  }
  }


