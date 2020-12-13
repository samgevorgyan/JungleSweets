import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'jungle-order-cake',
  templateUrl: './order-cake.component.html',
  styleUrls: ['./order-cake.component.scss'],
})
export class OrderCakeComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {}

  get isMobile() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];
    if (isPlatformBrowser(this.platformId)) {
      return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
      });
    }
  }
}
