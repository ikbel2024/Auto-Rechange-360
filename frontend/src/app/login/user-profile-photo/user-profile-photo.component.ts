import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile-photo',
  templateUrl: './user-profile-photo.component.html',
  styleUrls: ['./user-profile-photo.component.css']
})
export class UserProfilePhotoComponent {
  selectedPhotoUrl: string | null = null;
  message: string | null = null;
  userId: string;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.userId = this.route.snapshot.paramMap.get('id')!;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // Example of generating a URL from the file, adjust as per your needs
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedPhotoUrl = reader.result as string;
      };
    }
  }

  uploadPhoto() {
    if (this.selectedPhotoUrl) {
      this.userService.uploadProfilePhoto(this.userId, this.selectedPhotoUrl).subscribe(
        () => {
          // Show success message or animation
          this.message = 'Registration completed successfully! Redirect to login page...';

          // Redirect to login page after a delay (example: 3 seconds)
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error => {
          console.error('Erreur lors du téléchargement de la photo de profil :', error);
          this.message = 'Erreur lors du téléchargement de la photo de profil.';
        }
      );
    }
  }
  finalizeRegistration() {
    this.router.navigate(['/login', this.userId]);
  }

  submitForm() {
    if (this.selectedPhotoUrl) {
      this.uploadPhoto();
    } else {
      this.message = 'Veuillez sélectionner une photo avant de soumettre le formulaire.';
    }
  }
}
