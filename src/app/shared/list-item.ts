export class ListItem {
  private _name: string;
  private _batch: number;
  private _description: string;
  private _id: number;
  private _thumbnail: string;
  private _selected: boolean;

  constructor(name, description, id) {
    this._name = name;
    this._description = description;
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get id(): number {
    return this._id;
  }

  get batch(): number {
    return this._batch;
  }

  set batch(value: number) {
    this._batch = value;
  }

  get thumbnail(): string {
    return this._thumbnail;
  }

  set thumbnail(value: string) {
    this._thumbnail = value;
  }

  get selected(): boolean {
    return this._selected === true;
  }

  set selected(value: boolean) {
    this._selected = value;
  }
}
