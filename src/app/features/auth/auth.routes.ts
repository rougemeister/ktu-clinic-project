// auth.routes.ts
import { Routes } from '@angular/router';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPaswordComponent } from './reset-pasword/reset-pasword.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: SignInFormComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password/:token',
    component: ResetPaswordComponent
  }
];