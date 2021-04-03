import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Observable, of } from 'rxjs';
import { User } from '../authentication/user.interface';

@Component({
  selector: 'jungle-master-class',
  templateUrl: './master-class.component.html',
  styleUrls: ['./master-class.component.scss'],
})
export class MasterClassComponent implements OnInit {
  isLoggedIn$: Observable<User>;
  videoLink: string;
  emailVerified: boolean;
  dbUser: User;
  constructor(private auth: AuthService) {
    this.emailVerified = this.auth.emailVerified;
    this.videoLink = this.auth.videoLink;
    this.dbUser = this.auth.dbUser;
  }

  ngOnInit(): void {}
}
