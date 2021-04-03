import { Routes } from '@angular/router';
import { AdminLoginGuard } from './pages/admin/guards/login.guard';
import { LoginGuard } from './pages/authentication/login-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./pages/courses/courses.module').then((mod) => mod.CoursesModule),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./pages/authentication/authentication.module').then(
        (mod) => mod.AuthenticationModule
      ),
  },
  // {
  //   path: 'payment',
  //   loadChildren: () =>
  //     import('./pages/payment/payment.module').then((mod) => mod.PaymentModule),
  // },
  {
    path: 'master-class',
    loadChildren: () =>
      import('./pages/master-class/master-class.module').then(
        (mod) => mod.MasterClassModule
      ),
    canLoad: [LoginGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((mod) => mod.AdminModule),
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
