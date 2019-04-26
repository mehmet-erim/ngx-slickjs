import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Inject
} from "@angular/core";
import { compare } from "../utils";
import { take, map, filter, switchMap } from "rxjs/operators";
import { Slick, Options } from "../models";
import { timer, forkJoin } from "rxjs";
import { LazyLoadService } from "../services";

declare const jQuery: any;

@Directive({
  selector: "[slickContainer]",
  exportAs: "[slickContainer]"
})
export class SlickContainerDirective implements OnDestroy {
  @Input("slickConfig")
  config: Slick.Config;

  @Output("slickAfterChange")
  afterChange: EventEmitter<any> = new EventEmitter();

  @Output("slickBeforeChange")
  beforeChange: EventEmitter<any> = new EventEmitter();

  @Output("slickBreakpoint")
  breakpoint: EventEmitter<any> = new EventEmitter();

  @Output("slickDestroy")
  destroy: EventEmitter<any> = new EventEmitter();

  @Output("slickInit")
  init: EventEmitter<any> = new EventEmitter();

  slides: HTMLElement[] = [];

  $instance: any;

  private initialize: boolean = false;

  constructor(
    private elRef: ElementRef,
    private zone: NgZone,
    private lazyLoadService: LazyLoadService,
    @Inject("SLICK_LINKS") private links: Options.Links
  ) {}

  ngAfterViewInit() {
    this.lazyLoadService
      .loadScript(this.links.jquery)
      .pipe(
        map(() => "jQuery is loaded"),
        filter(jquery => !!jquery),
        switchMap(() =>
          forkJoin(
            this.lazyLoadService.loadScript(this.links.slickJs),
            this.lazyLoadService.loadCss(this.links.slickCss),
            this.lazyLoadService.loadCss(this.links.slickTheme)
          )
        ),
        take(1)
      )
      .subscribe(() => {
        this.initSlick();
      });
  }

  ngOnDestroy() {
    this.unslick();
  }

  initSlick() {
    const that = this;
    this.zone.runOutsideAngular(() => {
      jQuery(this.elRef.nativeElement)[0].innerHTML = "";
      this.$instance = jQuery(this.elRef.nativeElement);
      this.$instance.on("init", (event, slick) => {
        this.zone.run(() => {
          timer(0).subscribe(() => this.init.emit({ event, slick }));
        });
      });

      this.$instance.slick(this.config);
      this.initialize = true;

      this.$instance.on("afterChange", (event, slick, currentSlide) => {
        that.zone.run(() => {
          that.afterChange.emit({ event, slick, currentSlide });
        });
      });

      this.$instance.on(
        "beforeChange",
        (event, slick, currentSlide, nextSlide) => {
          that.zone.run(() => {
            that.beforeChange.emit({ event, slick, currentSlide, nextSlide });
          });
        }
      );

      this.$instance.on("breakpoint", (event, slick, breakpoint) => {
        that.zone.run(() => {
          that.breakpoint.emit({ event, slick, breakpoint });
        });
      });

      this.$instance.on("destroy", (event, slick) => {
        that.zone.run(() => {
          that.destroy.emit({ event, slick });
        });
      });
    });

    this.syncSlides();
  }

  syncSlides() {
    this.slides.forEach(slide => {
      this.zone.run(() => {
        this.$instance.slick("slickAdd", slide);
      });
    });
  }

  addSlide(slide: HTMLElement) {
    this.slides = [...this.slides, slide];

    if (!this.initialize) return;

    this.zone.run(() => {
      this.$instance.slick("slickAdd", slide);
    });
  }

  removeSlide(slide: HTMLElement) {
    this.slides = this.slides.filter(slide => compare(slide, slide));

    if (!this.initialize) return;

    this.zone.run(() => {
      this.$instance.slick("slickRemove", this.slides.indexOf(slide));
    });
  }

  slickGoTo(index: number) {
    this.zone.run(() => {
      this.$instance.slick("slickGoTo", index);
    });
  }

  slickNext() {
    this.zone.run(() => {
      this.$instance.slick("slickNext");
    });
  }

  slickPrev() {
    this.zone.run(() => {
      this.$instance.slick("slickPrev");
    });
  }

  slickPause() {
    this.zone.run(() => {
      this.$instance.slick("slickPause");
    });
  }

  slickPlay() {
    this.zone.run(() => {
      this.$instance.slick("slickPlay");
    });
  }

  unslick() {
    if (this.$instance) {
      this.zone.run(() => {
        this.$instance.slick("unslick");
      });
    }
    this.initialize = false;
  }
}
