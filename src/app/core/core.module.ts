import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeService} from './recipe/recipe.service';
import {RestHelperService} from './data/rest-helper.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  entryComponents: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [RecipeService, RestHelperService]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
