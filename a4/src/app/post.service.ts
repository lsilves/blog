import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from './BlogPost';

const perPage = 6;
let myVal: any;
let myData: any;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  getPosts(page, tag, category): Observable<BlogPost[]> { // any?
    myVal = 'https://shrouded-bayou-23990.herokuapp.com/api/posts?page=' + page + '&perPage=' + perPage + ((tag == null || tag == undefined) ? "" : "&tag=" + tag) + ((category == null || category == undefined) ? "" : "&category=" + category);
    console.log("Hello, i am being called. ", myVal);
    
    myData = this.http.get<BlogPost[]>('https://shrouded-bayou-23990.herokuapp.com/api/posts?page=' + page + '&perPage=' + perPage + ((tag == null || tag == undefined) ? "" : "&tag=" + tag) + ((category == null || category == undefined) ? "" : "&category=" + category));
    console.log("MYDATA from GETPOSTS(): ", myData);
    return myData;
  }

  getPostbyId(id): Observable<BlogPost> {
    return this.http.get<BlogPost>('https://shrouded-bayou-23990.herokuapp.com/api/posts/' + id);
  }

  getCategories(): Observable<any> {
    //catArray: Array<any>();
    return this.http.get<any>('https://shrouded-bayou-23990.herokuapp.com/api/categories');
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>('https://shrouded-bayou-23990.herokuapp.com/api/tags');
  }

  getAllPosts():Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>('https://shrouded-bayou-23990.herokuapp.com/api/posts?page=1&perPage=' + Number.MAX_SAFE_INTEGER);
  }

  newPost(data: BlogPost): Observable<any>{
    return this.http.post<any>(`https://shrouded-bayou-23990.herokuapp.com/api/posts`, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any>{
    return this.http.put<any>(`https://shrouded-bayou-23990.herokuapp.com/api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any>{
    return this.http.delete<any>(`https://shrouded-bayou-23990.herokuapp.com/api/posts/${id}`);
  }

  constructor(private http: HttpClient) { }
}
