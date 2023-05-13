import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoryDetailsComponent } from '../story-details/story-details.component';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent {
  @Input() stories: any[] = []
  @Input() posts = []

  constructor(private dialog: MatDialog) { }

  openStoryModal(story: any) {
    const dialogRef = this.dialog.open(StoryDetailsComponent, {
      data: story
    });
  }

}
