import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.scss']
})
export class PostDataComponent implements OnInit {
  //@Input() post: BlogPost;
  post: BlogPost;
  featuredImage: String;
  category: String;
  title: String;
  date: any; // toDATE()
  views: number;
  comments: any;
  author: String;
  tags: any;
  commentName: string;
  commentText: string;


  querySub: any; 
  commentSub: any;

  // postedBy: any; //Date;
  // comments: any; // [] assume it's an array??

  constructor(private route: ActivatedRoute, private data: PostService) { }

  ngOnInit(): void {
    //console.log("THIS IS THE AMOUNT OF VIEWS: ", this.post.views);

    this.querySub = this.data.getPostbyId(this.route.snapshot.params['id']).subscribe(data => {this.post = data; this.post.views = this.post.views + 1; this.data.updatePostById(this.post._id, this.post).subscribe();});
    //this.post.views = this.post.views + 1;
   // this.data.updatePostById(this.post._id, this.post).subscribe(); 
   // this.querySub = this.data.getPostbyId(this.route.snapshot.params['id']).subscribe(data => {this.post = data;});

    //console.log("THIS IS THE AMOUNT OF VIEWS: ", this.post.views);
  } 

  ngOnDestroy(){
    this.querySub.unsubscribe();
  }

  submitComment(): void {
    // this.blogPost.tags = this.tags;//.split(",").map(tag => tag.trim());
    // this.getFieldsReady(); 
    // this.querySub = this.data.newPost(this.blogPost).subscribe(data => {this.blogPost = data; this.tags = data.tags; });
    // this.router.navigate(['admin']);
    let myComment = [{ author: this.commentName, comment: this.commentText, date: new Date().toLocaleDateString()}];
    this.post.comments.push({ author: this.commentName, comment: this.commentText, date: new Date().toLocaleDateString()});
    this.commentSub = this.data.updatePostById(this.post._id, this.post).subscribe(data => { this.post = data; });
    //this.post.comments.push
    this.commentName = '';
    this.commentText = '';
  }

}
