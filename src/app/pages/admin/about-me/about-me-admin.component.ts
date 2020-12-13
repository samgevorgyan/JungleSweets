import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { AboutMe } from '../../../models/about.me.interface';
import { FbStoragePaths } from '../../../enums/fbStoragePaths';
import { FbDatabasePathsPaths } from '../../../enums/fbDatabasePaths';

@Component({
  selector: 'jungle-about-me',
  templateUrl: './about-me-admin.component.html',
  styleUrls: ['./about-me-admin.component.scss'],
})
export class AboutMeAdminComponent implements OnInit {
  aboutMe: AboutMe;
  uploadedFiles: File[] = [];
  oldRealImageUrl = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAboutMe('about-me');
  }

  uploadAboutMeImage(event: any) {
    if (event.target.files.length === 0) {
      return;
    }
    [...event.target.files].forEach((file) => {
      this.uploadedFiles.push(file);
      this.adminService.imageRender(file).subscribe(
        (base64tempUrl: string) => {
          this.oldRealImageUrl = this.aboutMe.url;
          this.aboutMe.url = base64tempUrl;
        },
        (noAcceptable) => {
          alert(noAcceptable);
        }
      );
    });
  }

  deleteAboutMeImage(url: string) {
    this.aboutMe.url = '';
    this.uploadedFiles = [];
    if (!url.includes('base64')) {
      this.oldRealImageUrl = url;
    }
  }

  async saveAboutMe(aboutMeId: string) {
    if (this.uploadedFiles.length !== 0) {
      this.aboutMe.url = await this.adminService.uploadFile(
        this.uploadedFiles[0],
        FbStoragePaths.aboutMeImage
      );
    }
    if (this.oldRealImageUrl) {
      this.adminService
        .deleteImageFromStorage(
          FbStoragePaths.aboutMeImage,
          this.oldRealImageUrl
        )
        .then((res) => {});
    }

    const data = {
      aboutme: {
        am: this.aboutMe.aboutme.am,
        en: this.aboutMe.aboutme.en,
      },
      url: this.aboutMe.url,
    };

    if (aboutMeId) {
      const path = `${FbDatabasePathsPaths.aboutMe}/${aboutMeId}`;

      await this.adminService.updateDataBaseDocument(data, path);
    } else {
      await this.adminService.setToDataBase(data, FbDatabasePathsPaths.aboutMe);
    }
  }

  private getAboutMe(path: string) {
    this.adminService
      .getCollectionFromDb(path)
      .subscribe((aboutmeData: AboutMe[]) => {
        this.aboutMe = aboutmeData[0];
      });
  }
}
