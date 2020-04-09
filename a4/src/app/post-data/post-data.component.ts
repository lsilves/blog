import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';



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


  querySub: any; // new

  // postedBy: any; //Date;
  // comments: any; // [] assume it's an array??

  constructor(private route: ActivatedRoute, private data: PostService) { }

  ngOnInit(): void {
    this.querySub = this.data.getPostbyId(this.route.snapshot.params['id']).subscribe(data => this.post = data);

    // this.featuredImage = this.post.featuredImage;
    // this.date = this.post.postDate;
    // this.category = this.post.category;
    // this.title = this.post.title;
    // this.author = this.post.postedBy; // posted by? as opposed to author?
    // this.comments = this.post.comments;
  }

  ngOnDestroy(){
    this.querySub.unsubscribe();
  }

}
