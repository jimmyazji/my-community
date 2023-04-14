import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input() rate?: number = 0.0;
  @Input() size: 'sm' | 'md' | 'lg' = 'sm';

  @Output() private ratingUpdated = new EventEmitter();

  rateArr: number[] = [];
  starCount = 5;

  constructor(public loader: LoadingBarService) { }


  ngOnInit() {

  }
  ngOnChanges() {
    if (this.rate) {
      for (let index = 0; index < this.starCount; index++) {
        let percentage = Math.round((this.rate - index) * 100);
        if (percentage < 0) {
          this.rateArr.push(0);
        }
        else {
          if (percentage > 100) percentage = 100;
          this.rateArr.push(percentage);
        }
      }
    }
  }

  onClick(rating: number) {
    this.ratingUpdated.emit(rating);
    return false;
  }

}
