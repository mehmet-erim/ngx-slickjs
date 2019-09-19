import { Component } from '@angular/core';
import { Slick } from 'ngx-slickjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      .p-10 {
        padding: 10px;
      }
    `,
  ],
})
export class AppComponent {
  arrayLength = 10;

  config: Slick.Config = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  getArray(count: number) {
    return new Array(count);
  }
}
