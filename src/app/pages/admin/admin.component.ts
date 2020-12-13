import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { Observable, Subscription } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { Assortment } from '../../models/assortments.interface';
import { AboutMe } from '../../models/about.me.interface';
import { FbDatabasePathsPaths } from '../../enums/fbDatabasePaths';
import { FbStoragePaths } from '../../enums/fbStoragePaths';
import { Slider } from '../../models/slider.interface';

@Component({
  selector: 'jungle-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  sliderImageUrls$: Observable<Slider[]>;
  subscription = new Subscription();

  constructor(
    public adminService: AdminService,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.getSliderImages(FbDatabasePathsPaths.sliderImg);
  }

  getSliderImages(path: string) {
    this.sliderImageUrls$ = this.adminService.getCollectionFromDb(path);
    // this.sliderImageUrls$.subscribe((res) => {
    //   console.log('res', res);
    // });
  }
  uploadAssortmentFiles(event, id, urls) {
    if (event.target.files.length === 0) {
      return;
    }
    [...event.target.files].forEach((file) => {
      this.adminService.imageRender(file).subscribe(
        (base64tempUrl: string) => {
          this.adminService
            .uploadFile(file, FbStoragePaths.sliderImg)
            .then(async (url) => {
              urls.push(url);
              const path = `${FbDatabasePathsPaths.sliderImg}/${id}`;
              await this.adminService.updateDataBaseDocument({ urls }, path);
            });
        },
        (noAcceptable) => {
          alert(noAcceptable);
        }
      );
    });
  }

  deleteFromSlider(url: string, id: string, data: any, index: number) {
    this.adminService
      .deleteImageFromStorage(FbStoragePaths.sliderImg, url)
      .then(async (res) => {
        data.splice(index, 1);
        const path = `${FbDatabasePathsPaths.sliderImg}/${id}`;
        await this.adminService.updateDataBaseDocument({ urls: data }, path);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
