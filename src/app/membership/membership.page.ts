import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.page.html',
  styleUrls: ['./membership.page.scss'],
})
export class MembershipPage implements OnInit {
  customer: Customer | undefined;
  resultSuccess: boolean;
  resultError: boolean;
  message: string;
  
  constructor(
    private sessionService: SessionService,
    private customerService: CustomerService,
  ) {}

  ngOnInit() {
    this.customer = this.sessionService.getCurrentCustomer();
  }

  renewMembership(){
    this.customerService.renewMembership(this.customer).subscribe({
      next: (response) => {
        this.resultSuccess = true;
        this.resultError = false;
        this.message = "Customer updated successfully";
      },
      error: (error) => {
        this.resultError = true;
        this.resultSuccess = false;
        this.message = "An error has occurred while updating the customer: " + error;

        console.log('********** UpdateCustomerComponent: ' + error);
      }
    });
  }



}
