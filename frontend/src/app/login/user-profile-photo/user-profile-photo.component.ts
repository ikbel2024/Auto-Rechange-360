import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile-photo',
  templateUrl: './user-profile-photo.component.html',
  styleUrls: ['./user-profile-photo.component.css']
})
export class UserProfilePhotoComponent {
  selectedPhoto: File | null = null;
  message: string | null = null;
  userId: string;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.userId = this.route.snapshot.paramMap.get('id')!;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedPhoto = event.target.files[0];
    }
  }

  uploadPhoto() {
    if (this.selectedPhoto) {
      this.userService.uploadProfilePhoto(this.userId, this.selectedPhoto).subscribe(
        () => {
          this.message = 'Photo de profil téléchargée avec succès!';
          this.router.navigate(['/profile', this.userId]);
        },
        error => {
          this.message = 'Erreur lors du téléchargement de la photo de profil.';
        }
      );
    }
  }

  finalizeRegistration() {
    this.router.navigate(['/profile', this.userId]);
  }
}
