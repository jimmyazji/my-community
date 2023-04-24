import { MainNavigationBarComponent } from './components/main-navigation-bar/main-navigation-bar.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MainNavigationBarComponent) navigation!: MainNavigationBarComponent;
  title = 'my-community';
  drawerOpened: boolean = false;
}
