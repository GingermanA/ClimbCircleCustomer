import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';
import { SessionService } from '../services/session.service';
import { AlertController } from '@ionic/angular';

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

  constructor(
    private sessionService: SessionService,
    private customerService: CustomerService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.customerToUpdate = new Customer();
  }

  ngOnInit() {
    this.customer = this.sessionService.getCurrentCustomer();
  }

  save() {
    let password: string = this.sessionService.getPassword();
    console.log(password);
    console.log(this.oldPassword);

    if (this.oldPassword == password) {
      this.customerToUpdate.username = this.customer.username;
      this.customerToUpdate.password = this.newPassword;
      this.customerToUpdate.email = this.customer.email;

      this.customerService.updateCustomer(this.customerToUpdate).subscribe({
        next: (response) => {
          this.sessionService.setCurrentCustomer(response);
          this.router.navigate(['tabs/profile']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.alertController
        .create({
          header: 'Alert',
          message: 'Incorrect password',
          buttons: ['OK'],
        })
        .then((res) => {
          res.present();
        });
    }
  }
}
