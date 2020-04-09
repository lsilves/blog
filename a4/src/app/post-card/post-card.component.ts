import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../BlogPost';
@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: BlogPost;
  featuredImage: String;
  postDate: any; // toDATE()
  category: String;
  title: String;
  postedBy: any; //Date;
  comments: any; // [] assume it's an array??

  constructor() { }

  ngOnInit(): void {
    this.featuredImage = this.post.featuredImage;
    this.postDate = this.post.postDate;
    this.category = this.post.category;
    this.title = this.post.title;
    this.postedBy = this.post.postedBy;
    this.comments = this.post.comments;
  }

}