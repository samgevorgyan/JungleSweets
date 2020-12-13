import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Assortment,
  AssortmentUrl,
} from '../../../models/assortments.interface';
import { AdminComponent } from '../admin.component';
import { AdminService } from '../admin.service';
import { FbDatabasePathsPaths } from '../../../enums/fbDatabasePaths';
import { FbStoragePaths } from '../../../enums/fbStoragePaths';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'jungle-assortment',
  templateUrl: './assortment-admin.component.html',
  styleUrls: ['./assortment-admin.component.scss'],
})
export class AssortmentAdminComponent implements OnInit {
  assortments: Array<Assortment> = [];
  addNewAssortment: Assortment;
  assortmentsImages: Array<AssortmentUrl> = [];
  amTitle = '';
  enTitle = '';
  enDescription = '';
  amDescription = '';
  uploadedFiles: File[] = [];
  price = '';
  deletedUrls: string[] = [];

  idForUpdate: string | null = null;
  isLoading = false;
  assortmentUploadInput: any;
  constructor(
    public adminService: AdminService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getAssortments(FbDatabasePathsPaths.assortments);
    }
  }
  getAssortments(path: string) {
    this.adminService
      .getCollectionFromDb(path)
      .subscribe((assortment: Assortment[]) => {
        this.assortments = [...assortment];
      });
  }

  uploadAssortmentFiles(event: any, path: string) {
    if (event.target.files.length === 0) {
      return;
    }
    [...event.target.files].forEach((file) => {
      this.uploadedFiles.push(file);
      this.adminService.imageRender(file).subscribe(
        (base64tempUrl: string) => {
          // this.oldRealImageUrl = this.aboutMe.url;

          this.assortmentsImages.push({
            url: base64tempUrl,
            main: false,
            name: {
              am: '',
              en: '',
            },
            price: '',
          });
        },
        (noAcceptable) => {
          alert(noAcceptable);
        }
      );
    });
    // Array.from(event.target.files).forEach((file: File) => {
    //   this.adminService.uploadFile(file, path);
    // });
  }
  manageUrls() {
    return new Promise((resolve) => {
      Promise.all(
        this.uploadedFiles.map((file: File, index: number) =>
          this.adminService.uploadFile(file, FbStoragePaths.assortmentImage)
        )
      ).then((urlsFromFb: string[]) => {
        const indexDelta =
          this.assortmentsImages.length - this.uploadedFiles.length;
        urlsFromFb.forEach((url: string, index: number) => {
          this.assortmentsImages[index + indexDelta].url = url;
        });
        resolve('');
      });
    });
  }
  async addNewAssortmentFunc() {
    this.isLoading = true;
    if (
      this.amTitle === '' ||
      this.enTitle === '' ||
      this.enDescription === '' ||
      this.amDescription === '' ||
      this.price === ''
    ) {
      return;
    }

    if (this.uploadedFiles.length !== 0) {
      await this.manageUrls();
    }
    this.addNewAssortment = {
      title: {
        am: this.amTitle ? this.amTitle : '',
        en: this.enTitle ? this.enTitle : '',
      },
      description: {
        am: this.amDescription,
        en: this.enDescription,
      },
      price: this.price,
      urls: this.assortmentsImages,
    };
    if (this.idForUpdate === null) {
      this.adminService
        .setToDataBase(this.addNewAssortment, FbDatabasePathsPaths.assortments)
        .then((_) => {
          this.isLoading = false;
          this.resetForm();
        });
    } else {
      this.adminService
        .updateDataBaseDocument(
          this.addNewAssortment,
          `${FbDatabasePathsPaths.assortments}/${this.idForUpdate}`
        )
        .then((res) => {
          // delete assortment url from db
          if (this.deletedUrls.length !== 0) {
            this.deletedUrls.forEach((url) => {
              this.adminService
                .deleteImageFromStorage(FbStoragePaths.assortmentImage, url)
                .then((response) => {
                  this.isLoading = false;
                  this.resetForm();
                });
            });
          } else {
            this.isLoading = false;
            this.resetForm();
          }
        });
    }
  }
  resetForm() {
    this.amTitle = '';
    this.enTitle = '';
    this.amDescription = '';
    this.enDescription = '';
    this.price = '';
    this.assortmentsImages = [];
    this.idForUpdate = null;
    this.assortmentUploadInput = '';
    this.uploadedFiles = [];
    this.deletedUrls = [];
  }
  editAssortment(item: any, el: HTMLElement) {
    this.amTitle = item.title.am;
    this.enTitle = item.title.en;
    this.amDescription = item.description.am;
    this.enDescription = item.description.en;
    this.price = item.price;
    this.assortmentsImages = [...item.urls];
    this.idForUpdate = item.id;
    el.scrollIntoView();
  }
  makeMainImage(i: number) {
    this.assortmentsImages.forEach((assortmentUrl: AssortmentUrl) => {
      assortmentUrl.main = false;
    });
    this.assortmentsImages[i].main = true;
  }
  deleteAssortment(id: string, path: string, url: string) {
    // this.adminService.deleteFromStorageAndDb(id, path, url).then((res) => {
    //   console.log('resssssssss', res);
    // });
  }
  deleteAssortmentImage(index: number, url: string) {
    const indexDelta =
      this.assortmentsImages.length - this.uploadedFiles.length;
    this.assortmentsImages.splice(index, 1);
    if (!url.includes('base64')) {
      this.deletedUrls.push(url);
    } else {
      this.uploadedFiles.splice(index - indexDelta, 1);
    }
    console.log('this.uploadedFiles', this.uploadedFiles);
    console.log('this.assortmentsImages', this.assortmentsImages);
  }
}
