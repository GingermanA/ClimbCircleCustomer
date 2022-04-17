import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMembershipPageRoutingModule } from './update-membership-routing.module';

import { UpdateMembershipPage } from './update-membership.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateMembershipPageRoutingModule
  ],
  declarations: [UpdateMembershipPage]
})
export class UpdateMembershipPageModule {}
