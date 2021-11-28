import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment/comment.service';

import { finalize, Observable, of, take, tap } from 'rxjs';
import { Comment } from '../../models/comment';
import { CommentDto } from '../../models/comment-dto';

@Component({
    selector: 'jp-comments-list',
    templateUrl: './comments-list.component.html',
    styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

    @Input() relatedPostId!: number;
    commentList: Comment[] = [];
    commentsSubscription$: Observable<Comment[] | null>;
    showAddForm = false;
    loading = true;
    error = false;

    constructor(
        private commentService: CommentService
    ) {
        this.commentsSubscription$ = of([]);
    }

    ngOnInit(): void {
        this.commentsSubscription$ = this.commentService.getByPostId(this.relatedPostId).pipe(
            tap((result: Comment[] | null) => {
                this.loading = true;

                if (result !== null) {
                    this.commentList = result;
                }

                if (result === null) {
                    this.error = true;
                }
            }),
            finalize(() => {
                this.loading = false;
            })
        )

    }

    delete(id: number) {
        this.commentList = this.commentList.filter((comment: Comment) => (comment.id !== id));
    }

    add() {
        this.showAddForm = true;
    }

    cancel(): void {
        if (window.confirm('Are you sure to cancel this operation?')) {
            this.showAddForm = false;
        }
    }

    save(comment: CommentDto): void {
        this.commentService.create(comment).pipe(
            take(1),
            tap((savedComment: Comment | null) => {
                if (savedComment) {
                    this.commentList.unshift(savedComment);
                    this.showAddForm = false;
                }
            })
        ).subscribe();
    }
}
