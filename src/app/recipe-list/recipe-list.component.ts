import {Component, Inject, OnInit} from '@angular/core';
import {RecipeService} from '../core/recipe/recipe.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ListItem} from '../shared/list-item';
import {ActivatedRoute} from '@angular/router';
import {Recipe} from '../core/recipe/recipe';
import {DOCUMENT} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  private _loading: boolean = false;
  private _searchGroup: FormGroup = new FormGroup({recipeSearch: new FormControl(), ingredientSearch: new FormControl()});
  private _listItems: ListItem[] = [];


  constructor(private recipeService: RecipeService, private route: ActivatedRoute, @Inject(DOCUMENT) private document: any) {
    this.route.data
      .subscribe((data: { recipes: Recipe[] }) => this.listItems = this.mapToListItemModel(data.recipes));
  }

  ngOnInit() {
    const searchResults = this.searchGroup
      .valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.loading = true)
      .switchMap(() => this.getListItemsByBatch(1))
      .do(() => this.loading = false);

    searchResults.subscribe((listItems: ListItem[]) => this.listItems = listItems);
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  get isLoading(): boolean {
    return this._loading === true;
  }

  set listItems(value: ListItem[]) {
    this._listItems = value;
  }

  get listItems(): ListItem[] {
    return this._listItems;
  }

  get hasListItems(): boolean {
    return this.listItems.length > 0;
  }

  get searchGroup(): FormGroup {
    return this._searchGroup;
  }

  get isSearchValueSufficient(): boolean {
    return this.searchGroup.value ?
      this.searchGroup.value.recipeSearch && this.searchGroup.value.recipeSearch.length >= minSearchValueLength ||
      this.searchGroup.value.ingredientSearch && this.searchGroup.value.ingredientSearch.length >= minSearchValueLength :
      false;
  }

  public onScrollDown() {
    if (!this.isLoading) {
      this.loading = true;
      this.getListItemsByBatch(this.listItems[this.listItems.length - 1].batch + 1)
        .subscribe((additionalListItems: ListItem[]) => this.summate(additionalListItems),
          error => this.loading = false,
          () => this.loading = false)
    }
  }

  public reroute(url: string) {
    this.document.location.href = url;
  }

  private getListItemsByBatch(batch: number): Observable<ListItem[]> {
    const recipeSearchValue = this.searchGroup.value.recipeSearch ? this.searchGroup.value.recipeSearch : undefined;
    const ingredientSearchValue = this.searchGroup.value.ingredientSearch ? this.searchGroup.value.ingredientSearch : undefined;

    return this.recipeService.getRecipes(recipeSearchValue, ingredientSearchValue, batch)
      .map((recipes: Recipe[]) => this.mapToListItemModel(recipes));
  }

  private summate(additionalListItems: Array<ListItem>) {
    additionalListItems.forEach(listItem => this.listItems.push(listItem));
  }

  private mapToListItemModel(array: Recipe[]): ListItem[] {
    return array.map(rec => {
      const listItem = new ListItem(rec.title, rec.url, rec.id);
      listItem.thumbnail = rec.thumbnail;
      listItem.batch = rec.batch;
      return listItem;
    });
  }
}

const minSearchValueLength: number = 1;
