import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';
import {SortOrder} from './app-table/app-table.component';
import * as _ from "lodash";

interface Abc {
    a: string;

    b: string;

    c: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    /** number of rows. */
    n = 1000;

    private _sorting: { cols: string[], order: SortOrder[] } = {
        cols: [],
        order: [],
    };

    public get sorting(): { cols: string[]; order: SortOrder[] } {
        return this._sorting;
    }

    public set sorting(value: { cols: string[]; order: SortOrder[] }) {
        this._sorting = value;
        // this simple one liner works only if the col names are the names of simple properties of an array.
        const rows = _.orderBy(this.rowsSortedTable.getValue(), this.sorting.cols, this.sorting.order);
        this.rowsSortedTable.next([...rows]);
    }

    public rowsTable = new BehaviorSubject<Abc[]>([]);
    public rowsSortedTable = new BehaviorSubject<Abc[]>([]);

    ngOnInit(): void {
        const rows = [...Array.from({length: this.n}, (value, key) => key)]
            .map(i => {
                return {
                    'a': 'a_' + i,
                    'b': 'b_' + i,
                    'c': 'c_' + i,
                };
            });
        this.rowsTable.next([...rows]);
        this.rowsSortedTable.next([...rows]);
    }

}
