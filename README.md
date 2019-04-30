# ngx-slickjs

[![Minzipped Size](https://badgen.net/bundlephobia/minzip/ngx-slickjs)](https://bundlephobia.com/result?p=ngx-slickjs@1.1.0)
[![Maintainability](https://api.codeclimate.com/v1/badges/822ebfba446c893a385a/maintainability)](https://codeclimate.com/github/mehmet-erim/ngx-slickjs/maintainability)
[![Build Status](https://travis-ci.org/mehmet-erim/ngx-slickjs.svg?branch=master)](https://travis-ci.org/mehmet-erim/ngx-slickjs)
![GitHub](https://img.shields.io/github/license/mehmet-erim/ngx-slickjs.svg)
[![Follow Twitter](https://img.shields.io/twitter/follow/mehmterim.svg?label=Follow)](https://twitter.com/mehmterim)

<!-- [Codecov](https://img.shields.io/codecov/c/gh/mehmet-erim/ngx-slickjs.svg) -->

ngx-slickjs is slick-carousel package for Angular 6+. ngx-slickjs can lazy load slick.js packages. ngx-slickjs very small and very stable.

[Stackblitz Example](https://stackblitz.com/edit/ngx-slickjs)

## Installation

```bash
yarn add ngx-slickjs
```

or

```bash
npm install ngx-slickjs
```

## Usage

Import module to your main module

```typescript
import { NgxSlickJsModule } from "ngx-slickjs";

@NgModule({
  imports: [
    // ...
    NgxSlickJsModule.forRoot(),
  ],
})
export class AppModule {}
```

```html
<div slickContainer id="your-slide-container">
  <img slickItem id="your-slide" src="https://placeholder.pics/svg/400" />
  <img slickItem id="your-slide-2" src="https://placeholder.pics/svg/400" />
</div>
```

You can use slick methods. SlickContainerDirective exported with `slick` key.

```html
<div slickContainer #slickController="slick">
  <img slickItem *ngFor="let item of [0,1,2,3,4,5];" src="https://placeholder.pics/svg/400" />
</div>

<button (click)="slickController.next()">Next</button>
<button (click)="slickController.prev()">Previous</button>
<button (click)="slickController.goTo(4)">Go to 4</button>
<button (click)="slickController.play()">Play</button>
<button (click)="slickController.pause()">Pause</button>
<button (click)="slickController.unslick()">Destroy</button>
<button (click)="slickController.initSlick()">Init</button>
```

### Sub Module Import

```typescript
import { NgxSlickJsModule } from "ngx-slickjs";

@NgModule({
  imports: [
    // ...
    NgxSlickJsModule,
  ],
})
export class AnotherModule {}
```

### Scripts and styles urls

forRoot Options:
Outputs:
Script (style) | Default
------ | --------
jquery | https://code.jquery.com/jquery-3.4.0.min.js
slickJs | https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js
slickCss | https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css
slickThemeCss | https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css

Note: The above urls are download lazy. The urls don't increase initial opening time.

Example:

```typescript
import { NgxSlickJsModule } from "ngx-slickjs";

@NgModule({
  imports: [
    // ...
    NgxSlickJsModule.forRoot({
      links: {
        jquery: "https://code.jquery.com/jquery-3.4.0.min.js",
        slickJs: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
        slickCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
        slickThemeCss: null, // if you are set null, this package won't load
      },
    }),
  ],
})
export class AppModule {}
```

## Input and outputs:

Inputs:
| Name | Default |
| ---------- | -------- |
| slickConfig | undefined |

Outputs:
Event | Params | Description
------ | -------- | -----------
slickAfterChange | event, slick, currentSlide | After slide change callback
slickBeforeChange | event, slick, currentSlide, nextSlide | Before slide change callback
slickBreakpoint | event, slick, breakpoint | Fires after a breakpoint is hit
slickDestroy | event, slick | When slider is destroyed, or unslicked.
slickInit | event, slick | When Slick initializes for the first time callback. Note that this event should be defined before initializing the slider.

You can import Slick config type:

```typescript
import { Slick } from "ngx-slickjs";

slickConfig: Slick.Config = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 2,
  dots: true,
  autoplay: true,
  autoplaySpeed: 2000,
};
```

## Config

| Option           | Type                                                                   | Default                                                      | Description                                                                                                                                                                                                                                               |
| ---------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accessibility    | boolean                                                                | true                                                         | Enables tabbing and arrow key navigation. Unless `autoplay: true`, sets browser focus to current slide (or first of current slide set, if multiple `slidesToShow`) after slide change. For full a11y compliance enable focusOnChange in addition to this. |
| adaptiveHeight   | boolean                                                                | false                                                        | Adapts slider height to the current slide                                                                                                                                                                                                                 |
| appendArrows     | string                                                                 | \$(element)                                                  | Change where the navigation arrows are attached (Selector, htmlString, Array, Element, jQuery object)                                                                                                                                                     |
| appendDots       | string                                                                 | \$(element)                                                  | Change where the navigation dots are attached (Selector, htmlString, Array, Element, jQuery object)                                                                                                                                                       |
| arrows           | boolean                                                                | true                                                         | Enable Next/Prev arrows                                                                                                                                                                                                                                   |
| asNavFor         | string                                                                 | \$(element)                                                  | Enables syncing of multiple sliders                                                                                                                                                                                                                       |
| autoplay         | boolean                                                                | false                                                        | Enables auto play of slides                                                                                                                                                                                                                               |
| autoplaySpeed    | int                                                                    | 3000                                                         | Auto play change interval                                                                                                                                                                                                                                 |
| centerMode       | boolean                                                                | false                                                        | Enables centered view with partial prev/next slides. Use with odd numbered slidesToShow counts.                                                                                                                                                           |
| centerPadding    | string                                                                 | '50px'                                                       | Side padding when in center mode. (px or %)                                                                                                                                                                                                               |
| cssEase          | string                                                                 | 'ease'                                                       | CSS3 easing                                                                                                                                                                                                                                               |
| customPaging     | function                                                               | n/a                                                          | Custom paging templates. See source for use example.                                                                                                                                                                                                      |
| dots             | boolean                                                                | false                                                        | Current slide indicator dots                                                                                                                                                                                                                              |
| dotsClass        | string                                                                 | 'slick-dots'                                                 | Class for slide indicator dots container                                                                                                                                                                                                                  |
| draggable        | boolean                                                                | true                                                         | Enables desktop dragging                                                                                                                                                                                                                                  |
| easing           | string                                                                 | 'linear'                                                     | animate() fallback easing                                                                                                                                                                                                                                 |
| edgeFriction     | integer                                                                | 0.15                                                         | Resistance when swiping edges of non-infinite carousels                                                                                                                                                                                                   |
| fade             | boolean                                                                | false                                                        | Enables fade                                                                                                                                                                                                                                              |
| focusOnSelect    | boolean                                                                | false                                                        | Enable focus on selected element (click)                                                                                                                                                                                                                  |
| focusOnChange    | boolean                                                                | false                                                        | Puts focus on slide after change                                                                                                                                                                                                                          |
| infinite         | boolean                                                                | true                                                         | Infinite looping                                                                                                                                                                                                                                          |
| initialSlide     | integer                                                                | 0                                                            | Slide to start on                                                                                                                                                                                                                                         |
| lazyLoad         | string                                                                 | 'ondemand'                                                   | Accepts 'ondemand' or 'progressive' for lazy load technique. 'ondemand' will load the image as soon as you slide to it, 'progressive' loads one image after the other when the page loads.                                                                |
| mobileFirst      | boolean                                                                | false                                                        | Responsive settings use mobile first calculation                                                                                                                                                                                                          |
| nextArrow        | string (html \| jQuery selector) \| object (DOM node \| jQuery object) | `<button type="button" class="slick-next">Next</button>`     | Allows you to select a node or customize the HTML for the "Next" arrow.                                                                                                                                                                                   |
| pauseOnDotsHover | boolean                                                                | false                                                        | Pauses autoplay when a dot is hovered                                                                                                                                                                                                                     |
| pauseOnFocus     | boolean                                                                | true                                                         | Pauses autoplay when slider is focussed                                                                                                                                                                                                                   |
| pauseOnHover     | boolean                                                                | true                                                         | Pauses autoplay on hover                                                                                                                                                                                                                                  |
| prevArrow        | string (html \| jQuery selector) \| object (DOM node \| jQuery object) | `<button type="button" class="slick-prev">Previous</button>` | Allows you to select a node or customize the HTML for the "Previous" arrow.                                                                                                                                                                               |
| respondTo        | string                                                                 | 'window'                                                     | Width that responsive object responds to. Can be 'window', 'slider' or 'min' (the smaller of the two).                                                                                                                                                    |
| responsive       | array                                                                  | null                                                         | Array of objects [containing breakpoints and settings objects (see example)](#responsive-option-example). Enables settings at given `breakpoint`. Set `settings` to "unslick" instead of an object to disable slick at a given breakpoint.                |
| rows             | int                                                                    | 1                                                            | Setting this to more than 1 initializes grid mode. Use slidesPerRow to set how many slides should be in each row.                                                                                                                                         |
| rtl              | boolean                                                                | false                                                        | Change the slider's direction to become right-to-left                                                                                                                                                                                                     |
| slide            | string                                                                 | ''                                                           | Slide element query                                                                                                                                                                                                                                       |
| slidesPerRow     | int                                                                    | 1                                                            | With grid mode initialized via the rows option, this sets how many slides are in each grid row.                                                                                                                                                           |
| slidesToScroll   | int                                                                    | 1                                                            | # of slides to scroll at a time                                                                                                                                                                                                                           |
| slidesToShow     | int                                                                    | 1                                                            | # of slides to show at a time                                                                                                                                                                                                                             |
| speed            | int                                                                    | 300                                                          | Transition speed                                                                                                                                                                                                                                          |
| swipe            | boolean                                                                | true                                                         | Enables touch swipe                                                                                                                                                                                                                                       |
| swipeToSlide     | boolean                                                                | false                                                        | Swipe to slide irrespective of slidesToScroll                                                                                                                                                                                                             |
| touchMove        | boolean                                                                | true                                                         | Enables slide moving with touch                                                                                                                                                                                                                           |
| touchThreshold   | int                                                                    | 5                                                            | To advance slides, the user must swipe a length of (1/touchThreshold) \* the width of the slider.                                                                                                                                                         |
| useCSS           | boolean                                                                | true                                                         | Enable/Disable CSS Transitions                                                                                                                                                                                                                            |
| useTransform     | boolean                                                                | true                                                         | Enable/Disable CSS Transforms                                                                                                                                                                                                                             |
| variableWidth    | boolean                                                                | false                                                        | Disables automatic slide width calculation                                                                                                                                                                                                                |
| vertical         | boolean                                                                | false                                                        | Vertical slide direction                                                                                                                                                                                                                                  |
| verticalSwiping  | boolean                                                                | false                                                        | Changes swipe direction to vertical                                                                                                                                                                                                                       |
| waitForAnimate   | boolean                                                                | true                                                         | Ignores requests to advance the slide while animating                                                                                                                                                                                                     |
| zIndex           | number                                                                 | 1000                                                         | Set the zIndex values for slides, useful for IE9 and lower                                                                                                                                                                                                |

##### Responsive Option Example

The responsive option, and value, is quite unique and powerful.
You can use it like so:

```javascript
$(".slider").slick({
  // normal options...
  infinite: false,

  // the magic
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        dots: true,
      },
    },
    {
      breakpoint: 300,
      settings: "unslick", // destroys slick
    },
  ],
});
```

## Bonus

### LazyLoadService Usage

```typescript
import {LazyLoadService} from 'ngx-slickjs';

constructor(private lazyLoadService: LazyLoadService) {}

  ngAfterViewInit(){
    this.lazyLoadService
      .loadScript(/* your script url */)
      .subscribe(() => {
        // loaded your script
      });

    this.lazyLoadService
      .loadCss(/* your style url */)
      .subscribe(() => {
        // loaded your style
      });
  }
```
