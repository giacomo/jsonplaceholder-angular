import { Component, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../models/post';
import { catchError, of, Subject, take, tap } from 'rxjs';
import { PostService } from '../../services/post/post.service';
import { PostDto } from '../../models/post-dto';

@Component({
    selector: 'jp-post-list-item',
    templateUrl: './post-list-item.component.html',
    styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

    @Input() post!: Post | null;
    @Output() onDelete = new Subject<number>();
    isEditMode = false;

    constructor(private postService: PostService) {
    }

    ngOnInit(): void {
    }


    delete(): void {
        if (this.post !== null && window.confirm('Are you sure that you want delete this post?')) {
            this.postService.delete(this.post.id).pipe(
                tap((id: number|null) => {
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

    save(formPost: Post|PostDto): void {
        this.postService.patch(formPost as Post).pipe(
            take(1),
            tap((savedPost: Post | null) => {
                if (savedPost) {
                    this.post = savedPost;
                    this.toggleEdit();
                }
            })
        ).subscribe();
    }
}
