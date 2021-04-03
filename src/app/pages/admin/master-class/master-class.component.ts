import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';

import { User } from '../../authentication/user.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { take } from 'rxjs/operators';

@Component({
  selector: 'jungle-master-class',
  templateUrl: './master-class.component.html',
  styleUrls: ['./master-class.component.scss'],
})
export class MasterClassComponent implements OnInit, AfterViewInit {
  users: Array<User>;
  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'email',
    'isPurchased',
  ];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.adminService
      .getCollectionFromDb('users')
      .pipe(take(1))
      .subscribe((users) => {
        this.users = users;
        this.dataSource = new MatTableDataSource(users);
        console.log('this.userds', this.users);
      });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changePurchasedState(isChecked, user: User) {
    console.log('e', isChecked);
    console.log('user', user);
    const userInfo: User = {
      ...user,
      isPurchased: isChecked,
    };
    this.adminService.updateDataBaseDocument(userInfo, `users/${user.uid}`);
  }
}
