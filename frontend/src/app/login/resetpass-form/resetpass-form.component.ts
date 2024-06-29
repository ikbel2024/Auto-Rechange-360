import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
      return 'Password must be at least 6 characters ';
    }
    return '';
  }

  isFieldInvalid(field: string): boolean {
    const control = this.resetPasswordForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const password = this.resetPasswordForm.value.password;
      console.log('Submitting reset password form with token:', this.token, 'and password:',password);

      this.userService.resetPassword(this.token,password).subscribe(
        () => {
          this.resetSuccessful = true;
          this.router.navigate(['/login']); // Redirigez l'utilisateur vers la page de connexion après la réinitialisation
        },
        error => {
          console.error('Error resetting password:', error);
          this.errorMessage = 'Error resetting password. Please try again.';
        }
      );
    }
  }
}
