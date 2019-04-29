import { FormsModule } from "@angular/forms";
import { SlickContainerDirective, SlickItemDirective } from "../lib/directives";
import { TestComponent } from "./test.component";

export default {
  imports: [],
  declarations: [SlickContainerDirective, SlickItemDirective, TestComponent],
  providers: [
    {
      provide: "SLICK_LINKS",
      useValue: {
        jquery: "https://code.jquery.com/jquery-3.4.0.min.js",
        slickJs:
          "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
        slickCss:
          "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
        slickTheme:
          "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
      }
    }
  ]
};