import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-manage-grocery-list',
  templateUrl: './manage-grocery-list.component.html',
  styleUrls: ['./manage-grocery-list.component.css']
})
export class ManageGroceryListComponent implements OnInit {

  grocery_list = [];
  grocery_item = {text:"", quantity:0, user_id: ""};

  constructor(private authService: AuthService,  private http: HttpClient) {
    
        //Check is user is logged in else navigate to login page
        if(!authService.isLoggedIn()){
            this.router.navigate(['login']);
        }

        this.grocery_item.user_id = this.authService.user['USER_ID'];
            
            
           var url = 'http://localhost:8080/get/grocery_items/by/user?user_id=' + this.authService.user['USER_ID']; 

           //Retrieve all existing grocery items for this user
          this.http.get(url).subscribe(
                                                            (data) => {
                                                                console.log(data);

                                                                this.grocery_list = data['payload'];

                                                           
                                                            },
                                                            (error) => { 
                                                              }
                                        );
        
        
    
   }

   AddNewGroceryItem(){
        
            var url = 'http://localhost:8080/api/create/grocery_item'; 

            this.http.post(url, this.grocery_item)
                    .subscribe(
                        (data) => {
                            console.log(data);

                                 var url = 'http://localhost:8080/get/grocery_items/by/user?user_id=' + this.authService.user['USER_ID']; 

                            this.http.get(url).subscribe(
                                                            (data) => {
                                                                console.log(data);

                                                                this.grocery_list = data['payload'];

                                                           
                                                            },
                                                            (error) => { 
                                                              }
                                        );
                        },
                        (error) => { 
                          }
                    );

    }

    RemoveGroceryItem(item_id){
        
            var url = 'http://localhost:8080/api/delete/grocery_item?grocery_item_id=' + item_id; 

            this.http.delete(url)
                    .subscribe(
                        (data) => {
                            console.log(data);

                                 var url = 'http://localhost:8080/get/grocery_items/by/user?user_id=' + this.authService.user['USER_ID']; 

                            this.http.get(url).subscribe(
                                                            (data) => {
                                                                console.log(data);

                                                                this.grocery_list = data['payload'];

                                                           
                                                            },
                                                            (error) => { 
                                                              }
                                        );
                        },
                        (error) => { 
                          }
                    );

    }

  ngOnInit() {
  }

}
