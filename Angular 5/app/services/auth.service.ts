import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  public user = null;
  
  constructor(private router: Router, private http: HttpClient) {}

  login(email, password) {
    
     var data =  {email:email, password:password };

     return this.http.post('http://localhost:8080/api/login', data);                            
        
  }

 

  isLoggedIn() { 

  if (this.user == null ) {
      return false;
    } else {
      return true;
    }

  }


  logout() {
        this.user = null;
  }
}