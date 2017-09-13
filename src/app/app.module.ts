import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppTableComponent} from './app-table/app-table.component';
import {AppTableSortHeaderComponent} from './app-table/app-table-sort-header/app-table-sort-header.component';
import {AppTableHeaderDirective} from './app-table/app-table-header.directive';
import {AppTableCellDirective} from './app-table/app-table-cell.directive';
import {CdkTableModule} from '@angular/cdk/table';
import {AppTableColDirective} from './app-table/app-table-col.directive';

@NgModule({
    declarations: [
        AppComponent,
        AppTableCellDirective,
        AppTableColDirective,
        AppTableComponent,
        AppTableHeaderDirective,
        AppTableSortHeaderComponent,
    ],
    imports: [
        BrowserModule,
        CdkTableModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
