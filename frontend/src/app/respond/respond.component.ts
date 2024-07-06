import { Component, Input } from '@angular/core';
import { RespondserviceService } from '../services/respondservice.service';
import { Respond } from '../model/respond';

@Component({
  selector: 'app-respond',
  templateUrl: './respond.component.html',
  styleUrls: ['./respond.component.css']
})
export class RespondComponent {

  @Input() commentId!: String;
  responds: Respond[] = [];
  newRespond: Respond = { idpost: '0', idcomment: '0', idrespond: '0', iduser: '0', respond: '', likes: 0, dislikes: 0 };

  constructor(private respondService: RespondserviceService) {}

  ngOnChanges(): void {
    this.loadResponds();
  }

  loadResponds(): void {
    this.respondService.getRespondsByCommentId(this.commentId.toString()).subscribe(responds => {
      this.responds = responds;
    });
  }

  addRespond(): void {
    this.newRespond.idcomment = this.commentId;
    this.respondService.addRespond(this.newRespond).subscribe(() => {
      this.loadResponds();
      this.newRespond = { idpost: '0', idcomment: '0', idrespond: '0', iduser: '0', respond: '', likes: 0, dislikes: 0 };
    });
  }

}
