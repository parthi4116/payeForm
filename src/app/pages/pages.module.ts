import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';  // Import MatDialogModule
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

// components
import { AccountDetailsComponent } from './account-details/account-details.component';
import { FundTransferComponent } from './fund-transfer/fundTransfer.component';
import { HeaderComponent } from './header/header.component';
import { ChangePasswordPopupComponent } from './header/change-password-popup/change-password-popup.component';

// service
import { AuthService } from '../auth/service/auth.service';
import { ChildGuard } from '../auth/garuds/child.garud';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [

  {
    path: '',
    component: PagesComponent,
    canActivateChild: [ChildGuard],
    children: [

      {
        path: '',
        component: FundTransferComponent,
      }, {
        path: 'accountinfo',
        component: AccountDetailsComponent,
      },
      {
        path: 'payerdetail/:accNum',
        component: AccountDetailsComponent,
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToastrModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule],

  providers: [AuthService],

  declarations: [
    PagesComponent,
    HeaderComponent,
    AccountDetailsComponent,
    FundTransferComponent,
    ChangePasswordPopupComponent]
})
export class PagesModule { }
