import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../services/register.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registerService : RegisterService
  ) {
    this.signUpForm = this.formBuilder.group({
      username: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if(this.signUpForm.valid){
      console.log('hi');
      const user = {username : this.signUpForm.value.username , pwd : this.signUpForm.value.password};
      this.registerService.createUser(user).subscribe(
       {
        next : (res)=>{console.log(res)},
        error : (e) => { console.error("Cant create user", e)},
        complete : () =>{console.log('Complete')}
       }
      ) 
      

    }
  }
}
