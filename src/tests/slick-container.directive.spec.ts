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
    beforeEach(() => {
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
    });

    it("should be created", () => {
      expect(this.slickContainer).not.toBeUndefined();
    });

    it("should be jquery loaded", async(done => {
      this.slickContainer.init.subscribe(() => {
        expect(
          Object.keys(this.lazyLoadService._loadedLibraries).find(
            key => key === "https://code.jquery.com/jquery-3.4.0.min.js"
          )
        ).toBeTruthy();
        done();
      });
    }));

    it("should be slickJs loaded", async(done => {
      this.slickContainer.init.subscribe(() => {
        expect(
          Object.keys(this.lazyLoadService._loadedLibraries).find(
            key =>
              key ===
              "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
          )
        ).toBeTruthy();
        done();
      });
    }));

    it("should be slick css loaded", async(done => {
      this.slickContainer.init.subscribe(() => {
        console.log(Object.keys(this.lazyLoadService._loadedLibraries));
        expect(
          Object.keys(this.lazyLoadService._loadedLibraries).find(
            key =>
              key ===
              "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
          )
        ).toBeTruthy();
        done();
      });
    }));

    it("should be slick theme css loaded", async(done => {
      this.slickContainer.init.subscribe(() => {
        expect(
          Object.keys(this.lazyLoadService._loadedLibraries).find(
            key =>
              key ===
              "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
          )
        ).toBeTruthy();
        done();
      });
    }));

    it("should emitted after changed", async(done => {
      this.slickContainer.afterChange.subscribe(res => {
        expect(res).toBeTruthy();
        done();
      });
    }));
  });
});
