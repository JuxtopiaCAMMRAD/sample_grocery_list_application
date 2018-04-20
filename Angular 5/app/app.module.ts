import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ManageGroceryListComponent } from './dashboard/manage-grocery-list/manage-grocery-list.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatListModule} from '@angular/material/list';

import {MatGridListModule} from '@angular/material/grid-list';
import { SignupComponent } from './auth/signup/signup.component';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    ManageGroceryListComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule, MatIconModule, MatListModule, MatSnackBarModule, MatMenuModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatChipsModule,MatCardModule,MatGridListModule
  ],
    providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
