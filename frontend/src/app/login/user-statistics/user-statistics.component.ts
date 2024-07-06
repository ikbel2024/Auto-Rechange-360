import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {
getMonthName(arg0: any) {
throw new Error('Method not implemented.');
}
  roleStats: any[] = [];
  loginStats: any[] = [];
  bannedUserCount: number = 0;
  registrationStats: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUserStatistics();
  }

  fetchUserStatistics(): void {
    this.userService.getUserRoleStatistics().subscribe({
      next: (stats: any[]) => {
        this.roleStats = stats;
      },
      error: (error: any) => {
        console.error('Error fetching role statistics:', error);
        // Handle error gracefully, e.g., show an error message
      }
    });

    this.userService.getUserLoginStatistics().subscribe({
      next: (stats: any[]) => {
        this.loginStats = stats;
      },
      error: (error: any) => {
        console.error('Error fetching login statistics:', error);
        // Handle error gracefully, e.g., show an error message
      }
    });

    this.userService.getBannedUserStatistics().subscribe({
      next: (data: any) => {
        this.bannedUserCount = data.bannedUserCount;
      },
      error: (error: any) => {
        console.error('Error fetching banned user statistics:', error);
        // Handle error gracefully, e.g., show an error message
      }
    });

    this.userService.getUserRegistrationStatistics().subscribe({
      next: (stats: any[]) => {
        this.registrationStats = stats;
      },
      error: (error: any) => {
        console.error('Error fetching registration statistics:', error);
        // Handle error gracefully, e.g., show an error message
      }
    });
  }
}
