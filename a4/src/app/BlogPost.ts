import { Comment } from "./Comment";

export class BlogPost{
    _id: string
    title: string;
    author: string;
    postDate: string;
    featuredImage: string;
    post: string;
    postedBy: string;
    comments: Array<Comment>;
    category: string;
    tags: Array<string>;
    isPrivate: Boolean;
    views: number;
}