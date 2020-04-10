import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  blogPost: BlogPost;
  tags: string;
  querySub: any;
  tagsSub: any;
  
  constructor(private route: ActivatedRoute, private data: PostService, private router: Router) { }

  ngOnInit(): void {
    this.querySub = this.data.getPostbyId(this.route.snapshot.params['id']).subscribe(data => {this.blogPost = data; this.tags = this.blogPost.tags.toString();});
    //this.tagsSub = this.data.getTags().subscribe(data => this.tags = data);
  }

  formSubmit(f: NgForm): void {
    //this.tags = this.tags;//.split(",").map(tag => tag.trim());
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.querySub = this.data.updatePostById(this.blogPost._id, this.blogPost).subscribe(data => {this.blogPost = data;  this.router.navigate(['admin']);
  });
  }

  // this.data.getTags().subscribe(data => this.tags = data.toString()); 
  
  deletePost(){
    console.log("goodbye!");
    this.querySub = this.data.deletePostById(this.blogPost._id).subscribe(data => {this.blogPost = data; this.router.navigate(['admin']); });
    
  }

}
