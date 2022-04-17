import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateMembershipPage } from './update-membership.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateMembershipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateMembershipPageRoutingModule {}
