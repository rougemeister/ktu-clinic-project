import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  // Public routes
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/sign-in-form/sign-in-form.component').then(m => m.SignInFormComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'reset-password/:token',
    loadComponent: () => import('./features/auth/reset-pasword/reset-pasword.component').then(m => m.ResetPaswordComponent)
  },

  // Patient routes
//   {
//     path: 'patient',
//     canActivate: [AuthGuard],
//     data: { role: 'patient' },
//     loadChildren: () => import('./features/patient/patient.routes').then(r => r.PATIENT_ROUTES)
//   },

//   // Staff routes
//   {
//     path: 'staff',
//     canActivate: [AuthGuard],
//     data: { role: 'staff' },
//     loadChildren: () => import('./features/staff/staff.routes').then(r => r.STAFF_ROUTES)
//   },

//   // Admin routes
//   {
//     path: 'admin',
//     canActivate: [AuthGuard],
//     data: { role: 'admin' },
//     loadChildren: () => import('./features/admin/admin.routes').then(r => r.ADMIN_ROUTES)
//   },

  // Fallback route
  {
    path: '**',
    redirectTo: '/login'
  }
];