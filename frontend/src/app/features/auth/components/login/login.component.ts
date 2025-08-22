import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // ✅ typo fixed: styleUrls (not styleUrl)
})
export class LoginComponent {
  errorMessage = '';
  loginForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    if (email == null || password == null) {
      this.errorMessage = 'Email and password are required.';
      return;
    }
    const credentials = { email: String(email), password: String(password) };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        // ✅ AuthService already saves token + user in localStorage
        // redirect based on role
        const role = res.user.role;

        if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'doctor') {
          this.router.navigate(['/doctor-dashboard']);
        } else if (role === 'nurse') {
          this.router.navigate(['/nurse-dashboard']);
        } else {
          this.router.navigate(['/patient-dashboard']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Invalid email or password';
      }
    });
  }
}
