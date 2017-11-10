import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Recipe} from '../../core/recipe/recipe';
import {RecipeService} from '../../core/recipe/recipe.service';

@Injectable()
export class RecipeListResolverService implements Resolve<Recipe[]> {

  constructor(private recipeService: RecipeService) {
  }

  resolve(): Promise<Recipe[]> {
    return new Promise((resolve) => {
      this.recipeService.getRecipes()
        .subscribe(recipes => resolve(recipes))
    });
  }
}
