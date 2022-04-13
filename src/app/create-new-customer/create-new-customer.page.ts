import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { SubscriptionPlan } from '../models/subscription-plan';
import { CustomerService } from '../services/customer.service';
import { SubscriptionPlanService } from '../services/subscription-plan.service';


@Component({
  selector: 'app-create-new-customer',
  templateUrl: './create-new-customer.page.html',
  styleUrls: ['./create-new-customer.page.scss'],
})
export class CreateNewCustomerPage implements OnInit {
  customer: Customer;
  message: string | undefined;
  subscriptionPlans: SubscriptionPlan[];
  subscriptionPlanService: any;

  constructor(private customerService: CustomerService, subscriptionPlanService: SubscriptionPlanService) {
    this.customer = new Customer();
  }

  ngOnInit()
  {
    this.subscriptionPlanService.getSubscriptionPlans().subscribe({
      next:(response)=>{
        this.subscriptionPlans = response;
      },
      error:(error)=>{
        console.log('********** CreateNewProductPage: ' + error);
      }
    });				
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



}
