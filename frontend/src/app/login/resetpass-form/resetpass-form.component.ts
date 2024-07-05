import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-resetpass-form',
  templateUrl: './resetpass-form.component.html',
  styleUrls: ['./resetpass-form.component.css']
})
export class ResetpassFormComponent implements OnInit {
  resetPasswordForm: FormGroup;
  resetSuccessful: boolean = false;
  errorMessage: string = '';
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  getPasswordErrorMessage(): string {
    const control = this.resetPasswordForm.get('password');
    if (control?.hasError('required')) {
      return 'Password is required';
    }
    if (control?.hasError('minlength')) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  }

  isFieldInvalid(field: string): boolean {
    const control = this.resetPasswordForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.value.password;

      this.userService.resetPassword(this.token, newPassword).subscribe(
        (response: any) => {
          console.log('Password reset successful:', response.message);
          this.resetSuccessful = true;
          // Rediriger l'utilisateur vers la page de connexion après une réinitialisation réussie
          this.router.navigate(['/login']);
        },
        (error: HttpErrorResponse) => {
          console.error('Error resetting password:', error);
          this.errorMessage = error.error || 'Error resetting password. Please try again.';
        }
      );
    }
  }
}
