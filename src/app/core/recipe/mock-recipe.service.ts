import {Observable} from 'rxjs/Observable';
import {Recipe} from './recipe';
import {RecipeService} from './recipe.service';

export class MockRecipeService extends RecipeService {

  getRecipes(): Observable<Recipe[]> {
    return Observable.of(this.batchOfRecipes);
  }

  get batchOfRecipes() {
    const firstRecipe = new Recipe('Omlete');
    firstRecipe.url = 'http://googlydo.si';
    firstRecipe.ingredients = 'Njams, njams, njams';
    return Array(10).fill(firstRecipe);
  }
}
