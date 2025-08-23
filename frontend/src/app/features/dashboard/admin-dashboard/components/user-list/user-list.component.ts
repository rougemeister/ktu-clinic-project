import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../auth/services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../../auth/model/model';
import { UserCardComponent } from '../user-card/user-card.component';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
 users: User[] = [];
  loading = true;
  errorMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error fetching users';
        this.loading = false;
      }
    });
  }
}
