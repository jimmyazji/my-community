import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.css']
})
export class HomeMapComponent {
  mapOpen: boolean = false; @HostListener('document:keydown.esc', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.closeMap();
  }


  openMap(): void {
    this.mapOpen = true;
  }

  closeMap(): void {
    this.mapOpen = false;
  }

}
