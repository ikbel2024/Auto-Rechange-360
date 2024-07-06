import { Component, Input, OnInit } from '@angular/core';
import { CommentserviceService } from '../services/commentservice.service';
import { Comment } from '../model/comment';
import { PostserviceService } from '../services/postservice.service';
import { Post } from '../model/post';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  poste: Post | undefined; 
  post: Post = {
    id: '',
    iduser: '',
    name: '',
    post: '',
    likes: 0,
    views: 0
  };
  comments: Comment[] = [];
  newComment: Comment = { idpost: '', iduser: '', comment: '', likes: 0, dislikes: 0 };

  constructor(
    private route: ActivatedRoute,
    private postService: PostserviceService,
    private commentService: CommentserviceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      
      if (postId) {
        this.loadPostDetails(postId);
        this.loadComments(postId);

      }
    });
  }

  loadPostDetails(postId: string) {
    this.postService.getPostById(postId).subscribe(
      (post) => {
        this.post = post;
   
      },
      (error) => {
        console.error('Error loading post details:', error);
      }
    );
  }

  loadComments(postId: string) {
    this.commentService.getCommentsByPostId(postId).subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => {
        console.error('Error loading comments for post:', error);
      }
    );
  }

  addComment() {
    if (this.post) {
      this.newComment.idpost = this.post.id || '';
      this.commentService.addComment(this.newComment).subscribe(
        () => {
          this.commentService.getCommentsByPostId(this.post.id).subscribe(
            (comments) => {
              this.comments = comments;
            })
          //this.loadComments(this.newComment.idpost);
          this.newComment = { idpost: '', iduser: '', comment: '', likes: 0, dislikes: 0 };
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }
  likePost() {
    if (this.post.id) {
      this.post.likes++;
      this.postService.updatePost(this.post.id, this.post).subscribe(
        () => {},
        (error) => {
          console.error('Error liking post:', error);
        }
      );
    }
  }
  likeComment(comment: Comment) {
    comment.likes++;
   this.commentService.updateComment(this.post.id, comment).subscribe(
      () => {},
      (error) => {
        console.error('Error liking comment:', error);
      }
    );
  }
  dislikeComment(comment: Comment) {
    comment.dislikes++;
    this.commentService.updateComment(this.post.id, comment).subscribe(
      () => {},
      (error) => {
        console.error('Error disliking comment:', error);
      }
    );
  }

}
