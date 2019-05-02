import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from "@angular/core/testing";
import { LazyLoadService } from "src/lib/services";
import testConfig from "./test-config";
import { TestComponent } from "./test.component";
import { switchMap } from "rxjs/operators";

export interface ULazyLoadService {
  lazyLoadService: LazyLoadService;
  fixture: ComponentFixture<TestComponent>;
}

describe("LazyLoadService", function(this: ULazyLoadService) {
  describe("as a unit", () => {
    beforeEach(() => {
      TestBed.configureTestingModule(testConfig).compileComponents();

      this.fixture = TestBed.createComponent(TestComponent);
      this.fixture.detectChanges();
      this.lazyLoadService = this.fixture.debugElement.injector.get(
        LazyLoadService
      );

      this.fixture.detectChanges();
    });

    it("should be created", () => {
      expect(this.lazyLoadService).not.toBeUndefined();
    });

    it("should be script didn't load when url was null", () => {
      expect(this.lazyLoadService.loadScript(null)).toBeUndefined();
    });

    it("should be script loaded", fakeAsync(() => {
      const scriptUrl =
        "https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.4.0/jasmine.min.js";

      this.lazyLoadService.loadScript(scriptUrl).subscribe(() => {
        expect(document.querySelector(`[src='${scriptUrl}']`)).toBeTruthy();
      });
      tick();
    }));

    it("should be style didn't load when url was null", () => {
      expect(this.lazyLoadService.loadCss(null)).toBeUndefined();
    });

    it("should be css loaded", fakeAsync(() => {
      const styleUrl =
        "https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.4.0/jasmine.min.css";

      this.lazyLoadService.loadCss(styleUrl).subscribe(() => {
        expect(document.querySelector(`[href='${styleUrl}']`)).toBeTruthy();
      });
      tick();
    }));

    it("should be css didn't load twice", fakeAsync(() => {
      const styleUrl =
        "https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.4.0/jasmine.css";

      this.lazyLoadService
        .loadCss(styleUrl)
        .pipe(switchMap(() => this.lazyLoadService.loadCss(styleUrl)))
        .subscribe(() => {
          expect(document.querySelectorAll(`[href='${styleUrl}']`).length).toBe(
            1
          );
        });
      tick();
    }));
  });
});
