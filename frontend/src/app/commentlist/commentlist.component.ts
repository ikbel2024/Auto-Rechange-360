import { Component, Input, OnInit } from '@angular/core';
import { CommentserviceService } from '../services/commentservice.service';
import { RespondserviceService } from '../services/respondservice.service';
import { Comment } from '../model/comment';
import { Respond } from '../model/respond';

@Component({
  selector: 'app-commentlist',
  templateUrl: './commentlist.component.html',
  styleUrls: ['./commentlist.component.css']
})
export class CommentlistComponent implements OnInit {
  @Input() postId!: string;
  comments: Comment[] = [];
  newComment: Comment = { idpost: '', iduser: '', comment: '', likes: 0, dislikes: 0 };
  newRespond: Respond = { idpost: '', idcomment: '', idrespond: '', iduser: '', respond: '', likes: 0, dislikes: 0 };

  constructor(private commentService: CommentserviceService, private respondService: RespondserviceService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getCommentsByPostId(this.postId).subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => {
        console.error('Error loading comments:', error);
      }
    );
  }

  addComment() {
    this.newComment.idpost = this.postId;
    this.commentService.addComment(this.newComment).subscribe(
      () => {
        this.loadComments();
        this.newComment = { idpost: '', iduser: '', comment: '', likes: 0, dislikes: 0 };
      },
      (error) => {
        console.error('Error adding comment:', error);
      }
    );
  }

  addRespond(commentId: string ) {
    this.newRespond.idpost = this.postId;
    this.newRespond.idcomment = commentId;
    this.respondService.addRespond(this.newRespond).subscribe(
      () => {
        this.loadComments();
        this.newRespond = { idpost: '', idcomment: '', idrespond: '', iduser: '', respond: '', likes: 0, dislikes: 0 };
      },
      (error) => {
        console.error('Error adding respond:', error);
      }
    );
  }
}
