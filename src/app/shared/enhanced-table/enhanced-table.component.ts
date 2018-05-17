import { EnhancedTableColumn } from './enhanced-table-column';
import { Component, ViewChild, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import * as _ from 'lodash';

@Component({
  selector: 'app-enhanced-table',
  templateUrl: './enhanced-table.component.html',
  styleUrls: ['./enhanced-table.component.css']
})
export class EnhancedTableComponent implements OnChanges {

  @Input() columns: EnhancedTableColumn[];
  @Input() rows: any[];
  @Input() displayOnly: boolean;

  @Output('remove') remove = new EventEmitter<any>();
  @Output('edit') edit = new EventEmitter<any>();

  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  ngOnChanges(simple: SimpleChanges) {
    if (simple.columns) {
      this.displayedColumns =  _.map(this.columns, 'name');
    }
    if (simple.rows && simple.rows.currentValue !== null) {
      this.dataSource = new MatTableDataSource(this.rows);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  removeItem(element: any) {
    this.remove.emit(element);
  }

  editItem(element: any) {
    this.edit.emit(element);
  }

  evalExpression(element: any, expression: any) {
    const varArray = [];
    _.each(expression.variables, (variable) => {
      varArray.push(element[variable]);
    });

    // tslint:disable-next-line:no-eval
    const expressionVal = parseInt(eval(varArray.join(expression.operation)), 10);

    return _.isNumber(expressionVal) ? expressionVal : '';
  }
}
