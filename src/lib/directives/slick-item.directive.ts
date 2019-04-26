import {
  Directive,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  Host
} from "@angular/core";
import { SlickContainerDirective } from "./slick-container.directive";

@Directive({
  selector: "[slickItem]"
})
export class SlickItemDirective implements AfterViewInit, OnDestroy {
  constructor(
    public elRef: ElementRef,
    @Host() private slickRef: SlickContainerDirective
  ) {}

  ngAfterViewInit() {
    this.slickRef.addSlide(this.elRef.nativeElement);
  }

  ngOnDestroy() {
    this.slickRef.removeSlide(this.elRef.nativeElement);
  }
}
