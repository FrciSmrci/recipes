import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, InfiniteScrollModule, TranslateModule, NgbModule]
})
export class SharedModule {
}
