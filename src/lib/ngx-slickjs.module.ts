import { NgModule, ModuleWithProviders } from "@angular/core";
import { SlickContainerDirective, SlickItemDirective } from "./directives";
import { Options } from "./models";

@NgModule({
  declarations: [SlickContainerDirective, SlickItemDirective],
  exports: [SlickContainerDirective, SlickItemDirective],
})
export class NgxSlickJsModule {
  static forRoot({ links = {} } = {} as Options.Root): ModuleWithProviders {
    return {
      ngModule: NgxSlickJsModule,
      providers: [
        {
          provide: "SLICK_LINKS",
          useValue: {
            jquery: typeof links.jquery === "undefined" ? "https://code.jquery.com/jquery-3.4.0.min.js" : links.jquery,
            slickJs:
              typeof links.slickJs === "undefined"
                ? "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
                : links.slickJs,
            slickCss:
              typeof links.slickCss === "undefined"
                ? "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
                : links.slickCss,
            slickThemeCss:
              typeof links.slickThemeCss === "undefined"
                ? "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
                : links.slickThemeCss,
          },
        },
      ],
    };
  }
}
