import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() type: 'password' | 'text' | 'email' = 'text';
  @Input() placeholder: string = '';
  @Input() name?: string;
  @Input() id?: string;
}
