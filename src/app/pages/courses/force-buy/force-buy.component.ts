import { Component, OnInit } from '@angular/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'jungle-force-buy',
  templateUrl: './force-buy.component.html',
  styleUrls: ['./force-buy.component.scss'],
})
export class ForceBuyComponent implements OnInit {
  time = 24 * 3 * 60 * 60 * 1000;
  display;
  interval;
  public showTimer = true;

  constructor(
    private localize: LocalizeRouterService,
    private router: Router,
    private funct: AngularFireFunctions
  ) {}

  ngOnInit(): void {
    this.startTimer();
    // const fun = this.funct.httpsCallable('stripeCreateCharge');
    // fun({}).subscribe((res) => {
    //   console.log('res', res);
    // });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.showTimer = false;
        clearInterval(this.interval);
      }
      this.time -= 1000;
      const tempDate = this.transform(this.time);

      this.display =
        tempDate.d + ':' + tempDate.h + ':' + tempDate.m + ':' + tempDate.s;
      console.log('asd', tempDate);
    }, 1000);
  }

  transform(milliseconds: number) {
    let days: number;
    let hours: number;
    let minutes: number;
    let seconds: number;
    let totalHours: number;
    let totalMinutes: number;
    let totalSeconds: number;

    totalSeconds = Math.floor(milliseconds / 1000);
    totalMinutes = Math.floor(totalSeconds / 60);
    totalHours = Math.floor(totalMinutes / 60);
    days = Math.floor(totalHours / 24);

    seconds = totalSeconds % 60;
    minutes = totalMinutes % 60;
    hours = totalHours % 24;

    return { d: days, h: hours, m: minutes, s: seconds };
  }

  navigateByUrl(url) {
    const urlToNavigate: any = this.localize.translateRoute(url);
    this.router.navigate([urlToNavigate]);
  }
}
