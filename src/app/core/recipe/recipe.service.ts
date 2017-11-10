import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {generateGuid, RestHelperService} from '../data/rest-helper.service';
import {Recipe} from './recipe';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class RecipeService {

  constructor(private http: HttpClient, private helper: RestHelperService) {
  }

  public getRecipes(recipeFilter?: string, ingredientFilter?: string, batch: number = 1): Observable<Recipe[]> {
    const firstBatchCall = this.getRecipesByBatch(recipeFilter, ingredientFilter, batch);
    const secondBatchCall = this.getRecipesByBatch(recipeFilter, ingredientFilter, batch + 1);

    return Observable.forkJoin([firstBatchCall, secondBatchCall])
      .map(results => results[0].concat(results[1]))
  }

  public getRecipesByBatch(recipeFilter: string, ingredientFilter: string, batch: number): Observable<Recipe[]> {
    let params: HttpParams = new HttpParams();
    if (recipeFilter) {
      params = params.append('q', recipeFilter);
    }
    if (ingredientFilter) {
      params = params.append('i', ingredientFilter);
    }
    if (batch) {
      params = params.append('p', batch.toString());
    }
    return this.http.get(
      this.helper.serverUrl, {headers: new HttpHeaders({'Accept': 'application/json'}), params: params})
      .map((res: any) => {
        return res.results
          .map(result => this.mapToRecipeModel(result, batch));
      });
  }

  private mapToRecipeModel(result: any, recipeBatch: number): Recipe {
    const recipe = new Recipe(result.title);
    recipe.ingredients = result.ingredients;
    recipe.url = result.href;
    recipe.thumbnail = result.thumbnail;
    recipe.id = generateGuid();
    recipe.batch = recipeBatch;
    return recipe;
  }
}
