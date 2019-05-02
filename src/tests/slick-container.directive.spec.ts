import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { SlickContainerDirective } from "src/lib/directives";
import { LazyLoadService } from "src/lib/services";
import testConfig from "./test-config";
import { TestComponent } from "./test.component";

export interface USlickContainerDirective {
  slickContainer: SlickContainerDirective;
  component: TestComponent;
  lazyLoadService: LazyLoadService;
  fixture: ComponentFixture<TestComponent>;
}

describe("SlickContainerDirective", function(this: USlickContainerDirective) {
  describe("as a unit", () => {
    beforeEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

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

    it("should be jquery loaded", fakeAsync(() => {
      this.slickContainer.init.subscribe(() => {
        expect(
          document.querySelector(
            `[src='https://code.jquery.com/jquery-3.4.0.min.js']`
          )
        ).toBeTruthy();
      });
      tick();
    }));

    it("should be slickJs loaded", fakeAsync(() => {
      this.slickContainer.init.subscribe(() => {
        expect(
          document.querySelector(
            `[src='https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js']`
          )
        ).toBeTruthy();
      });
      tick();
    }));

    it("should be slick css loaded", fakeAsync(() => {
      this.slickContainer.init.subscribe(() => {
        expect(
          document.querySelector(
            `[href='https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css']`
          )
        ).toBeTruthy();
      });
      tick();
    }));

    it("should be slick theme css loaded", fakeAsync(() => {
      this.slickContainer.init.subscribe(() => {
        expect(
          document.querySelector(
            `[href='https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css']`
          )
        ).toBeTruthy();
      });
      tick();
    }));

    it("should emitted init when after init", fakeAsync(() => {
      this.slickContainer.init.subscribe(res => {
        expect(res).toBeTruthy();
      });
      tick();
    }));

    it("should emitted beforeChange when change slide", fakeAsync(() => {
      this.slickContainer.beforeChange.subscribe(res => {
        expect(res.currentSlide).toBe(0);
      });
      tick();
    }));

    it("should emitted afterChange when change slide", fakeAsync(() => {
      this.slickContainer.afterChange.subscribe(res => {
        expect(res.currentSlide).toBe(0);
      });
      tick();
    }));

    it("should emitted breakpoint", fakeAsync(() => {
      this.slickContainer.init.subscribe(() => {
        window.dispatchEvent(new Event("resize"));
        tick();
      });
      tick();

      this.slickContainer.breakpoint.subscribe(res => {
        expect(res).toBeTruthy();
      });
      tick();
    }));

    it("should emitted afterChange when next method worked", fakeAsync(() => {
      this.slickContainer.init.subscribe(() => {
        this.slickContainer.next();
      });
      tick();
      this.slickContainer.afterChange.subscribe(res => {
        expect(res).toBeTruthy();
      });
      tick();
    }));

    it("should emitted afterChange when prev method worked", fakeAsync(() => {
      this.slickContainer.init.subscribe(() => {
        this.slickContainer.prev();
      });
      tick();
      this.slickContainer.afterChange.subscribe(res => {
        expect(res).toBeTruthy();
      });
      tick();
    }));

    it("should emitted destroy when unslick method worked", fakeAsync(() => {
      this.slickContainer.init.subscribe(() => {
        this.slickContainer.unslick();
      });
      tick();
      this.slickContainer.destroy.subscribe(res => {
        expect(res).toBeTruthy();
      });
      tick();
    }));
  });
});
