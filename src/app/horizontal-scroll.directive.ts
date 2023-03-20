import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[horizontalScroll]'
})
export class HorizontalScrollDirective {

  constructor(private element: ElementRef) { }

  @HostListener("wheel", ["$event"])
  public onScroll(event: WheelEvent) {
    if (event.deltaX) {
      return;
    }
    event.preventDefault();
    this.element.nativeElement.scrollLeft += Math.sign(event.deltaY) * 304;
  }

}
