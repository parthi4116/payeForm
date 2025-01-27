import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import this

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { AuthService } from './auth/service/auth.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center', // Change position here
      timeOut: 3000,
      preventDuplicates: true,
    }),
    AppRoutingModule, ReactiveFormsModule,FormsModule,
    MatInputModule, MatSelectModule, BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
