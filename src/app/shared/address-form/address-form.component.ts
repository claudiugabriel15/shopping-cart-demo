import { AlertService } from './../../services/alert.service';
import { FormControl } from '@angular/forms';
import { LocationService } from './../../services/location.service';
import { AccountSettings } from './../../models/account';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  @Input() model: any;
  @Input() required: boolean;
  @Input() disabled: boolean;

  @Output('submitAction') submitAction = new EventEmitter<any>();

  countriesList: any[];

  constructor(
    private locationService: LocationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  updateCountriesList() {
    this.locationService.getCountriesList(_.get(this, 'model.country', null)).then(
      (list) =>  this.countriesList = list
    );
  }

  submitForm(form: FormControl) {
    if (form.valid) {
      this.submitAction.emit();
    } else {
      this.alertService.errorAlert('Fill in the required fields');
    }

  }

}
