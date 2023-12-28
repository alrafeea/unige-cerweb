import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-user-summary',
  templateUrl: './user-summary.component.html',
  styleUrls: ['./user-summary.component.scss']
})
export class UserSummaryComponent implements OnInit {
  constructor(public auth: AuthService, private dialog: MatDialog) {}

  ngOnInit() {}

  loginModal() {
    let dialogRef: MatDialogRef<LoginComponent>;
    dialogRef = this.dialog.open(LoginComponent, {
      width: '380px',
      disableClose: true,
      panelClass: 'login-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      } else {
        console.log('not auth');
      }
    });
  }
}
