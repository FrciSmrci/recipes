import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {RecipeListComponent} from './recipe-list.component';
import {RecipeListResolverService} from './recipe-resolver/recipe-list-resolver.service';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'recipes',
      component: RecipeListComponent,
      pathMatch: 'full',
      resolve: {
        recipes: RecipeListResolverService
      },
    }
  ])],
  exports: [RouterModule]
})
export class RecipeListRoutingModule {
}
