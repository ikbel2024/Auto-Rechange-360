import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  usersForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
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
  }

  onSubmit(): void {
    if (this.usersForm.valid) {
      // Récupérez les valeurs du formulaire à envoyer au backend ou à traiter localement
      const formData = this.usersForm.value;
      // Exemple: Appelez le service pour enregistrer l'utilisateur
      this.userService.register(formData).subscribe(
        (response) => {
          alert('Inscription réussie : ' + response.message);
          // Réinitialisez le formulaire après une inscription réussie
          this.usersForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'inscription : ', error);
          alert('Erreur lors de l\'inscription');
        }
      );
    } else {
      // Affichez un message d'erreur si le formulaire est invalide
      alert('Veuillez remplir correctement tous les champs du formulaire.');
    }
  }
}
