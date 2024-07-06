import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../model/post';
import { PostserviceService } from '../services/postservice.service';

@Component({
  selector: 'app-forumadmin',
  templateUrl: './forumadmin.component.html',
  styleUrls: ['./forumadmin.component.css']
})
export class ForumadminComponent implements OnInit {

  posts: Post[] = [];
  displayedColumns: string[] = ['name', 'id', 'post', 'userId', 'likes', 'actions'];
  selectedPost: Post | undefined;
  searchInput: string = '';

  constructor(
    private postService: PostserviceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  searchPost(): void {
    if (this.searchInput.trim() !== '') {
      this.postService.getPostByName(this.searchInput).subscribe(
        (post) => {
          this.posts = [post];
        },
        (error) => {
          console.error('Error searching posts:', error);
        }
      );
    } else {
      // If search input is empty, fetch all posts
      this.getPosts();
    }
  }

  selectPost(post: Post): void {
    this.selectedPost = { ...post }; // Create a copy to avoid modifying the original in the list
  }

  updatePost(): void {
    if (this.selectedPost && this.selectedPost.id) {
      this.postService.updatePost(this.selectedPost.id, this.selectedPost).subscribe(
        () => {
          console.log('Post updated successfully.');
          this.getPosts(); // Refresh the list after update
          this.selectedPost = undefined; // Clear selected post
        },
        (error) => {
          console.error('Error updating post:', error);
        }
      );
    }
  }

  deletePost(post: Post): void {
    if (post.id) {
      this.postService.deletePost(post.id).subscribe(
        () => {
          console.log('Post deleted successfully.');
          this.getPosts(); // Refresh the list after deletion
          this.selectedPost = undefined; // Clear selected post
        },
        (error) => {
          console.error('Error deleting post:', error);
        }
      );
    }
  }

}
