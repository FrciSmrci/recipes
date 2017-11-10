import {TestBed, inject} from '@angular/core/testing';
import {RecipeService} from './recipe.service';
import {RestHelperService} from '../data/rest-helper.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Recipe} from './recipe';


describe('RecipeService - Integration tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecipeService, RestHelperService]
    });
  });

  it('#getRecipesByBatch should return Recipe[].', () => {
    const recipeService = TestBed.get(RecipeService);
    const httpMock = TestBed.get(HttpTestingController);
    const helper = TestBed.get(RestHelperService);
    const firstRecipe = new Recipe('omelet');
    firstRecipe.url = 'http://google.si';
    firstRecipe.ingredients = 'Eggs, lala, la';
    recipeService
      .getRecipesByBatch()
      .subscribe(recipes => {
        expect(recipes).toBeDefined();
        expect(recipes.length).toBe(1);
        expect(recipes[0].title).toEqual(firstRecipe.title);
        expect(recipes[0].url).toEqual(firstRecipe.url);
        expect(recipes[0].ingredients).toEqual(firstRecipe.ingredients);
      });
    const request = httpMock.expectOne(helper.serverUrl);
    expect(request.request.method).toEqual('GET');

    request.flush({
      results: [
        {
          title: 'omelet',
          href: 'http://google.si',
          ingredients: 'Eggs, lala, la'
        }
      ]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));
});
