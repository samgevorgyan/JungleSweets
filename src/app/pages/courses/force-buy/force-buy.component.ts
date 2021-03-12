import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}

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
    }, 5000);
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
}
