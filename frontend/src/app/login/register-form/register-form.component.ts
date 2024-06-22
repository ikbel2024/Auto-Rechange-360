import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      num_tel: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      matricule_fiscale: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.registerForm.valid && !this.isLoading) {
      this.isLoading = true;
      try {
        const response = await this.authService.register(this.registerForm.value).toPromise();
        console.log('Réponse du serveur :', response); // Vérifiez la réponse du serveur
        alert('Inscription réussie : ' + response.message);
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        alert((error as any).message || 'Une erreur est survenue lors de l\'inscription.');
      } finally {
        this.isLoading = false;
      }
    } else {
      console.log('Formulaire invalide :', this.registerForm.errors); // Vérifiez les erreurs de validation du formulaire
    }
  }
  
}
