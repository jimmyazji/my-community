import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  baseApiKey = 'https://mycommunity-api.solutions-it.net/app/api/'
  constructor(private http: HttpClient) { }

  getFavoritePosts() : Observable<Post[]> {
    return this.http.get(this.baseApiKey + 'users/get-user-favourites').pipe(
      map((res: any) =>
        res.value.map((post: Post) => new Post().deserialize(post))));
  }
}
