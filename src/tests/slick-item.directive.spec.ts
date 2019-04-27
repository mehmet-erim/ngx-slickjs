import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import {
  SlickContainerDirective,
  SlickItemDirective
} from "src/lib/directives";
import testConfig from "./test-config";
import { TestComponent } from "./test.component";

export interface USlickItemDirective {
  slickItem: SlickItemDirective;
  itemsLength: number;
  slickContainer: SlickContainerDirective;
  component: TestComponent;
  fixture: ComponentFixture<TestComponent>;
}

describe("SlickItemDirective", function(this: USlickItemDirective) {
  describe("as a integration", () => {
    beforeEach(async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
         <div slickContainer>
          <ul>
            <li *ngFor="let name of names" slickItem>{{ name }}</li>
          </ul>
        </div>`
        }
      });

      TestBed.configureTestingModule(testConfig).compileComponents();

      this.fixture = TestBed.createComponent(TestComponent);
      this.component = this.fixture.componentInstance;
      this.fixture.detectChanges();
      this.slickItem = this.fixture.debugElement
        .query(By.directive(SlickItemDirective))
        .injector.get(SlickItemDirective);
      this.itemsLength = this.fixture.debugElement.queryAll(
        By.directive(SlickItemDirective)
      ).length;
      this.slickContainer = this.fixture.debugElement
        .query(By.directive(SlickContainerDirective))
        .injector.get(SlickContainerDirective);
      this.fixture.detectChanges();
    }));

    xit("should be container created", () => {
      expect(this.slickContainer).not.toBeUndefined();
    });

    xit("should be item created", () => {
      expect(this.slickItem).not.toBeUndefined();
    });

    xit("should equal container slides length to slickItem count", () => {
      expect(this.slickContainer.slides.length).toBe(
        this.component.names.length
      );
    });

    xit("should be equal itemsLength to names length", () => {
      expect(this.itemsLength).toBe(this.component.names.length);
    });
  });
});
