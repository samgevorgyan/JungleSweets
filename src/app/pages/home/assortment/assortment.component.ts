import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
export interface Item {
  url: string;
}
@Component({
  selector: 'jungle-assortment',
  templateUrl: './assortment.component.html',
  styleUrls: ['./assortment.component.scss'],
})
export class AssortmentComponent implements OnInit {
  imageObject: Array<{ thumbImage: string; image: string; alt: string }> = [];
  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.getAssortmentrImagesUrl('assortment-img');
  }
  getAssortmentrImagesUrl(path: string) {
    this.afs
      .collection<Item>(path)
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
      .subscribe((res) => {
        res.forEach((item) => {
          this.imageObject.push({
            image: item.url,
            thumbImage: item.url,
            alt: item.id,
          });
        });
      });
  }
}
