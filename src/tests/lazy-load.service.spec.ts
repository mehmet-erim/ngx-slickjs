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
import { timer } from "rxjs";

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
      expect(this.lazyLoadService.load(null, "script")).toBeUndefined();
    });

    it("should be script loaded", fakeAsync(() => {
      const scriptUrl =
        "https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.4.0/jasmine.min.js";

      this.lazyLoadService.load(scriptUrl, "script").subscribe(() => {
        expect(document.querySelector(`[src='${scriptUrl}']`)).toBeTruthy();
      });
      tick();
    }));

    it("should be script didn't load twice", fakeAsync(() => {
      const script =
        "https://cdnjs.cloudflare.com/ajax/libs/basicModal/3.3.9/basicModal.min.js";

      this.lazyLoadService
        .load(script, "script")
        .pipe(
          switchMap(() => timer(300)),
          switchMap(() => this.lazyLoadService.load(script, "script"))
        )
        .subscribe(() => {
          expect(document.querySelectorAll(`[href='${script}']`).length).toBe(
            1
          );
        });
      tick();
    }));

    it("should be style didn't load when url was null", () => {
      expect(this.lazyLoadService.load(null, "style")).toBeUndefined();
    });

    it("should be css loaded", fakeAsync(() => {
      const styleUrl =
        "https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.4.0/jasmine.min.css";

      this.lazyLoadService.load(styleUrl, "style").subscribe(() => {
        expect(document.querySelector(`[href='${styleUrl}']`)).toBeTruthy();
      });
      tick();
    }));

    it("should be css didn't load twice", fakeAsync(() => {
      const styleUrl =
        "https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.4.0/jasmine.css";

      this.lazyLoadService
        .load(styleUrl, "style")
        .pipe(switchMap(() => this.lazyLoadService.load(styleUrl, "style")))
        .subscribe(() => {
          expect(document.querySelectorAll(`[href='${styleUrl}']`).length).toBe(
            1
          );
        });
      tick();
    }));
  });
});
