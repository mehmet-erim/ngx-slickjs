import { Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output, Inject } from '@angular/core';
import compare from 'just-compare';
import { take, map, filter, switchMap, takeUntil } from 'rxjs/operators';
import { Options } from '../models/options';
import { Slick } from '../models/slick';
import { timer, forkJoin, fromEvent, Subject } from 'rxjs';
import { LazyLoadService } from '../services/lazy-load.service';

declare const $: any;

@Directive({
  selector: '[slickContainer]',
  exportAs: 'slick',
})
export class SlickContainerDirective implements OnDestroy {
  @Input('slickConfig')
  config: Slick.Config;

  @Output('slickAfterChange')
  afterChange: EventEmitter<any> = new EventEmitter();

  @Output('slickBeforeChange')
  beforeChange: EventEmitter<any> = new EventEmitter();

  @Output('slickBreakpoint')
  breakpoint: EventEmitter<any> = new EventEmitter();

  @Output('slickDestroy')
  destroy: EventEmitter<any> = new EventEmitter();

  @Output('slickInit')
  init: EventEmitter<any> = new EventEmitter();

  slides: HTMLElement[] = [];

  jQueryElement: any;

  initialize: boolean = false;

  slickCount: number = 0;

  private destroy$ = new Subject();

  constructor(
    private elRef: ElementRef,
    private zone: NgZone,
    private lazyLoadService: LazyLoadService,
    @Inject('slick-links') private links: Options.Links,
  ) {}

  ngAfterViewInit() {
    this.lazyLoadService
      .load(this.links.jquery, 'script')
      .pipe(
        map(() => 'jQuery is loaded'),
        filter(jquery => !!jquery),
        switchMap(() =>
          forkJoin(
            this.lazyLoadService.load(this.links.slickJs, 'script'),
            this.lazyLoadService.load(this.links.slickCss, 'style'),
            this.lazyLoadService.load(this.links.slickThemeCss, 'style'),
          ),
        ),
        take(1),
      )
      .subscribe(() => {
        this.initSlick();
      });
  }

  ngOnDestroy() {
    this.unslick();
    this.slides = [];
    this.destroy$.next();
  }

  initSlick() {
    const that = this;
    this.zone.runOutsideAngular(() => {
      $(this.elRef.nativeElement)[0].innerHTML = '';
      this.jQueryElement = $(this.elRef.nativeElement);
      this.jQueryElement.on('init', (event, slick) => {
        this.zone.run(() => {
          timer(0).subscribe(() => this.init.emit({ event, slick }));
        });
      });

      this.jQueryElement.slick(this.config);
      this.initialize = true;
      this.listenMouseWheel();

      this.jQueryElement.on('afterChange', (event, slick, currentSlide) => {
        that.zone.run(() => {
          that.afterChange.emit({ event, slick, currentSlide });
        });
      });

      this.jQueryElement.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
        that.zone.run(() => {
          this.slickCount = slick.slideCount;
          that.beforeChange.emit({ event, slick, currentSlide, nextSlide });
        });
      });

      this.jQueryElement.on('breakpoint', (event, slick, breakpoint) => {
        that.zone.run(() => {
          that.breakpoint.emit({ event, slick, breakpoint });
        });
      });

      this.jQueryElement.on('destroy', (event, slick) => {
        that.zone.run(() => {
          that.destroy.emit({ event, slick });
        });
      });
    });

    this.syncSlides();

    if (this.config && this.config.initialSlide && this.config.initialSlide <= this.slides.length) {
      this.goTo(this.config.initialSlide);
    }
  }

  syncSlides() {
    if (this.slickCount >= this.slides.length) return;

    this.slides.forEach(slide => {
      this.zone.run(() => {
        this.jQueryElement.slick('slickAdd', slide);
      });
    });
  }

  addSlide(slide: HTMLElement) {
    this.slides = [...this.slides, slide];

    if (!this.initialize) return;

    this.zone.run(() => {
      this.jQueryElement.slick('slickAdd', slide);
    });
  }

  removeSlide(slide: HTMLElement) {
    this.slides = this.slides.filter(slide => compare(slide, slide));

    if (!this.initialize) return;

    this.zone.run(() => {
      this.jQueryElement.slick('slickRemove', this.slides.indexOf(slide));
    });
  }

  goTo(index: number) {
    this.zone.run(() => {
      this.jQueryElement.slick('slickGoTo', index);
    });
  }

  next() {
    this.zone.run(() => {
      this.jQueryElement.slick('slickNext');
    });
  }

  prev() {
    this.zone.run(() => {
      this.jQueryElement.slick('slickPrev');
    });
  }

  pause() {
    this.zone.run(() => {
      this.jQueryElement.slick('slickPause');
    });
  }

  play() {
    this.zone.run(() => {
      this.jQueryElement.slick('slickPlay');
    });
  }

  unslick() {
    if (this.jQueryElement) {
      this.zone.run(() => {
        this.jQueryElement.slick('unslick');
      });
    }
    this.initialize = false;
  }

  listenMouseWheel() {
    if (this.config.mouseWheelMove === false) return;

    fromEvent(this.elRef.nativeElement, 'wheel')
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: MouseWheelEvent) => {
        event.preventDefault();
        if (event.deltaX > 0 || event.deltaY < 0) {
          this.prev();
        } else if (event.deltaX < 0 || event.deltaY > 0) {
          this.next();
        }
      });
  }
}
