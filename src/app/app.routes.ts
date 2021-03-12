import { Routes } from '@angular/router';
import { AdminLoginGuard } from './pages/admin/guards/login.guard';

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
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((mod) => mod.AdminModule),
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
