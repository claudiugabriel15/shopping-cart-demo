import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ActivatedRoute } from '@angular/router';
import { FirebaseItemService } from '../services/firebase-item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  data: Item = new Item({});

  constructor(
    private activatedRoute: ActivatedRoute,
    private firebaseItemService: FirebaseItemService,

  ) {
    const id = this.activatedRoute.snapshot.params.id || null;

    if (id) {
      this.getItemData(id);
    }
   }

  ngOnInit() {
  }

  getItemData(id: string) {
    this.firebaseItemService.getItem(id).take(1).subscribe(
      (itemData) => {
        this.data = itemData;
      }
    );
  }

}
