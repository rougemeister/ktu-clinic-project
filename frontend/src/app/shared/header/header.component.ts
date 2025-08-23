import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


export interface NavigationItem {
  label: string;
  route?: string;
  url?: string;
  icon?: string;
  children?: NavigationItem[];
  action?: () => void;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})





export class HeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() logoUrl?: string;
  @Input() navigationItems: NavigationItem[] = [];
  @Input() userProfile?: UserProfile;
  @Input() showSearch: boolean = true;
  @Input() showNotifications: boolean = true;
  @Input() notificationCount: number = 0;
  @Input() theme: 'light' | 'dark' = 'light';

  @Output() searchQuery = new EventEmitter<string>();
  @Output() notificationClick = new EventEmitter<void>();
  @Output() profileMenuClick = new EventEmitter<string>();
  @Output() logoClick = new EventEmitter<void>();

  isMenuOpen = false;
  isProfileMenuOpen = false;
  searchValue = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize component
  }

  toggleMobileMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchValue = target.value;
  }

  onSearchSubmit(): void {
    if (this.searchValue.trim()) {
      this.searchQuery.emit(this.searchValue.trim());
    }
  }

  onNavigationClick(item: NavigationItem): void {
    if (item.action) {
      item.action();
    } else if (item.route) {
      this.router.navigate([item.route]);
    } else if (item.url) {
      window.open(item.url, '_blank');
    }
  }

  onNotificationClick(): void {
    this.notificationClick.emit();
  }

  onProfileAction(action: string): void {
    this.profileMenuClick.emit(action);
    this.isProfileMenuOpen = false;
  }

  onLogoClick(): void {
    this.logoClick.emit();
  }

  // Close dropdowns when clicking outside
  closeDropdowns(): void {
    this.isProfileMenuOpen = false;
    this.isMenuOpen = false;
  }
}
