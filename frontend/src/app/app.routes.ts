import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { UserDashboardComponent } from './features/dashboard/user-dashboard/user-dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: UserDashboardComponent
    }
];
