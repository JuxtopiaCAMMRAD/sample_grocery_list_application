import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    logout(){
       this.authService.user = null;
       this.router.navigate(['login']);
    }

}
