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
  emailSent: boolean = false; // Variable pour suivre l'état d'envoi de l'email

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
          this.emailSent = true; // Activer l'affichage de l'alerte
          this.requestResetForm.reset(); // Réinitialiser le formulaire après envoi
        },
        (error: any) => {
          console.error('Error requesting password reset:', error);
        }
      );
    }
  }
}
