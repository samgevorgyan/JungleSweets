import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'main-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
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
