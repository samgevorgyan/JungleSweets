import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageService } from '../../../../shared/services/language.service';
import { HomeService } from '../../home.service';
import { NgImageSliderComponent } from 'ng-image-slider';
import { ActivatedRoute } from '@angular/router';
import { Assortment } from '../../../../models/assortments.interface';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'jungle-show-assortment',
  templateUrl: './show-assortment.component.html',
  styleUrls: ['./show-assortment.component.scss'],
})
export class ShowAssortmentComponent implements OnInit {
  assortment: Assortment;
  showContent = false;
  assortmentSliderArray = [];
  currentLanguage$: Observable<string>;
  showAllText = false;
  isBrowser = false;
  assortmentId: string;
  @ViewChild('carousel') carousel: NgImageSliderComponent;
  constructor(
    private homeService: HomeService,
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    this.assortmentId = this.route.snapshot.paramMap.get('id');
    this.currentLanguage$ = this.languageService.languageFromUrl$;
    this.setTitleMeta();
    this.getAssortmentById();
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
  }

  getAssortmentById() {
    this.homeService
      .getAssortmentById(this.assortmentId)
      .subscribe((assortment: Assortment) => {
        this.assortment = assortment;
        this.assortment.urls.forEach((element) => {
          this.assortmentSliderArray.push({
            image: element.url,
            thumbImage: element.url,
            alt: this.assortmentId,
          });
          this.showContent = true;
        });
      });
  }
  imagesCarousel(index: number) {
    this.carousel.imageOnClick(index);
    setTimeout(() => {
      this.carousel.imageOnClick(index);
    });
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
  }
}
