import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  customer: Customer;
  customerToUpdate: Customer;
  oldPassword: string = '';
  newPassword: string = '';

  constructor(private sessionService: SessionService) {
    this.customerToUpdate = new Customer();
  }

  ngOnInit() {
    this.customer = this.sessionService.getCurrentCustomer();
  }

  save() {}
}
