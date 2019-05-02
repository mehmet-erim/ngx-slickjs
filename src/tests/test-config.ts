import { FormsModule } from "@angular/forms";
import { SlickContainerDirective, SlickItemDirective } from "../lib/directives";
import { TestComponent } from "./test.component";
import { SLICK_LINKS, linkOptionsFactory } from "../lib/tokens";

export default {
  imports: [],
  declarations: [SlickContainerDirective, SlickItemDirective, TestComponent],
  providers: [
    {
      provide: SLICK_LINKS,
      useValue: {
        jquery: "https://code.jquery.com/jquery-3.4.0.min.js",
        slickJs:
          "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
        slickCss:
          "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
        slickThemeCss:
          "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
      }
    },
    {
      provide: "slick-links",
      useFactory: linkOptionsFactory,
      deps: [SLICK_LINKS]
    }
  ]
};
