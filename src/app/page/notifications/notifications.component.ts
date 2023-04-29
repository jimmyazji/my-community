import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{
  notifications: Notification[] = [];
  constructor(private notificationService: NotificationService) { }

  getNotifications() {
    this.notificationService.getNotifications().subscribe((res) => {
      this.notifications = res;
      console.log(this.notifications);
    })
  }

  ngOnInit(): void {
    this.getNotifications();
  }
}
