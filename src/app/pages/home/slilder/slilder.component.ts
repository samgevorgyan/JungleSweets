import { Subject } from 'rxjs';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';

import { Observable } from 'rxjs';
import { tap, shareReplay, map } from 'rxjs/operators';
import { NgImageSliderComponent } from 'ng-image-slider';
import { AngularFirestore } from '@angular/fire/firestore';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { FbDatabasePathsPaths } from '../../../enums/fbDatabasePaths';
import { Slider } from '../../../models/slider.interface';
export interface Item {
  url: string;
}
@Component({
  selector: 'jungle-slilder',
  templateUrl: './slilder.component.html',
  styleUrls: ['./slilder.component.scss'],
})
export class SlilderComponent implements OnInit {
  @ViewChild('nav') slider: NgImageSliderComponent;
  isBrowser = false;
  imageObject: Array<{ thumbImage: string; alt: string }> = [];
  constructor(
    private afs: AngularFirestore,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    this.getSliderImagesUrl(FbDatabasePathsPaths.sliderImg);
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
  }

  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }

  getSliderImagesUrl(path: string) {
    this.afs
      .collection<any>(path)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
      .subscribe((res: any) => {
        res[0].urls.forEach((item) => {
          console.log('res', res);
          this.imageObject.push({
            thumbImage: item,
            alt: item,
          });
        });
      });
  }
}
