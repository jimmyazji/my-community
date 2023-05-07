import { Post } from 'src/app/models/post';
import { FavoriteService } from './../../services/favorite.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  constructor(private favoriteService: FavoriteService) { }
  posts: Post[] = [];

  getFavoritePosts() {
    this.favoriteService.getFavoritePosts().subscribe((res) => {
      this.posts = res;
    })
  }

  ngOnInit(): void {
    this.getFavoritePosts();
  }
}
