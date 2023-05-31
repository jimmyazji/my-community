import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  baseApiKey = 'https://api.mycommunityclinics.com/app/api/'
  constructor(private http: HttpClient) { }

  getFavoritePosts(): Observable<Post[]> {
    return this.http.get(this.baseApiKey + 'users/get-user-favourites').pipe(
      map((res: any) =>
        res.value.map((post: Post) => new Post().deserialize(post))));
  }

  addOrRemovePost(postId: number, favored: boolean): Observable<any> {
    if (favored) {
      return this.http.post(this.baseApiKey + 'users/add-post-to-favourites', { postId: postId })
    }
    return this.http.post(this.baseApiKey + 'remove-post-from-favourites', { postId: postId })
  }
}
