import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locale-switcher',
  templateUrl: './locale-switcher.component.html',
  styleUrls: ['./locale-switcher.component.css']
})
export class LocaleSwitcherComponent {
  locales = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español (Spanish)' },
  ];
  constructor(
    private router: Router,
    @Inject(LOCALE_ID) public activeLocale: string
  ) { }

  handleChange(selectedLocale: string) {
    if (this.activeLocale == selectedLocale) return;
    window.location.href = `/${selectedLocale}${this.router.url}`;
    console.log(`/${selectedLocale}${this.router.url}`);
  }
}