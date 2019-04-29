# ngx-slickjs

[![Minzipped Size](https://badgen.net/bundlephobia/minzip/ngx-slickjs)](https://bundlephobia.com/result?p=ngx-slickjs@1.0.0)
[![Maintainability](https://api.codeclimate.com/v1/badges/822ebfba446c893a385a/maintainability)](https://codeclimate.com/github/mehmet-erim/ngx-slickjs/maintainability)
[![Build Status](https://travis-ci.org/mehmet-erim/ngx-slickjs.svg?branch=master)](https://travis-ci.org/mehmet-erim/ngx-slickjs)
![GitHub](https://img.shields.io/github/license/mehmet-erim/ngx-slickjs.svg)
[![Follow Twitter](https://img.shields.io/twitter/follow/mehmterim.svg?label=Follow)](https://twitter.com/mehmterim)

<!-- [Codecov](https://img.shields.io/codecov/c/gh/mehmet-erim/ngx-slickjs.svg) -->

ngx-slickjs is slick-carousel package for Angular 6+. ngx-slickjs can lazy load slick.js packages. ngx-slickjs very small and very stable.

## Installation

```bash
yarn add ngx-slickjs
```

or

```bash
npm install ngx-slickjs
```

## Usage

Import core module to your main module as follows:

```typescript
// ...
import { NgxSlickJsModule } from "ngx-slickjs";

@NgModule({
  imports: [NgxSlickJsModule.forRoot()]
  // ...
})
export class AppModule {}
```
