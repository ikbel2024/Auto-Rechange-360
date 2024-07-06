import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from 'src/app/services/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './userlist-form.component.html',
  styleUrls: ['./userlist-form.component.css']
})
export class UserListComponent implements OnInit {
showStatistics() {
throw new Error('Method not implemented.');
}
filterUsers(arg0: string) {
throw new Error('Method not implemented.');
}
  searchTerm: string = '';
  filteredUsers: User[] = [];
  users: User[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (users: User[]) => {
          this.users = users;
          this.applyFilter(); // Appliquer le filtre initial après le chargement des utilisateurs
        },
        (error) => {
          console.error('Error fetching users:', error);
          this.errorMessage = 'Error fetching users. Please try again.';
        }
      );
  }

  onSearch(): void {
    this.applyFilter();
  }

  applyFilter(): void {
    const searchTerm = this.searchTerm.toLowerCase().trim();
    if (!searchTerm) {
      this.filteredUsers = [...this.users]; // Afficher tous les utilisateurs si le champ de recherche est vide
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.nom.toLowerCase().includes(searchTerm) ||
        user.prenom.toLowerCase().includes(searchTerm)
      );
    }
  }

  banUser(user: User): void {
    if (!user || !user._id) {
      console.error('User or user._id is undefined or null.');
      return;
    }
  
    this.userService.banUser(user._id).subscribe(
      (response) => {
        console.log(`User ${user._id} banned successfully.`);
        // Vous pouvez ici mettre à jour localement votre liste de utilisateurs ou effectuer d'autres actions nécessaires
      },
      (error) => {
        console.error('Error banning user:', error);
        // Gérer l'erreur : afficher un message d'erreur à l'utilisateur si nécessaire
      }
    );}

  deleteUser(user: User): void {
    if (!user || !user._id) {
      console.error('User or user._id is undefined or null.');
      return;
    }

    this.userService.deleteUser(user).pipe(
      finalize(() => {
        // Actions à effectuer après la suppression, si nécessaire
      })
    ).subscribe(
      () => {
        console.log(`User ${user._id} deleted successfully.`);
        // Rechargez la liste des utilisateurs après la suppression si nécessaire
        this.loadUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
        // Affichez un message d'erreur approprié à l'utilisateur dans votre interface
        // Par exemple, this.errorMessage = 'Failed to delete user. Please try again.';
      }
    );
  }

  updateUser(user: User): void {
    // Détails de l'implémentation pour mettre à jour l'utilisateur
  }
}
