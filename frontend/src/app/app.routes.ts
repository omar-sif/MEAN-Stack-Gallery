import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path : '' , component : SignupComponent},
    {path : 'signin' , component : SigninComponent},
    {path : 'gallery' , component : GalleryComponent, canActivate:[authGuard]},

];
