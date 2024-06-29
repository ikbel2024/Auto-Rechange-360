// src/app/components/request-reset-password/request-reset-password.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './requestresetpassword-form.component.html',
  styleUrls: ['./requestresetpassword-form.component.css']
})
export class RequestResetPasswordComponent {
  requestResetForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.requestResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.requestResetForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
  

  getEmailErrorMessage(): string {
    const emailControl = this.requestResetForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'Email is required';
    }
    return emailControl?.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit(): void {
    if (this.requestResetForm.valid) {
      this.userService.requestPasswordReset(this.requestResetForm.value.email).subscribe(
        () => {
          console.log('Password reset request sent');
        },
        (error: any) => {
          console.error('Error requesting password reset:', error);
        }
      );
    }
  }
}
