import { Post } from 'src/app/models/post';
import { FavoriteService } from './../../services/favorite.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  constructor(private favoriteService: FavoriteService, private authService: AuthService, private router: Router) { }
  posts: Post[] = [];
  authChangeSubscription: Subscription = new Subscription;

  getFavoritePosts() {
    if (!this.checkAuth()) return;
    this.favoriteService.getFavoritePosts().subscribe((res) => {
      this.posts = res;
    })
  }

  checkAuth(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.getFavoritePosts();
    this.authChangeSubscription = this.authService.getAuthChange().subscribe(() => this.checkAuth());
  }
}
