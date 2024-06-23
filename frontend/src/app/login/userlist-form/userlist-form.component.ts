import { Observable } from 'rxjs';
import { User } from '../../model/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './userlist-form.component.html',
  styleUrls: ['./userlist-form.component.css']
})

export class UserListComponent implements OnInit {
banUser(_t19: User) {
throw new Error('Method not implemented.');
}
deleteUser(_t19: User) {
throw new Error('Method not implemented.');
}
updateUser(_t19: User) {
throw new Error('Method not implemented.');
}  
  users: User[] = [];
  user: any;
  loading = false;
  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsers()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (users) => {
          this.users = users;
        },
        error: (error) => {
          console.error('Error fetching users:', error);
          // Handle error display or processing here
        }
      });
  }
}
