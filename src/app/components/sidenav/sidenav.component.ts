import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Output() closeSidenav: EventEmitter<MouseEvent> = new EventEmitter;

  handleNavigation() {
      this.closeSidenav.emit();
  }
}
