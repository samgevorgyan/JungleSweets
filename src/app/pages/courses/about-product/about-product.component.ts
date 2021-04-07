import { Component, OnInit } from '@angular/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'jungle-about-product',
  templateUrl: './about-product.component.html',
  styleUrls: ['./about-product.component.scss'],
})
export class AboutProductComponent implements OnInit {
  constructor(
    private localize: LocalizeRouterService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  navigateByUrl(url) {
    this.authService.isSignIn = false;
    const urlToNavigate: any = this.localize.translateRoute(url);
    this.router.navigate([urlToNavigate]);
  }
}
