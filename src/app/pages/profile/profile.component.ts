import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User;
  constructor(private authService: AuthService) { }

  getProfileDetails() {
    this.authService.getProfile().subscribe((res) => {
      this.user = res;
    })
  }


  ngOnInit(): void {
    this.getProfileDetails();
  }
}
