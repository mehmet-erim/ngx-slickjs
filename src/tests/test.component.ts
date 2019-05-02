import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from "@angular/core";

@Component({
  selector: "app-test",
  template: `
    <div slickContainer [slickConfig]="config">
      <ul>
        <li *ngFor="let name of names" slickItem>{{ name }}</li>
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TestComponent {
  config = {
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          dots: true
        }
      }
    ]
  };
  names = ["Ahmet", "Mehmet", "Ali"];
}
