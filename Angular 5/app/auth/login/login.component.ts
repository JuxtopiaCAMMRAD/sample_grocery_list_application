import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

      user = {
        email: '',
        password: ''
      };


  constructor(private authService: AuthService, private router: Router, public snackBar: MatSnackBar) { 
    
        if(authService.isLoggedIn()){
            this.router.navigate(['dashboard/manage/grocery_list']);
        }
    
  }

  ngOnInit() {
  }

    login() {
      this.authService.login(this.user.email, this.user.password).subscribe(
                            (data) => {
                                 this.authService.user = data['user'];
                                console.log("Login successfull...");
                                console.log(this.authService.user);
                                alert("Log in successful");
                                this.router.navigate(['dashboard/manage/grocery_list']);

                            },
                            (error) => {
                                console.log(error);
                                alert("Log was  not successful. Please retry!");

                                });

    }

}
