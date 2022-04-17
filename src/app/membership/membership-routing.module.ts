import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembershipPage } from './membership.page';

const routes: Routes = [
  {
    path: '',
    component: MembershipPage
  },
  {
    path: 'update-membership',
    loadChildren: () => import('./update-membership/update-membership.module').then( m => m.UpdateMembershipPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembershipPageRoutingModule {}
