import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { SlickContainerDirective } from "src/lib/directives";
import testConfig from "./test-config";
import { TestComponent } from "./test.component";
import { LazyLoadService } from "src/lib/services";

export interface USlickContainerDirective {
  slickContainer: SlickContainerDirective;
  component: TestComponent;
  lazyLoadService: LazyLoadService;
  fixture: ComponentFixture<TestComponent>;
}

describe("SlickContainerDirective", function(this: USlickContainerDirective) {
  describe("as a unit", () => {
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
      this.slickContainer = this.fixture.debugElement
        .query(By.directive(SlickContainerDirective))
        .injector.get(SlickContainerDirective);
      this.fixture.detectChanges();
      this.lazyLoadService = this.fixture.debugElement.injector.get(
        LazyLoadService
      );

      this.fixture.detectChanges();
    }));

    it("should be created", () => {
      expect(this.slickContainer).not.toBeUndefined();
    });

    it("should be jquery loaded", async(done => {
      this.slickContainer.init.subscribe(() => {
        done();
        expect(
          Object.keys(this.lazyLoadService._loadedLibraries).find(
            key => key === "https://code.jquery.com/jquery-3.4.0.min.js"
          )
        ).toBeTruthy();
      });
    }));
  });
});
