import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { LanguageService } from 'src/app/shared/services/language.service';
import { Observable } from 'rxjs';
import { HomeService } from '../home.service';

@Component({
  selector: 'jungle-assortment',
  templateUrl: './assortment.component.html',
  styleUrls: ['./assortment.component.scss'],
})
export class AssortmentComponent implements OnInit {
  assortmentsArray = [];
  currentLanguage$: Observable<string>;
  showAllText = false;

  constructor(
    private homeService: HomeService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.getAssortmentImagesUrl('assortments');
    this.currentLanguage$ = this.languageService.languageFromUrl$;
  }

  getAssortmentImagesUrl(path: string) {
    this.homeService.getAssortmentImages(path).subscribe((res) => {
      this.assortmentsArray = [];
      res.forEach((item) => {
        const imageToShow = item.data.urls.find((image) => image.main === true);
        this.assortmentsArray.push({
          imageToShow: imageToShow.url,
          amTitle: item.data.title.am,
          enTitle: item.data.title.en,
          amDescription: item.data.description.am,
          enDescription: item.data.description.en,
          price: item.data.price,
          id: item.id,
        });
      });
    });
  }
}
