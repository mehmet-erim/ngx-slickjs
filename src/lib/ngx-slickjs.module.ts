import { NgModule, ModuleWithProviders } from "@angular/core";
import { SlickContainerDirective, SlickItemDirective } from "./directives";
import { Options } from "./models";

@NgModule({
  declarations: [SlickContainerDirective, SlickItemDirective],
  exports: [SlickContainerDirective, SlickItemDirective]
})
export class NgxSlickjsModule {
  static forRoot({ links = {} } = {} as Options.Root): ModuleWithProviders {
    return {
      ngModule: NgxSlickjsModule,
      providers: [
        {
          provide: "SLICK_LINKS",
          useValue: {
            jquery:
              links.jquery || "https://code.jquery.com/jquery-3.4.0.min.js",
            slickJs:
              links.slickJs ||
              "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
            slickCss:
              links.slickCss ||
              "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
            slickTheme:
              "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
          }
        }
      ]
    };
  }
}
