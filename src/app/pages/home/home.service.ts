import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private afs: AngularFirestore) {}

  getAllAssortments(path: string) {
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
  getAssortmentById(id: string) {
    return this.afs.doc<any>(`assortments/${id}`).valueChanges();
  }
}
