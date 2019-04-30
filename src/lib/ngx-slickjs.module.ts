import { NgModule, ModuleWithProviders } from "@angular/core";
import { SlickContainerDirective } from "./directives/slick-container.directive";
import { SlickItemDirective } from "./directives/slick-item.directive";
import { Options } from "./models/options";
import { SLICK_LINKS, linkOptionsFactory } from "./tokens/links.token";

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
          provide: SLICK_LINKS,
          useValue: links,
        },
        {
          provide: "slick-links",
          useFactory: linkOptionsFactory,
          deps: [SLICK_LINKS],
        },
      ],
    };
  }
}
