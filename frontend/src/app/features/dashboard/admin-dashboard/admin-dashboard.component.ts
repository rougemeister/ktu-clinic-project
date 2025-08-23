import { Component } from '@angular/core';
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { BottomSidebarComponent } from '../../../shared/bottom-sidebar/bottom-sidebar.component';
import { HeaderComponent } from "../../../shared/header/header.component";
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SidebarComponent, BottomSidebarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
 username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.username = user?.name || 'Guest';
  }

}
