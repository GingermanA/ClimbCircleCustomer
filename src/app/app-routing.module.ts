import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'createNewCustomer',
    loadChildren: () =>
      import('./create-new-customer/create-new-customer.module').then(
        (m) => m.CreateNewCustomerPageModule
      ),
  },
  {
    path: 'gyms',
    loadChildren: () =>
      import('./gyms/gyms.module').then((m) => m.GymsPageModule),
  },
  {
    path: 'gyms/:id',
    loadChildren: () =>
      import('./gyms/gyms.module').then((m) => m.GymsPageModule),
  },
  {
    path: 'createNewBooking',
    loadChildren: () =>
      import('./create-new-booking/create-new-booking.module').then(
        (m) => m.CreateNewBookingPageModule
      ),
  },
  {
    path: 'createNewBooking/:id',
    loadChildren: () =>
      import('./create-new-booking/create-new-booking.module').then(
        (m) => m.CreateNewBookingPageModule
      ),
  },
  {
    path: 'updateMembership',
    loadChildren: () =>
      import('./membership/update-membership/update-membership.module').then(
        (m) => m.UpdateMembershipPageModule
      ),
  },

  {
    path: 'routes/:id',
    loadChildren: () =>
      import('./routes/routes.module').then((m) => m.RoutesPageModule),
  },
  {
    path: 'createRouteReview',
    loadChildren: () =>
      import('./create-route-review/create-route-review.module').then(
        (m) => m.CreateRouteReviewPageModule
      ),
  },
  {
    path: 'createRouteReview/:id',
    loadChildren: () =>
      import('./create-route-review/create-route-review.module').then(
        (m) => m.CreateRouteReviewPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
