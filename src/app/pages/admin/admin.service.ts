import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { catchError, finalize, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import firebase from 'firebase';
import { Router } from '@angular/router';
import FirebaseError = firebase.FirebaseError;
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Slider } from '../../models/slider.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  isLogedin = false;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private router: Router,
    private localize: LocalizeRouterService
  ) {}

  uploadFile(file: File, path: string): Promise<string> {
    return new Promise((resolve) => {
      const filePath = `${path}/${new Date().getTime()}_${file.name} `;
      const ref = this.storage.ref(filePath);
      const uploadedFile = ref.put(file);
      uploadedFile
        .snapshotChanges()
        .pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe((url: string) => {
              resolve(url);
            });
          }),
          catchError((err) => {
            this.permissionError(err);
            return throwError(err);
          })
        )
        .subscribe();
    });
  }

  imageRender(file) {
    return new Observable((res) => {
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        res.error('only images are acceptable');
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        res.next(reader.result);
        res.complete();
      };
    });
  }

  setToDataBase(data: any, path: string) {
    return this.afs
      .collection<any>(path)
      .add(data)
      .catch(this.permissionError.bind(this));
  }

  updateDataBaseDocument(data: any, path: string) {
    return this.afs
      .doc<any>(path)
      .update(data)
      .catch(this.permissionError.bind(this));
  }

  getTest(path: string) {
    this.afs
      .doc<any>(path)
      .valueChanges()
      .subscribe((ress) => {});
  }

  getCollectionFromDb(path: string) {
    return this.afs
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
      );
  }

  async deleteImageFromStorage(storagePath: string, url: string) {
    await this.storage.storage
      .ref(storagePath)
      .storage.refFromURL(url)
      .delete();
  }

  permissionError(errorPerm: FirebaseError) {
    if (
      errorPerm.code.includes('permission-denied') ||
      errorPerm.code.includes('storage/unauthorized')
    ) {
      const goAdmin: any = this.localize.translateRoute('/admin');
      this.router.navigate([goAdmin]);
    }
  }
}
