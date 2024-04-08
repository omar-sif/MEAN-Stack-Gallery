import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators"; 


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8000/auth/register';

  user : any ;

  constructor( private http : HttpClient) { }
  
  createUser(user : any){

    return this.http.post(this.apiUrl, user);
      

  }

}
