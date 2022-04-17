import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { SubscriptionPlan } from 'src/app/models/subscription-plan';
import { CustomerService } from 'src/app/services/customer.service';
import { SessionService } from 'src/app/services/session.service';
import { SubscriptionPlanService } from 'src/app/services/subscription-plan.service';

@Component({
  selector: 'app-update-membership',
  templateUrl: './update-membership.page.html',
  styleUrls: ['./update-membership.page.scss'],
})
export class UpdateMembershipPage implements OnInit {
  resultSuccess: boolean;
  resultError: boolean;
  message: string;

  customerToUpdate: Customer;
  subscriptionPlan: SubscriptionPlan;
  subscriptionPlans: SubscriptionPlan[];

  constructor(
    private subscriptionPlanService: SubscriptionPlanService,
    private customerService: CustomerService,
    private sessionService: SessionService) {

  }

  ngOnInit() {
    this.customerToUpdate = this.sessionService.getCurrentCustomer();
    this.subscriptionPlanService.getSubscriptionPlans().subscribe({
      next: (response) => {
        this.subscriptionPlans = response;
      },
      error: (error) => {
        console.log('********** CreateNewProductPage: ' + error);
      },
    });

  }
  update(updateCustomerForm: NgForm) {
    if (updateCustomerForm.valid) {
      this.customerService.updateCustomer(this.customerToUpdate).subscribe({
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
}
