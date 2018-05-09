import { FirebaseShoppingCartService } from './../services/firebase-shopping-cart.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Item } from '../models/item';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  displayedColumns = [
    'image',
    'name',
    'price',
    'quantity',
    'total_price',
    'clear',
  ];

  dataSource: MatTableDataSource<any>;
  totalCost: Observable<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private firebaseShoppingCartService: FirebaseShoppingCartService) {
    this.firebaseShoppingCartService.getItems().subscribe(
      (itemList) => {
        this.dataSource = new MatTableDataSource(itemList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );

    this.totalCost = firebaseShoppingCartService.getTotalCost();
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  addItem(item: Item, quantity?: number) {
    this.firebaseShoppingCartService.addItem(item, quantity);
  }

  removeItem(item: Item) {
    this.firebaseShoppingCartService.removeItem(item);
  }

  clearAll(item: Item) {
    this.firebaseShoppingCartService.removeMultipleItems(item);
  }
}
