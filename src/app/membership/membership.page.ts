import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { SubscriptionPlan } from '../models/subscription-plan';
import { CustomerService } from '../services/customer.service';
import { SessionService } from '../services/session.service';
import { SubscriptionPlanService } from '../services/subscription-plan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.page.html',
  styleUrls: ['./membership.page.scss'],
})
export class MembershipPage implements OnInit {
  customer: Customer;
  subscriptionPlans: SubscriptionPlan[];
  selectedPlan: string;

  constructor(
    private sessionService: SessionService,
    private customerService: CustomerService,
    private subscriptionPlanService: SubscriptionPlanService,
    private router: Router
  ) {}

  ngOnInit() {
    this.customerService.getCustomer().subscribe({
      next: (response) => {
        this.customer = response;
        this.selectedPlan = this.customer.subscriptionPlan.name;
      },
      error: (error) => {
        console.log(error);
      },
    });

    // console.log(this.sessionService.getPasses());
    // console.log(this.sessionService.getSubscriptionPlan());

    this.subscriptionPlanService.getSubscriptionPlans().subscribe({
      next: (response) => {
        this.subscriptionPlans = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ionViewWillEnter() {
    this.customerService.getCustomer().subscribe({
      next: (response) => {
        this.customer = response;
        this.selectedPlan = this.customer.subscriptionPlan.name;
      },
      error: (error) => {
        console.log(error);
      },
    });

    // console.log(this.sessionService.getPasses());
    // console.log(this.sessionService.getSubscriptionPlan());

    this.subscriptionPlanService.getSubscriptionPlans().subscribe({
      next: (response) => {
        this.subscriptionPlans = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onClick(plan: string) {
    this.selectedPlan = plan;
    console.log(this.selectedPlan);
  }

  renew() {
    //this.sessionService.setSubscriptionPlan(this.selectedPlan);
    this.customerService
      .renewMembership(this.customer, this.selectedPlan)
      .subscribe({
        next: (response) => {
          // console.log(response);
          // this.sessionService.setCurrentCustomer(response);
          // this.sessionService.setPasses(response.numOfPassesLeft);
          //this.router.navigate['tabs/membership'];
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
