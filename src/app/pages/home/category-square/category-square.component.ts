import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgImageSliderComponent } from "ng-image-slider";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { tap, map, shareReplay } from "rxjs/operators";

@Component({
  selector: "category-square",
  templateUrl: "./category-square.component.html",
  styleUrls: ["./category-square.component.scss"]
})
export class CategorySquareComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      tap(console.log),

      shareReplay()
    );
  @ViewChild("nav") slider: NgImageSliderComponent;
  imageObject: Array<object> = [
    {
      image: "assets/img/home/slide/shop1.jfif",
      thumbImage: "assets/img/home/slide/shop1.jfif",
      alt: "Image alt"
    },
    {
      image: "assets/img/home/slide/shop2.jfif",
      thumbImage: "assets/img/home/slide/shop2.jfif",
      alt: "Image alt"
    },
    {
      image: "assets/img/home/slide/shop3.jfif",
      thumbImage: "assets/img/home/slide/shop3.jfif",
      alt: "Image alt"
    },
    {
      image: "assets/img/home/slide/shop4.jfif",
      thumbImage: "assets/img/home/slide/shop4.jfif",
      alt: "Image alt"
    }
  ];
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    // this.isHandset$.subscribe(res => {
    //   console.log("res-----------------------", res);
    // });
    // console.log(Breakpoints);
    // console.log(this.breakpointObserver);
  }

  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }
}
