import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
loginWithGoogle() {
throw new Error('Method not implemented.');
}
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    console.log('Submitting form with email:', email, 'and password:', password);

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        alert('Login successful!');
        this.router.navigate([response.role === 'admin' ? '/admin/userlist' : '/userlist']);
      },
      error: (error) => {
        this.errorMessage = this.getErrorMessage(error);
      }
    });
  }

  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      // A client-side or network error occurred.
      return 'Unable to connect to the server. Please check your network connection.';
    } else if (error.status >= 500) {
      // Server-side error
      return 'Internal server error. Please try again later.';
    } else if (error.status === 400) {
      // Bad request error
      return 'Invalid request. Please check your input and try again.';
    } else {
      // Application-specific error
      return error.error.message || 'Login failed. Please try again.';
    }
  }

  // Optional: Helper methods to display validation messages in the template
  isFieldInvalid(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getEmailErrorMessage(): string {
    const control = this.loginForm.get('email');
    if (control?.hasError('required')) {
      return 'Email is required';
    }
    return control?.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage(): string {
    const control = this.loginForm.get('password');
    return control?.hasError('required') ? 'Password is required' : '';
  }
}
