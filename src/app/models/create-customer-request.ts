import { Customer } from './customer';

export class CreateCustomerRequest {
  newCustomer: Customer;
  subscriptionPlan: string;

  constructor(newCustomer?: Customer, subscriptionPlan?: string) {
    this.newCustomer = newCustomer;
    this.subscriptionPlan = subscriptionPlan;
  }
}
