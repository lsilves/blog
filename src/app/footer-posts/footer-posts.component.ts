import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';


@Component({
  selector: 'app-footer-posts',
  templateUrl: './footer-posts.component.html',
  styleUrls: ['./footer-posts.component.scss']
})
export class FooterPostsComponent implements OnInit {

  //@Input() posts: Array<BlogPost>;
  posts: Array<BlogPost>;
  constructor(private data: PostService) { }

  ngOnInit(): void {
    this.data.getPosts(1, null, null).subscribe(data => this.posts = data.slice(0,3));
  }

}