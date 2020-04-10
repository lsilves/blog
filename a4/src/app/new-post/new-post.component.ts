import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  blogPost: BlogPost = new BlogPost();
  tags: string;
  querySub: any;
  tagsSub: any;

  constructor(private route: ActivatedRoute, private data: PostService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit(f: NgForm): void {
    this.getFieldsReady(); 
    this.querySub = this.data.newPost(this.blogPost).subscribe(data => {this.blogPost = data; });
    this.router.navigate(['admin']);
  }
  
  getFieldsReady(){
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.blogPost.isPrivate = false;
    this.blogPost.postDate = new Date().toLocaleDateString();
    this.blogPost.postedBy = "WEB422 Student";
    this.blogPost.views = 0;
  }

}
