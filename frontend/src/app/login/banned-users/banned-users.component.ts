// banned-users.component.ts

import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserFilterService } from '../../services/user-filter.service';

@Component({
  selector: 'app-banned-users',
  templateUrl: './banned-users.component.html',
  styleUrls: ['./banned-users.component.css']
})
export class BannedUsersComponent implements OnInit {
  userService: any;
  unbanUser(user: User): void {
    this.userService.unbanUser(user._id).subscribe(
      () => {
        console.log(`User ${user._id} unbanned successfully.`);
        this.loadBannedUsers(); // Actualiser la liste après débannissement
      },
      (error: any) => {
        console.error('Error unbanning user:', error);
        // Gérer l'erreur : afficher un message d'erreur à l'utilisateur si nécessaire
      }
    );
  }
  bannedUsers: User[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private userFilterService: UserFilterService) { }

  ngOnInit(): void {
    this.loadBannedUsers();
  }

  loadBannedUsers(): void {
    this.loading = true;
    this.userFilterService.getUsersBanned().subscribe(
      (users: User[]) => {
        this.bannedUsers = users;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching banned users:', error);
        this.errorMessage = 'Error fetching banned users. Please try again.';
        this.loading = false;
      }
    );
  }

  // Ajoutez ici d'autres méthodes si nécessaire, par exemple pour supprimer ou mettre à jour les utilisateurs bannis

}
