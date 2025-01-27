import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';

// components
import { LoginComponent } from './login/login.component';
import { AuthService } from './service/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

// route Path
const routes: Routes = [

  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      }
    ]
  }
];


@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes),ToastrModule,
    ReactiveFormsModule],
  exports: [RouterModule],
  declarations: [AuthComponent, LoginComponent],
  providers: [AuthService]
})
export class AuthModule { }
