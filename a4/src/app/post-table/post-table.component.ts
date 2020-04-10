import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';



@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss']
})
export class PostTableComponent implements OnInit {
  blogPosts: Array<BlogPost> = []; // empty array 
  //private querySub: any;


  constructor(private route: Router, private data: PostService) { }

  ngOnInit(): void {
    
    // this.querySub = this.route.queryParams.subscribe(params => {
    //   console.log("params -> ", params);
    //   if(params['tag']){
    //     this.tag = params['tag'];
    //     this.category = null;
    //   }else{
    //     this.tag = null;
    //   }
    //   if(params['category']){
    //     this.category = params['category'];
    //     this.tag = null;
    //   }else{
    //     this.category = null; }
    //   this.getPage(+params['page'] || 1);
    //   });

    this.getAllMyPosts();
  }




getAllMyPosts(){console.log("GET ALL MY POSTS");
  this.data.getAllPosts().subscribe(data =>{
    if(data.length > 0){
      this.blogPosts = data;
    }
  });
}
rowClicked(e, id){
  console.log("clicked rowClicked()");
  this.route.navigate(['admin/post', id]);
}




  // ngOnDestroy(): void {
  //   if(this.querySub) this.querySub.unsubscribe();
  // }
}
