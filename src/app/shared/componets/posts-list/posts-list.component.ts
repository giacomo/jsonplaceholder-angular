import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, switchMap, take, tap } from 'rxjs';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/post';
import { PostDto } from '../../models/post-dto';

@Component({
    selector: 'jp-posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
    postList: Post[] = [];
    postsSubscription$: Observable<Post[] | null>;
    trigger$ = new BehaviorSubject<boolean>(true);
    filter$ = new BehaviorSubject<{key: string, term: string}>({key: 'id', term: ''});
    sort$ = new BehaviorSubject<'asc'|'desc'>('asc');
    showAddForm = false;
    loading = true;
    error = false;

    constructor(
        private postService: PostService
    ) {
        this.postsSubscription$ = of([]);
    }

    ngOnInit(): void {
        this.postsSubscription$ = combineLatest([this.filter$, this.trigger$, this.sort$]).pipe(
            tap( (combined) => {
                this.loading = true;
                this.error = false;
            }),
            switchMap((combined: [{key: string, term: string}, boolean, 'asc'|'desc']) => {
                return this.postService.findByFilter(combined[0].key, combined[0].term, combined[2])
            }),
            tap((result: Post[]) => {
                this.postList = result;

                if (result.length === 0) {
                    this.error = true;
                }
                this.loading = false;
            })
        )
    }

    filterList($event: {key: string, term: string}): void {
        this.filter$.next($event);
    }

    sortList($event: 'asc'|'desc'): void {
        this.sort$.next($event);
    }

    delete(id: number) {
        this.postList = this.postList.filter((post: Post) => (post.id !== id));
    }

    add() {
        this.showAddForm = true;
    }

    cancel(): void {
        if (window.confirm('Are you sure to cancel this operation?')) {
            this.showAddForm = false;
        }
    }

    save(post: PostDto): void {
        this.postService.create(post).pipe(
            take(1),
            tap((savedPost: Post | null) => {
                if (savedPost) {
                    this.postList.unshift(savedPost);
                    this.showAddForm = false;
                }
            })
        ).subscribe();
    }
}
