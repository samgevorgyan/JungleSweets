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
    this.homeService.getAllAssortments(path).subscribe((res) => {
      this.assortmentsArray = [];
      res.forEach((item) => {
        const imageToShow = item.urls.find((image) => image.main === true);

        this.assortmentsArray.push({
          imageToShow: imageToShow ? imageToShow.url : item.urls[0].url,
          amTitle: item.title.am,
          enTitle: item.title.en,
          amDescription: item.description.am,
          enDescription: item.description.en,
          price: item.price,
          id: item.id,
        });
      });
    });
  }
}
