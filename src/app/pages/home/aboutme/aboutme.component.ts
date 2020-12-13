import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/shared/services/language.service';
import { FbDatabasePathsPaths } from '../../../enums/fbDatabasePaths';

@Component({
  selector: 'jungle-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss'],
})
export class AboutmeComponent implements OnInit {
  aboutMe$: Observable<any>;
  currentLanguage$: Observable<string>;
  showAllText = false;
  constructor(
    private afs: AngularFirestore,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.currentLanguage$ = this.languageService.languageFromUrl$;
    this.aboutMe$ = this.afs
      .collection<any>(FbDatabasePathsPaths.aboutMe)
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
}
