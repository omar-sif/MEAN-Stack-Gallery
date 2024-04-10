import { HttpClient } from '@angular/common/http';
import { Injectable, createPlatform } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  
  authToken : any; 
  user : any;
  expiration : any ;


  private apiUrl = 'http://localhost:8000/auth/login';

  constructor( private http : HttpClient) {
   }

   loginUser(user : any){

    return this.http.post(this.apiUrl, user);

   }

   getProfile(){

    let headers = new Headers();
    this.loadToken()
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:8000/user/profile');

   }

   loadToken(){
    const token = localStorage.getItem('token_id');
    this.authToken = token;
   }

   public isLoggedIn(){
    return moment().isBefore(this.expiration);
   }

   storeUser( token : any, expiresAt : any , user : any ){
    if (expiresAt){
      const duration = moment.duration(parseInt(expiresAt), 'hour');
      const expiration = moment().add(duration);
      this.expiration = expiration  ;
      localStorage.setItem('expires_at',JSON.stringify(expiration.valueOf()) );
    }
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
