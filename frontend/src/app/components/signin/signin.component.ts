import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SigninService } from '../../services/signin.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FlashMessage, FlashService } from '../../services/flash.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  signInForm : FormGroup;
  errorMessage ?: String ; 
  flashMessage : FlashMessage | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private signinService : SigninService,
    private router : Router,
    private flashService : FlashService

  ){
    this.signInForm = this.formBuilder.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
    this.flashService.getFlashMessage().subscribe((message) => {
      this.flashMessage = message;
    });

  }
  

  onSubmit(){
    if (this.signInForm.valid){
      const user = {username : this.signInForm.value.username, pwd : this.signInForm.value.password};
      this.signinService.loginUser(user)
        .pipe(
          catchError( (error : HttpErrorResponse) =>{
            if (error.status === 401){
              this.flashService.setFlashMessage('error', 'Invalid email or password');
            }
            else {
              this.flashService.setFlashMessage('error', 'An error occurred. Please try again later.');            }
            return throwError(error);
          })
        )
        .subscribe(
        {
          next : (res : any )=>{
            
              this.flashService.setFlashMessage('success', 'Logged in Successfully');
              this.router.navigate(['/gallery']);
              this.signinService.storeUser(res.token , res.expiresIn, user.username)
            
            
          },
          error : (e)=>{
            console.error('Couldnt login', e );

        }
    })

    }
  }


}
