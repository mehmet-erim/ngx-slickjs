import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import {
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { By } from "@angular/platform-browser";
import { TestComponent } from "./test.component";
import {
  SlickContainerDirective,
  SlickItemDirective
} from "src/lib/directives";

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

      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [
          SlickContainerDirective,
          SlickItemDirective,
          TestComponent
        ],
        providers: [
          {
            provide: "SLICK_LINKS",
            useValue: {
              jquery: "https://code.jquery.com/jquery-3.4.0.min.js",
              slickJs:
                "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
              slickCss:
                "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
              slickTheme:
                "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
            }
          }
        ]
      }).compileComponents();

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

    it("should be container created", () => {
      expect(this.slickContainer).not.toBeUndefined();
    });

    it("should be item created", () => {
      expect(this.slickItem).not.toBeUndefined();
    });

    it("should equal container slides length to slickItem count", () => {
      expect(this.slickContainer.slides.length).toBe(
        this.component.names.length
      );
    });

    it("should be equal itemsLength to names length", () => {
      expect(this.itemsLength).toBe(this.component.names.length);
    });

    xit("should equal container slides length to slickItem count when removed item", () => {
      this.fixture.debugElement.query(By.css("li")).nativeElement;
      this.fixture.detectChanges();

      setTimeout(() => {
        console.log(this.slickContainer.slides.length);
      }, 500);

      // expect(this.slickContainer.slides.length).toBe(
      //   this.component.names.length
      // );
    });
  });
});
