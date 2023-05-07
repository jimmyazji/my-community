import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arch',
  templateUrl: './arch.component.html',
  styleUrls: ['./arch.component.css']
})
export class ArchComponent {
  @Input() contentClasses: string[] = [];
}
