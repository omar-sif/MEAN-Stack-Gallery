import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  
  authToken : any; 
  user : any;


  private apiUrl = 'http://localhost:8000/auth/login';

  constructor( private http : HttpClient) {
   }

   loginUser(user : any){

    return this.http.post(this.apiUrl, user);

   }
   storeUser( token : any , user : any ){
    localStorage.setItem('token_id', token);
    localStorage.setItem('user', user);
    this.authToken = token ;
    this.user = user ;
   }
   logout(){
    this.authToken = null ; 
    this.user = null;
    localStorage.clear();
   }
}
