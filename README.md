# ngx-slickjs

[![Minzipped Size](https://badgen.net/bundlephobia/minzip/ngx-slickjs)](https://bundlephobia.com/result?p=ngx-slickjs@1.0.2)
[![Maintainability](https://api.codeclimate.com/v1/badges/822ebfba446c893a385a/maintainability)](https://codeclimate.com/github/mehmet-erim/ngx-slickjs/maintainability)
[![Build Status](https://travis-ci.org/mehmet-erim/ngx-slickjs.svg?branch=master)](https://travis-ci.org/mehmet-erim/ngx-slickjs)
![GitHub](https://img.shields.io/github/license/mehmet-erim/ngx-slickjs.svg)
[![Follow Twitter](https://img.shields.io/twitter/follow/mehmterim.svg?label=Follow)](https://twitter.com/mehmterim)

<!-- [Codecov](https://img.shields.io/codecov/c/gh/mehmet-erim/ngx-slickjs.svg) -->

ngx-slickjs is slick-carousel package for Angular 6+. ngx-slickjs can lazy load slick.js packages. ngx-slickjs very small and very stable.

[[Stackblitz Example]](https://twitter.com/mehmterim)

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
    NgxSlickJsModule.forRoot()
  ]
})
export class AppModule {}
```

```html
<div slickContainer class="your-slide-container">
  <img slickItem class="your-slide" src="https://placeholder.pics/svg/400" />
  <img slickItem class="your-slide-2" src="https://placeholder.pics/svg/400" />
</div>
```

### Lazy Load Module Import

Import module to your sub module

```typescript
import { NgxSlickJsModule } from "ngx-slickjs";

@NgModule({
  imports: [
    // ...
    NgxSlickJsModule
  ]
})
export class AnotherModule {}
```

You can use slick methods. SlickContainerDirective exported with `slick` key.

```html
<div slickContainer #slickController="slick">
  <img
    slickItem
    *ngFor="let item of [0,1,2,3,4,5];"
    src="https://placeholder.pics/svg/400"
  />
</div>

<button (click)="slickController.next()">Next</button>
<button (click)="slickController.prev()">Previous</button>
<button (click)="slickController.goTo(4)">Go to 4</button>
<button (click)="slickController.play()">Play</button>
<button (click)="slickController.pause()">Pause</button>
<button (click)="slickController.unslick()">Destroy</button>
<button (click)="slickController.initSlick()">Init</button>
```

### Lazy Load Scripts and Styles

forRoot Options:

| Links Properties |                                 Default                                 |
| ---------------- | :---------------------------------------------------------------------: |
| jquery           |               https://code.jquery.com/jquery-3.4.0.min.js               |
| slickJs          |  https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js   |
| slickCss         |    https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css    |
| slickTheme       | https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css |

Example:

```typescript
import { NgxSlickJsModule } from "ngx-slickjs";

@NgModule({
  imports: [
    // ...
    NgxSlickJsModule.forRoot({
      links: {
        jquery: "https://code.jquery.com/jquery-3.4.0.min.js",
        slickJs:
          "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
        slickCss:
          "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
        slickTheme: null // if you are set null, This package won't load
      }
    })
  ]
})
export class AppModule {}
```

## Bonus

### LazyLoadService Usage

````typescript
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
```
````
