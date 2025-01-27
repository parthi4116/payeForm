import { Component, OnInit } from '@angular/core';
import { ChangePasswordPopupComponent } from './change-password-popup/change-password-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  customPopup: boolean = false;
  constructor(
    public dialog: MatDialog,
    public auth:AuthService) { }  // Inject MatDialog service

  ngOnInit() { }
  openPopup() {
    this.customPopup = !this.customPopup;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ChangePasswordPopupComponent, {width:"500px"});
  }
}
