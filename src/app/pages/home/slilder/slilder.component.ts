import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'jungle-slilder',
  templateUrl: './slilder.component.html',
  styleUrls: ['./slilder.component.scss'],
})
export class SlilderComponent implements OnInit {
  sliderHeight = '616px';

  @ViewChild('nav') slider: NgImageSliderComponent;
  imageObject: Array<object> = [
    {
      image: 'assets/img/home/slide/shop1.jfif',
      thumbImage: 'assets/img/home/slide/shop1.jfif',
      alt: 'Image alt',
    },
    {
      image: 'assets/img/home/slide/shop2.jfif',
      thumbImage: 'assets/img/home/slide/shop2.jfif',
      alt: 'Image alt',
    },
    {
      image: 'assets/img/home/slide/shop3.jfif',
      thumbImage: 'assets/img/home/slide/shop3.jfif',
      alt: 'Image alt',
    },
    {
      image: 'assets/img/home/slide/shop4.jfif',
      thumbImage: 'assets/img/home/slide/shop4.jfif',
      alt: 'Image alt',
    },
  ];
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.defineSliderHeight();
  }

  defineSliderHeight() {
    this.breakpointObserver
      .observe('(max-width: 599px)')
      .subscribe((result) => {
        console.log('---result', result);
        if (result.matches) {
          this.sliderHeight = '300px';
        } else {
          this.sliderHeight = '613px';
        }
      });
  }
  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }
}
