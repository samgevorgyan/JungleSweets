import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

import {
  faBars,
  faShoppingBag,
  faQuestionCircle,
  faSearch,
  faAngleDown,
  faAngleUp,
  faHeart,
  faTimesCircle,
  faAlignRight,
  faFilm,
  faWrench,
  faPepperHot,
  faSnowman,
  faComment,
  faInfinity,
  faEnvelope,
  faLock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import {
  faViber,
  faInstagram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
@NgModule({
  declarations: [],
  exports: [CommonModule, FontAwesomeModule],
})
export class CustomFontAwesomeModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faShoppingBag,
      faBars,
      faHeart,
      faQuestionCircle,
      faSearch,
      faAngleDown,
      faAngleUp,
      faViber,
      faInstagram,
      faWhatsapp,
      faTimesCircle,
      faFilm,
      faWrench,
      faPepperHot,
      faSnowman,
      faComment,
      faInfinity,
      faEnvelope,
      faLock,
      faUser
    );
  }
}
