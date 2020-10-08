import { Component, OnInit } from '@angular/core';
import { MvUserDetail } from './user-detail.model';
import { UserDetailService } from './user-detail.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MvUserDetail[] = [];
  errorMessage = '';

  constructor(private userDetail: UserDetailService) { }

  ngOnInit(): void {
    this.displayedColumns = ['userId', 'firstName', 'lastName', 'email', 'password'];
    this.getUserDetails();
  }

  getUserDetails() {
    // tslint:disable-next-line: radix
    const userId = parseInt(localStorage.getItem('userId'));
    this.userDetail.getUserDetail(userId).subscribe((data: any) => {
      if (data) {
        this.dataSource = [data];
      } else {
        this.dataSource = [];
        this.errorMessage = 'No data';
      }
    });
  }

}

