import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRouteReviewPageRoutingModule } from './create-route-review-routing.module';

import { CreateRouteReviewPage } from './create-route-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRouteReviewPageRoutingModule
  ],
  declarations: [CreateRouteReviewPage]
})
export class CreateRouteReviewPageModule {}
