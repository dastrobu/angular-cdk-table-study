import {Component, Input, OnInit} from '@angular/core';
import {AppTableComponent} from '../app-table.component';

@Component({
    selector: 'app-table-sort-header',
    templateUrl: './app-table-sort-header.component.html',
})
export class AppTableSortHeaderComponent<RowType> implements OnInit {

    @Input()
    public col: string;

    @Input()
    public table: AppTableComponent<RowType>;

    constructor() {
    }

    ngOnInit() {
    }

    toggleSort() {
        console.log(`AppTableSortHeaderComponent.toggleSort()`);
        const col = this.col;
        const colSorting = this.table.getSorting(col);

        let newColSorting: undefined | 'asc' | 'desc';
        switch (colSorting) {
            case 'asc':
                newColSorting = 'desc';
                break;
            case 'desc':
                newColSorting = undefined;
                break;
            default:
                newColSorting = 'asc';
        }
        this.table.setSorting(col, newColSorting);
    }
}
