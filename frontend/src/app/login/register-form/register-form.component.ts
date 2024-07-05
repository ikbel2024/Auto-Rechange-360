import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  usersForm!: FormGroup;
  showMatriculeFiscale: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: [''],
      email: ['', [Validators.required, Validators.email]],
      num_tel: ['', Validators.pattern('^[0-9]+$')],
      mot_de_passe: ['', Validators.minLength(6)],
      role: ['', Validators.required],
      matricule_fiscale: [''],
      isBanned: [false],
      isValidated: [false],
      loginCount: [0]
    });

    this.usersForm.get('role')?.valueChanges.subscribe(value => {
      this.showMatriculeFiscale = value === 'fournisseur';
      if (this.showMatriculeFiscale) {
        this.usersForm.get('matricule_fiscale')?.setValidators([Validators.required]);
      } else {
        this.usersForm.get('matricule_fiscale')?.clearValidators();
      }
      this.usersForm.get('matricule_fiscale')?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.usersForm.valid) {
      const formData = this.usersForm.value;
      this.userService.register(formData).subscribe(
        (response) => {
          if (response && response.user && response.user._id) {
            this.router.navigate(['/user-profile-photo', response.user._id]);
          } else {
            alert('Erreur: Réponse invalide du serveur.');
          }
        },
        (error) => {
          console.error('Erreur lors de l\'inscription : ', error);
          alert('Erreur lors de l\'inscription');
        }
      );
    } else {
      alert('Veuillez remplir correctement tous les champs du formulaire.');
    }
  }
}
