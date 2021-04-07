import { Component, OnInit } from '@angular/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Component({
  selector: 'jungle-force-buy',
  templateUrl: './force-buy.component.html',
  styleUrls: ['./force-buy.component.scss'],
})
export class ForceBuyComponent implements OnInit {
  public showTimer: boolean;
  discountAmount = 24900;
  treeDayDelta: number;

  constructor(
    private localize: LocalizeRouterService,
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService,
    private languageService: LanguageService,
    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.getAndSort();
    this.languageService.languageFromUrl$.subscribe((lang) => {
      if (document.getElementById('canvas_div')) {
        document.getElementById('canvas_div').innerHTML = '';
        if (this.showTimer) {
          setTimeout(() => {
            this.timer(this.treeDayDelta);
          }, 200);
        }
      }
    });
  }

  timer(treeDayDelta) {
    const ringer = {
      rings: {
        DAYS: {
          s: 86400000, // mseconds in a day,
          max: 365,
          label: this.translate.instant('COURSES.FORCE_BY.DAYS'),
        },
        HOURS: {
          s: 3600000, // mseconds per hour,
          max: 24,
          label: this.translate.instant('COURSES.FORCE_BY.HOURS'),
        },
        MINUTES: {
          s: 60000, // mseconds per minute
          max: 60,
          label: this.translate.instant('COURSES.FORCE_BY.MINUTES'),
        },
        SECONDS: {
          s: 1000,
          max: 60,
          label: this.translate.instant('COURSES.FORCE_BY.SECONDS'),
        },
      },
      r_count: 4,
      r_spacing: 10, // px
      r_size: 65, // px
      r_thickness: 4, // px
      update_interval: 50, // ms
      cvs: undefined,
      size: undefined,
      actual_size: undefined,
      countdown_to_time: treeDayDelta,
      time: undefined,

      init: () => {
        const $r = ringer;
        $r.cvs = document.createElement('canvas');
        $r.size = {
          w:
            ($r.r_size + $r.r_thickness) * $r.r_count +
            $r.r_spacing * ($r.r_count - 1),
          h: $r.r_size + $r.r_thickness,
        };

        $r.cvs.setAttribute('width', $r.size.w);
        $r.cvs.setAttribute('height', $r.size.h);
        $r.cvs.setAttribute('id', 'timer');
        $r.ctx = $r.cvs.getContext('2d');
        document.getElementById('canvas_div').appendChild($r.cvs);
        // document.body.appendChild($r.cvs);
        $r.cvs = document.querySelector('#timer');
        $r.ctx.textAlign = 'center';
        $r.actual_size = $r.r_size + $r.r_thickness;
        $r.go();
      },
      ctx: null,
      go: () => {
        let idx = 0;
        const $r = ringer;
        $r.time = new Date().getTime() - $r.countdown_to_time;

        for (const rKey in $r.rings)
          $r.unit(idx++, $r.rings[rKey].label, $r.rings[rKey]);

        setTimeout($r.go, $r.update_interval);
      },
      unit: (idx, label, ring) => {
        const $r = ringer;

        let x;
        let y;
        let value;
        const ringSecs = ring.s;
        value = parseFloat(String($r.time / ringSecs));
        // tslint:disable-next-line:radix
        $r.time -= Math.round(parseInt(value)) * ringSecs;
        value = Math.abs(value);

        x = $r.r_size * 0.5 + $r.r_thickness * 0.5;
        x += +(idx * ($r.r_size + $r.r_spacing + $r.r_thickness));
        y = $r.r_size * 0.5;
        y += $r.r_thickness * 0.5;

        // calculate arc end angle
        const degrees = 360 - (value / ring.max) * 360.0;
        const endAngle = degrees * (Math.PI / 180);

        $r.ctx.save();

        $r.ctx.translate(x, y);
        $r.ctx.clearRect(
          $r.actual_size * -0.5,
          $r.actual_size * -0.5,
          $r.actual_size,
          $r.actual_size
        );

        // first circle
        $r.ctx.strokeStyle = 'rgba(128,128,128,0.2)';
        $r.ctx.beginPath();
        $r.ctx.arc(0, 0, $r.r_size / 2, 0, 2 * Math.PI, 2);
        $r.ctx.lineWidth = $r.r_thickness;
        $r.ctx.stroke();

        // second circle
        $r.ctx.strokeStyle = '#c19d56';
        $r.ctx.beginPath();
        $r.ctx.arc(0, 0, $r.r_size / 2, 0, endAngle, 1);
        $r.ctx.lineWidth = $r.r_thickness;
        $r.ctx.stroke();

        // label
        $r.ctx.fillStyle = '#000000';

        $r.ctx.font = '10px Helvetica';
        $r.ctx.fillText(label, 0, 18);
        $r.ctx.fillText(label, 0, 18);

        $r.ctx.font = 'bold 30px Helvetica';
        $r.ctx.fillText(Math.floor(value), 0, 2);

        $r.ctx.restore();
      },
    };

    ringer.init();
  }

  getAndSort() {
    this.afs
      .collection('discounts', (ref) =>
        ref.orderBy('startTime', 'desc').limit(9)
      )
      .valueChanges()
      .pipe(take(1))
      .subscribe((res: any) => {
        this.discountAmount = res[0].amount;
        const treeDay = 3 * 24 * 60 * 60 * 1000;
        this.treeDayDelta = res[0].startTime + treeDay;
        this.showTimer = new Date().getTime() < this.treeDayDelta;
        if (this.showTimer) {
          setTimeout(() => {
            this.timer(this.treeDayDelta);
          }, 100);
        }
      });
  }

  navigateByUrl(url) {
    this.authService.isSignIn = false;
    const urlToNavigate: any = this.localize.translateRoute(url);
    this.router.navigate([urlToNavigate]);
  }
}
