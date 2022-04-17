import { Customer } from './customer';

export class RenewMembershipRequest {
  customer: Customer;
  subscriptionPlan: string;

  constructor(customer?: Customer, subscriptionPlan?: string) {
    this.customer = customer;
    this.subscriptionPlan = subscriptionPlan;
  }
}
