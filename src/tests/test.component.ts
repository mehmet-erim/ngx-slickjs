import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from "@angular/core";

@Component({
  selector: "app-test",
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TestComponent {
  names = ["Ahmet", "Mehmet", "Ali"];
}
