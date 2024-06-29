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
  @Input() user!: User; // Propriété d'entrée pour recevoir les données de l'utilisateur du composant parent
  updateForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    // Initialise le formulaire avec les données de l'utilisateur actuel
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
      // Récupère les valeurs du formulaire
      const updatedUser: User = {
        _id: this.user._id, // Assure de garder l'ID pour l'identification
        nom: this.updateForm.value.nom,
        prenom: this.updateForm.value.prenom,
        adresse: this.updateForm.value.adresse,
        email: this.updateForm.value.email,
        num_tel: this.updateForm.value.num_tel,
        // Ajoutez d'autres champs d'utilisateur à mettre à jour ici
        mot_de_passe: '', // Par exemple, si vous avez besoin de gérer un mot de passe
        role: '', // Ou le rôle de l'utilisateur
        isBanned: false, // Si l'utilisateur est banni ou non
        isValidated: false, // Si l'utilisateur est validé ou non
        loginCount: 0 // Le nombre de connexions de l'utilisateur
      };

      // Appel du service pour mettre à jour l'utilisateur
      this.userService.updateUser(updatedUser).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          // Gérez le succès : affichez un message ou redirigez
        },
        (error) => {
          console.error('Error updating user:', error);
          // Gérez l'erreur : affichez un message d'erreur
        }
      );
    } else {
      // Gérez les erreurs de validation du formulaire si nécessaire
    }
  }
}
