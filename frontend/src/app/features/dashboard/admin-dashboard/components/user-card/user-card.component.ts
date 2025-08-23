import { Component, Input } from '@angular/core';
import { User } from '../../../../auth/model/model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
    @Input() user!: User;

  /**
   * Generate initials from user name
   */
  getInitials(name: string): string {
    if (!name) return '';
    
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  /**
   * Get CSS class based on user role
   */
  getRoleClass(role: string): string {
    if (!role) return '';
    
    const normalizedRole = role.toLowerCase().trim();
    
    switch (normalizedRole) {
      case 'admin':
      case 'administrator':
        return 'admin';
      case 'user':
        return 'user';
      case 'moderator':
      case 'mod':
        return 'moderator';
      default:
        return '';
    }
  }
}




