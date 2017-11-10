export class Recipe {
  private _id: string;
  private _batch: number;
  private _title: string;
  private _url: string;
  private _ingredients: string;
  private _thumbnail: string;

  constructor(title: string) {
    this.title = title;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get batch(): number {
    return this._batch;
  }

  set batch(value: number) {
    this._batch = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get ingredients(): string {
    return this._ingredients;
  }

  set ingredients(value: string) {
    this._ingredients = value;
  }

  get thumbnail(): string {
    return this._thumbnail;
  }

  set thumbnail(value: string) {
    this._thumbnail = value;
  }
}
