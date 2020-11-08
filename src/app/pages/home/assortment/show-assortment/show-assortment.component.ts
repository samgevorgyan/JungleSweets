import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageService } from '../../../../shared/services/language.service';
import { HomeService } from '../../home.service';
import { NgImageSliderComponent } from 'ng-image-slider';
import { ActivatedRoute } from '@angular/router';
import { AssortmentsInterface } from '../../../../models/assortments.interface';

@Component({
  selector: 'jungle-show-assortment',
  templateUrl: './show-assortment.component.html',
  styleUrls: ['./show-assortment.component.scss'],
})
export class ShowAssortmentComponent implements OnInit {
  assortmentArray: AssortmentsInterface;
  showContent = false;
  assortmentSliderArray = [];
  currentLanguage$: Observable<string>;
  showAllText = false;
  assortmentId: string;
  @ViewChild('carousel') carousel: NgImageSliderComponent;
  constructor(
    private homeService: HomeService,
    private languageService: LanguageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.assortmentId = this.route.snapshot.paramMap.get('id');
    this.getAssortmentImagesUrl('assortments');
    this.currentLanguage$ = this.languageService.languageFromUrl$;
  }

  getAssortmentImagesUrl(path: string) {
    this.homeService.getAssortmentImages(path).subscribe((res) => {
      this.assortmentArray = res.find(
        (assortment) => assortment.id === this.assortmentId
      );
      this.showContent = true;
      this.assortmentArray.data.urls.forEach((element) => {
        this.assortmentSliderArray.push({
          image: element.url,
          thumbImage: element.url,
          alt: this.assortmentArray.id,
        });
      });
    });
  }

  imagesCarousel(index: number) {
    this.carousel.imageOnClick(index);
    setTimeout(() => {
      this.carousel.imageOnClick(index);
    });
  }
}
