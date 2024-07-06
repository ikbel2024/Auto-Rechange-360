// banned-users.component.ts

import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserFilterService } from '../../services/user-filter.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-banned-users',
  templateUrl: './banned-users.component.html',
  styleUrls: ['./banned-users.component.css']
})

export class BannedUsersComponent implements OnInit {

  constructor(private userFilterService: UserFilterService , private userService: UserService) { }

  unbanUser(user: User): void {
    this.userService.unbanUser(user._id).subscribe(
      () => {
        console.log(`User ${user._id} unbanned successfully.`);
        this.loadBannedUsers();
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

  
}
