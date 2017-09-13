import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {DataSource} from '@angular/cdk/table';
import {CollectionViewer} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Rx';
import {AppTableColDirective} from './app-table-col.directive';

export type SortOrder = 'asc' | 'desc';

@Component({
    selector: 'app-table',
    templateUrl: './app-table.component.html',
    styleUrls: ['./app-table.component.scss'],
})
export class AppTableComponent<RowType> implements OnInit {

    public hoveredRowIndex: number;
    @Output()
    public sortingChange = new EventEmitter<{ cols: string[], order: SortOrder[] }>();
    @ContentChildren(AppTableColDirective)
    public colDirectives: QueryList<AppTableColDirective> = new QueryList<AppTableColDirective>();
    @Input()
    public rowsProvider: Observable<RowType[]>;
    public dataSource: MyDataSource<RowType>;

    constructor() {
    }

    private _sorting: { cols: string[], order: SortOrder[] } = {cols: [], order: []};

    public get sorting(): { cols: string[]; order: SortOrder[] } {
        return this._sorting;
    }

    @Input()
    public set sorting(value: { cols: string[]; order: SortOrder[] }) {
        this._sorting = value;
        this.sortingChange.emit(this._sorting);
    }

    public get cols(): string[] {
        return this.colDirectives.map(cd => cd.col);
    }

    ngOnInit() {
        this.dataSource = new MyDataSource<RowType>(this.rowsProvider);
    }

    public onMouseOverCell(index: number, row: RowType) {
        this.hoveredRowIndex = index;
    }

    public onMouseOutCell(index: number, row: RowType) {
        if (this.hoveredRowIndex === index) {
            this.hoveredRowIndex = undefined;
        }
    }

    public getSorting(col: string): SortOrder {
        const i = this._sorting.cols.indexOf(col);
        if (i !== -1) {
            return this._sorting.order[i];
        }
    }

    public setSorting(col: string, order: undefined | SortOrder) {
        const sorting = this.sorting;
        const i = sorting.cols.indexOf(col);
        if (order) {
            // add or update sort order
            if (i === -1) {
                sorting.cols.push(col);
                sorting.order.push(order);
            } else {
                sorting.cols[i] = col;
                sorting.order[i] = order;
            }
        } else {
            // remove order if order is undefined
            if (i !== -1) {
                sorting.cols.splice(i, 1);
                sorting.order.splice(i, 1);
            }
        }
        this.sorting = sorting;
    }

}

class MyDataSource<RowType> implements DataSource<RowType> {
    constructor(private rowsProvider: Observable<RowType[]>) {

    }

    connect(collectionViewer: CollectionViewer): Observable<RowType[]> {
        return this.rowsProvider;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        return;
    }

}
