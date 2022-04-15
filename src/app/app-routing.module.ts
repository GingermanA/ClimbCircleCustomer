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
    path: 'routes',
    loadChildren: () =>
      import('./routes/routes.module').then((m) => m.RoutesPageModule),
  },
  {
    path: 'routes/:id',
    loadChildren: () =>
      import('./routes/routes.module').then((m) => m.RoutesPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
