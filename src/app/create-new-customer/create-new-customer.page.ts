import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';


@Component({
  selector: 'app-create-new-customer',
  templateUrl: './create-new-customer.page.html',
  styleUrls: ['./create-new-customer.page.scss'],
})
export class CreateNewCustomerPage implements OnInit {
  customer: Customer;
  message: string | undefined;

  constructor(private customerService: CustomerService) {
    this.customer = new Customer();
  }

  createCustomer() {
    this.customerService.createNewCustomer(this.customer).subscribe({
      next: (response) => {
        let newCustomerId: number = response;
        this.message = "New customer " + newCustomerId + " created successfully";
      },
      error: (error) => {
        this.message = "An error has occurred while creating the new customer: " + error;

        console.log('********** CreateNewCustomerComponent.ts: ' + error);
      }
    });
  }

  ngOnInit() {
  }

}
