import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from "@angular/core";

@Component({
  selector: "app-test",
  template: `
    <div slickContainer>
      <ul>
        <li *ngFor="let name of names" slickItem>{{ name }}</li>
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TestComponent {
  names = ["Ahmet", "Mehmet", "Ali"];
}
