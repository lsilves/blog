import { Component, OnInit, OnDestroy } from '@angular/core';
//import blogData from '../blogData.json';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  //blogPosts: Array<BlogPost>;// = blogData;
  blogPost: BlogPost;
  private postSub;
  
  constructor(private route: ActivatedRoute, private data: PostService, private router: Router) { }

  ngOnInit(): void {
    

    this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; }
  
    console.log("post click ngoninit");
    this.postSub = this.data.getPostbyId(this.route.snapshot.params['id']).subscribe(data => this.blogPost = data);
  }

  ngOnDestroy(){
    console.log("blogPost data from POST -> ", this.blogPost);
    this.postSub.unsubscribe();
  }


}