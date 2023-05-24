import { Directive, HostBinding, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Directive({
  selector: '[changeOnScroll]'
})
export class ChangeOnScrollDirective {

  constructor(private dialog: MatDialog) { }

  @HostBinding('class.sticky-nav') stickyNav: Boolean = false;

  @HostListener('window:scroll') onScroll() {
    if (window.scrollY >= 48 || this.dialog.openDialogs.length) {
      this.stickyNav = true;
      return
    }
    this.stickyNav = false;
  }

}
