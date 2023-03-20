import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[changeOnScroll]'
})
export class ChangeOnScrollDirective {

  constructor() { }

  @HostBinding('class.sticky-nav') stickyNav: Boolean = false;

  @HostListener('window:scroll') onScroll() {
    if (window.scrollY >= 48) {
      this.stickyNav = true;
      return
    }
    this.stickyNav = false;
  }

}
