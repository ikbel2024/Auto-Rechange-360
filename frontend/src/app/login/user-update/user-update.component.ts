import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  @Input() user!: User; // Propriété d'entrée pour l'utilisateur à modifier
  updateForm!: FormGroup;
filteredUsers: any;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.updateForm = this.fb.group({
      nom: [this.user.nom, Validators.required],
      prenom: [this.user.prenom, Validators.required],
      adresse: [this.user.adresse],
      email: [this.user.email, [Validators.required, Validators.email]],
      num_tel: [this.user.num_tel, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedUser: User = {
        _id: this.user._id,
        nom: this.updateForm.value.nom,
        prenom: this.updateForm.value.prenom,
        adresse: this.updateForm.value.adresse,
        email: this.updateForm.value.email,
        num_tel: this.updateForm.value.num_tel,
        // Assurez-vous d'ajouter d'autres champs d'utilisateur à mettre à jour ici
        mot_de_passe: '', // Exemple : gestion du mot de passe
        role: '', // Exemple : rôle de l'utilisateur
        isBanned: false, // Exemple : statut d'interdiction
        isValidated: false, // Exemple : statut de validation
        loginCount: 0 // Exemple : nombre de connexions
      };

      this.userService.updateUser(updatedUser).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          // Gérer le succès : afficher un message ou rediriger
        },
        (error) => {
          console.error('Error updating user:', error);
          // Gérer l'erreur : afficher un message d'erreur
        }
      );
    } else {
      // Gérer les erreurs de validation du formulaire si nécessaire
    }
  }
}
