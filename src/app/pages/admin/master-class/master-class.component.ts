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
export class MasterClassComponent implements OnInit {
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
  public discount: boolean;
  discountEnds: number;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getUsers();
    // this.getDiscounts();
    this.getSorted();
  }

  getUsers() {
    this.adminService
      .getCollectionFromDb('users')
      .pipe(take(1))
      .subscribe((users) => {
        this.users = users;
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changePurchasedState(isChecked, user: User) {
    const userInfo: User = {
      ...user,
      isPurchased: isChecked,
    };
    this.adminService.updateDataBaseDocument(userInfo, `users/${user.uid}`);
  }

  startDiscount(discountAmount: string) {
    if (discountAmount === '') {
      return;
    }
    const data = {
      startTime: new Date().getTime(),
      amount: discountAmount,
    };
    this.adminService.setToDataBase(data, 'discounts/');
  }

  getSorted() {
    this.adminService
      .getAndSort('discounts', 'startTime', 'desc', 1)
      .valueChanges()
      .subscribe((res: any) => {
        const treeDay = 3 * 24 * 60 * 60 * 1000;
        this.discountEnds = res[0].startTime + treeDay;
        console.log('this.discountEnds', this.discountEnds);
        this.discount = new Date().getTime() > this.discountEnds;
      });
  }
}
