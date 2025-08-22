import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { AuthGuard } from './features/auth/guard/auth.guard';
import { AdminDashboardComponent } from './features/dashboard/admin-dashboard/admin-dashboard.component';
import { PatientDashboardComponent } from './features/dashboard/patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './features/dashboard/doctor-dashboard/doctor-dashboard.component';
import { NurseDashboardComponent } from './features/dashboard/nurse-dashboard/nurse-dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },

  { path: 'patient-dashboard', component: PatientDashboardComponent, canActivate: [AuthGuard], data: { roles: ['patient'] } },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent, canActivate: [AuthGuard], data: { roles: ['doctor'] } },
  { path: 'nurse-dashboard', component: NurseDashboardComponent, canActivate: [AuthGuard], data: { roles: ['nurse'] } },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
