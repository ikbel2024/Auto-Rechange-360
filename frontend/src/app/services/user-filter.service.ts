// user-filter.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserFilterService {

  constructor(private userService: UserService) { }

  getUsersBanned(): Observable<User[]> {
    // Appel à votre UserService pour récupérer uniquement les utilisateurs bannis
    return this.userService.getUsers().pipe(
      map((users: User[]) => users.filter(user => user.isBanned))
    );
  }

}
