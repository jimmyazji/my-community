import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.css']
})
export class HomeMapComponent {
  @HostListener('document:keydown.esc', ['$event'])
  @Output() mapToggled: EventEmitter<boolean> = new EventEmitter;
  mapOpen: boolean = false;

  handleKeyDown(event: KeyboardEvent) {
    this.closeMap();
  }

  openMap(): void {
    this.mapOpen = true;
    this.mapToggled.emit(true);
  }

  closeMap(): void {
    this.mapOpen = false;
    this.mapToggled.emit(false); 
  }

}
