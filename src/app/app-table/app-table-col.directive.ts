import {ContentChild, Directive, Input, TemplateRef} from '@angular/core';
import {AppTableHeaderDirective} from './app-table-header.directive';
import {AppTableCellDirective} from './app-table-cell.directive';

@Directive({
    selector: 'app-table-col',
})
export class AppTableColDirective {

    @Input()
    public col: string;

    @ContentChild(AppTableHeaderDirective, {read: TemplateRef})
    header: TemplateRef<any>;

    @ContentChild(AppTableCellDirective, {read: TemplateRef})
    cell: TemplateRef<any>;

    constructor() {
    }

}
