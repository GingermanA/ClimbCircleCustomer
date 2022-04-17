import { sub } from "date-fns";
import { Customer } from "./customer";
import { SubscriptionPlan } from "./subscription-plan";

export class UpdateCustomerRequest {
    customer: Customer| undefined;
    subscriptionPlan: SubscriptionPlan| undefined;

    constructor( customer?: Customer, subscriptionPlan?: SubscriptionPlan){
        this.customer = customer;
        this.subscriptionPlan = subscriptionPlan;
    }

}
