import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { SubscriptionPlan } from '../models/subscription-plan';
import { CustomerService } from '../services/customer.service';
import { SessionService } from '../services/session.service';
import { SubscriptionPlanService } from '../services/subscription-plan.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.page.html',
  styleUrls: ['./membership.page.scss'],
})
export class MembershipPage implements OnInit {
  customer: Customer | undefined;
  subscriptionPlans: SubscriptionPlan[];

  constructor(
    private sessionService: SessionService,
    private customerService: CustomerService,
    private subscriptionPlanService: SubscriptionPlanService
  ) {}

  ngOnInit() {
    this.customer = this.sessionService.getCurrentCustomer();

    this.subscriptionPlanService.getSubscriptionPlans().subscribe({
      next: (response) => {
        this.subscriptionPlans = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // renewMembership(){
  //   this.customerService.renewMembership(this.customer).subscribe({
  //     next: (response) => {
  //       this.resultSuccess = true;
  //       this.resultError = false;
  //       this.message = "Customer updated successfully";
  //     },
  //     error: (error) => {
  //       this.resultError = true;
  //       this.resultSuccess = false;
  //       this.message = "An error has occurred while updating the customer: " + error;

  //       console.log('********** UpdateCustomerComponent: ' + error);
  //     }
  //   });
  // }
}
