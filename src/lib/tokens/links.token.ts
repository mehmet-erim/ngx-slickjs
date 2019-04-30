import { InjectionToken } from "@angular/core";
import { Options } from "../models/options";

export function linkOptionsFactory(links: Options.Links) {
  return {
    jquery: "https://code.jquery.com/jquery-3.4.0.min.js",
    slickJs: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
    slickCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
    slickThemeCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css",
    ...links,
  } as Options.Links;
}

export const SLICK_LINKS = new InjectionToken<Options.Links>("slick-links");
