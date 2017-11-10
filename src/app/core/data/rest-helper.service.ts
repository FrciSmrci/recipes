import { Injectable } from '@angular/core';

@Injectable()
export class RestHelperService {
  private _serverUrl: string = 'http://www.recipepuppy.com/api/';

  constructor() { }

  get serverUrl(): string {
    return this._serverUrl;
  }
}

export function generateGuid() {
  /* tslint:disable:no-bitwise*/
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
