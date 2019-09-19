export namespace Slick {
  export interface Config {
    accessibility?: boolean;
    adaptiveHeight?: boolean;
    autoplay?: boolean;
    autoplaySpeed?: number;
    arrows?: boolean;
    asNavFor?: string;
    appendArrows?: string;
    appendDots?: string;
    prevArrow?: string | HTMLElement;
    nextArrow?: string | HTMLElement;
    centerMode?: boolean;
    centerPadding?: number | string;
    cssEase?: string;
    dots?: boolean;
    dotsClass?: string;
    draggable?: boolean;
    fade?: boolean;
    focusOnSelect?: boolean;
    easing?: string;
    edgeFriction?: number;
    infinite?: boolean;
    initialSlide?: number;
    lazyLoad?: string;
    mobileFirst?: boolean;
    pauseOnFocus?: boolean;
    pauseOnDotsHover?: boolean;
    respondTo?: string;
    responsive?: ConfigResponsive[];
    rows?: number;
    slidesPerRow?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    speed?: number;
    swipe?: boolean;
    swipeToSlide?: boolean;
    touchMove?: boolean;
    mouseWheelMove?: boolean;
    touchThreshold?: number;
    useCSS?: boolean;
    useTransform?: boolean;
    variableWidth?: boolean;
    vertical?: boolean;
    verticalSwiping?: boolean;
    rti?: boolean;
    waitForAnimate?: boolean;
    zIndex?: number;
  }

  export interface ConfigResponsive {
    breakpoint: number | string;
    settings?: Config;
  }
}
