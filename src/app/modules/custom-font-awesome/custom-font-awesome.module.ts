import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FontAwesomeModule,
  FaIconLibrary
} from "@fortawesome/angular-fontawesome";

import {
  faBars,
  faShoppingBag,
  faQuestionCircle,
  faSearch,
  faAngleDown,
  faAngleUp,
  faHeart
} from "@fortawesome/free-solid-svg-icons";

@NgModule({
  declarations: [],
  exports: [CommonModule, FontAwesomeModule]
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
      faAngleUp
    );
  }
}
