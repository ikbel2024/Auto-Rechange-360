import { Component, OnInit } from '@angular/core';
import { PostserviceService } from 'src/app/services/postservice.service';
import { Post } from '../model/post';
import { Router } from '@angular/router';  // Import Router


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post[] = [];
  newPost: Post = {
    id:'',
    iduser: 'defaultUser',  // Replace this with the actual user ID
    name: '',
    post: '',
    likes: 0,
    views: 0
  };

  constructor(private postService: PostserviceService, private router: Router) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe((data :Post[]) => {
      this.posts = data;
      console.log(data);
    });
  }

  addPost(): void {
    if (this.newPost.name && this.newPost.post) {
      this.postService.addPost(this.newPost).subscribe(() => {
        this.getPosts();  // Refresh the list of posts
        this.resetForm();  // Reset the form
        this.router.navigate(['/forum']);
      });
    }
  }

  resetForm(): void {
    this.newPost = {
      id:'',
      iduser: 'defaultUser',  // Replace this with the actual user ID
      name: '',
      post: '',
      likes: 0,
      views: 0
    };
    
  }
  goToPostDetail(postId: string | undefined) {
    if (postId) {
      this.router.navigate(['/posts', postId]);
    } else {
      console.error('Post ID is undefined');
    }
    //this.router.navigate(['/posts', postId]);
  }
/*
  posts: Post[] = [];
  newPost: Post = { iduser: '0', name: '', post: '', likes: 0, views: 0 };

  constructor(private postService: PostserviceService) {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
    });
  }

  addPost(): void {
    this.postService.addPost(this.newPost).subscribe(() => {
      this.loadPosts();
      this.newPost = { iduser: '0', name: '', post: '', likes: 0, views: 0 };
    });
  }
*/
}
