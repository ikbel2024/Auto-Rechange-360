import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: string;
  userDetails: any;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.userId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.userService.getUserById(this.userId).subscribe(
      (data) => {
        this.userDetails = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load user details.';
        console.error('Error loading user details:', error);
      }
    );
  }
  
}
