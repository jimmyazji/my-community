import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() color: 'primary' | 'secondary' | 'danger' | 'icon-button' = 'primary';
  @Input() link: string | any[] | undefined | null
}
