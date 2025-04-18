
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';


@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss'
})
export class SignInFormComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  roles = [
    { value: 'patient', label: 'Patient' },
    { value: 'staff', label: 'Medical Staff' },
    { value: 'admin', label: 'Administrator' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['patient', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password, role } = this.loginForm.value;

    this.authService.login(email, password, role).subscribe({
      next: (user) => {
        this.isLoading = false;
        // Redirect based on role
        switch (user.role) {
          case 'patient':
            this.router.navigate(['/patient/dashboard']);
            break;
          case 'staff':
            this.router.navigate(['/staff/dashboard']);
            break;
          case 'admin':
            this.router.navigate(['/admin/dashboard']);
            break;
          default:
            this.router.navigate(['/']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to login. Please check your credentials.';
      }
    });
  }

}
