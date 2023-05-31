import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent {
  constructor(private authService: AuthService) { }
  @Output() closeSidenav: EventEmitter<MouseEvent> = new EventEmitter;

  handleNavigation() {
    this.closeSidenav.emit();
  }

  login() {
    this.authService.loginAcquired.next(true);
  }
}
