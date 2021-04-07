import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { User } from '../authentication/user.interface';
import { LanguageService } from '../../shared/services/language.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'jungle-master-class',
  templateUrl: './master-class.component.html',
  styleUrls: ['./master-class.component.scss'],
})
export class MasterClassComponent implements OnInit {
  videoLink: string;
  emailVerified: boolean;
  dbUser: User;
  @ViewChild('video') video: ElementRef;

  constructor(
    private auth: AuthService,
    private languageService: LanguageService,
    private http: HttpClient
  ) {
    this.emailVerified = this.auth.emailVerified;

    this.videoLink = this.auth.videoLink;
    // const dd = (window.URL || window.webkitURL).createObjectURL(this.videoLink);
    // console.log('dd', dd);
  }

  ngOnInit(): void {
    this.languageService.changeLanguage('am');
    this.languageService.emitLanguageChange('am');

    setTimeout(() => {
      this.dbUser = this.auth.dbUser;
    }, 300);
  }

  preventContextMenu(e: MouseEvent) {
    return false;
  }
}
