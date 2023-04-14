import { Component, Input, OnInit } from '@angular/core';
import { Provider } from '../models/provider';

@Component({
  selector: 'app-provider-card',
  templateUrl: './provider-card.component.html',
  styleUrls: ['./provider-card.component.css']
})
export class ProviderCardComponent implements OnInit{
  @Input() provider?: Provider

  ngOnInit(): void {
  }
}
