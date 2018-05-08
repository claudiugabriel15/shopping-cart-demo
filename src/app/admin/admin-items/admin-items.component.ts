import { FirebaseItemService } from './../../services/firebase-item.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.css']
})
export class AdminItemsComponent {
  displayedColumns = [
    'id',
    'name',
    'price',
    'edit'
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private firebaseItemService: FirebaseItemService
  ) {
    this.firebaseItemService.getItemList().subscribe(
      (itemList) => {
        this.dataSource = new MatTableDataSource(itemList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
