import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { AuthGuard } from './features/auth/guard/auth.guard';
import { AdminDashboardComponent } from './features/dashboard/admin-dashboard/admin-dashboard.component';
import { PatientDashboardComponent } from './features/dashboard/patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './features/dashboard/doctor-dashboard/doctor-dashboard.component';
import { NurseDashboardComponent } from './features/dashboard/nurse-dashboard/nurse-dashboard.component';
import { AdminOverviewComponent } from './features/dashboard/admin-dashboard/components/admin-overview/admin-overview.component';
import { ManageUsersComponent } from './features/dashboard/admin-dashboard/components/manage-users/manage-users.component';
import { UserListComponent } from './features/dashboard/admin-dashboard/components/user-list/user-list.component';
import { ReportsComponent } from './features/dashboard/admin-dashboard/components/reports/reports.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'patient-dashboard', component: PatientDashboardComponent, canActivate: [AuthGuard], data: { roles: ['patient'] } },
  {
  path: 'admin-dashboard',
  component: AdminDashboardComponent,
  canActivate: [AuthGuard],
  data: { roles: ['admin'] },
  children: [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: AdminOverviewComponent },
    { path: 'manage-users', component: ManageUsersComponent },
    { path: 'users-list', component: UserListComponent },
    { path: 'reports', component: ReportsComponent }
  ]
},
  { path: 'doctor-dashboard', component: DoctorDashboardComponent, canActivate: [AuthGuard], data: { roles: ['doctor'] } },
  { path: 'nurse-dashboard', component: NurseDashboardComponent, canActivate: [AuthGuard], data: { roles: ['nurse'] } },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
