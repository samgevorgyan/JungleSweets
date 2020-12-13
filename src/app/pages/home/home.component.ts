import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    // console.log('this.route   ', this.route);
    // this.router.navigate(['../../admin'], { relativeTo: this.route });
    this.setTitleMeta();
  }

  setTitleMeta() {
    this.titleService.setTitle('Jungle Sweets home');
    this.metaService.addTag({
      name: 'og:url',
      content: 'https://www.junglesweets.com/en/home',
    });
    this.metaService.addTag({
      name: 'og:type',
      content: 'article',
    });
    this.metaService.addTag({
      name: 'og:title',
      content: 'Jungle Sweets',
    });
    this.metaService.addTag({
      name: 'og:description',
      content:
        'You can order French Macarons, Cheesecake New York, Dessert Pavlova',
    });
    this.metaService.addTag({
      name: 'og:image',
      content:
        'https://firebasestorage.googleapis.com/v0/b/jungle-sweets.appspot.com/o/slider-img%2F1594904160545_05AD86C5-8BC1-4167-9859-1594717A4E66.jpeg%20?alt=media&token=f4239b9f-7ef6-4e3a-8d1c-e888c51bba58',
    });
  }
}
