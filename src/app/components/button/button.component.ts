import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() color: 'primary' | 'secondary' | 'danger' | 'icon-button' | 'transparent' = 'primary';
  @Input() link: string | undefined | null
  @Input() fullWidth: Boolean = false;
  @Input() rounded: Boolean = true;
  @Input() type?: 'submit' | 'button' 
}
