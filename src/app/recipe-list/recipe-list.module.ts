import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RecipeListRoutingModule} from './recipe-list-routing';
import {RecipeListComponent} from './recipe-list.component';
import {RecipeListResolverService} from './recipe-resolver/recipe-list-resolver.service';

@NgModule({
  imports: [RecipeListRoutingModule, SharedModule],
  declarations: [RecipeListComponent],
  providers: [RecipeListResolverService]
})
export class RecipeListModule {
}

