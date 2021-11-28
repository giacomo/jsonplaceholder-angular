import { Component, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../models/comment';
import { catchError, of, Subject, take, tap } from 'rxjs';
import { CommentService } from '../../services/comment/comment.service';
import { CommentDto } from '../../models/comment-dto';

@Component({
    selector: 'jp-comment-list-item',
    templateUrl: './comment-list-item.component.html',
    styleUrls: ['./comment-list-item.component.scss']
})
export class CommentListItemComponent {

    @Input() comment!: Comment;
    @Output() onDelete = new Subject<number>()
    isEditMode = false;

    constructor(
        private commentService: CommentService
    ) {
    }

    delete() {
        if (this.comment !== null && window.confirm('Are you sure that you want delete this comment?')) {
            this.commentService.delete(this.comment.id).pipe(
                tap((id: number | null) => {
                    if (id === null) {
                        throw new Error('id not found')
                    }
                    this.onDelete.next(id);
                }),
                catchError((err: Error) => {
                    // trigger an event to show a message use err.message
                    return of(null);
                })
            ).subscribe();
        }
    }

    toggleEdit() {
        this.isEditMode = !this.isEditMode;
    }

    cancel(): void {
        this.toggleEdit();
    }

    save(formComment: Comment|CommentDto): void {
        this.commentService.patch(formComment as Comment).pipe(
            take(1),
            tap((savedComment: Comment | null) => {
                if (savedComment) {
                    this.comment = savedComment;
                    this.toggleEdit();
                }
            })
        ).subscribe();
    }
}
