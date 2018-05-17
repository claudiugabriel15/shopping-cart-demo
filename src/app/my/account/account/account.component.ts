import { Component, OnInit } from '@angular/core';
import { AccountSettings } from '../../../models/account';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountSettings: AccountSettings;

  constructor() { }

  ngOnInit() {
  }

}
