import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';

//import blogData from '../blogData.json';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  
  public blogPosts: any; //BlogPost[];//Array<BlogPost>; // = any; //= blogData;
  page: number = 1;
  tag: string = null;
  category: string = null;
  private querySub: any;

  newPage(event) { // **** new
    this.page = event;
    this.getPage(this.page);
  } // **** new


  constructor(private route: ActivatedRoute, private data: PostService) { } // *



  ngOnInit(): void {
    
    this.querySub = this.route.queryParams.subscribe(params => {
      if(params['tag']){
        this.tag = params['tag'];
        this.category = null;
      }else{
        this.tag = null;
      }
      if(params['category']){
        this.category = params['category'];
        this.tag = null;
      }else{
        this.category = null; }
      this.getPage(+params['page'] || 1);
      });

  }




getPage(num){
  this.data.getPosts(num, this.tag, this.category).subscribe(data =>{
    if(data.length > 0){
      this.blogPosts = data;
      this.page=num;
    }
  });
}




  ngOnDestroy(): void {
    if(this.querySub) this.querySub.unsubscribe();
  }

}

