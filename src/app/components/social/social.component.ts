import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoryDetailsComponent } from '../story-details/story-details.component';
import { Clinic } from 'src/app/models/clinic';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent {
  @Input() stories: any[] = []
  @Input() posts = []
  @Input() withShareAndFav: boolean = true;
  @Input() clinic: Clinic | undefined;
  constructor(private dialog: MatDialog) { }

  openStoryModal(story: any) {
    const dialogRef = this.dialog.open(StoryDetailsComponent, {
      data: story
    });
  }

}
