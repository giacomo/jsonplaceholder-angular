import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../../../../shared/services/post/post.service';
import { Observable, of, switchMap } from 'rxjs';
import { Post } from '../../../../shared/models/post';

@Component({
    selector: 'jp-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

    postDetail$!: Observable<Post | null>;
    postId: number | null = null;

    constructor(
        private postService: PostService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.postDetail$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                const postId = params.get('id');

                if (postId !== null) {
                    this.postId = +postId;
                    return this.postService.get(this.postId);
                }

                return of(null);
            })
        );

    }

}
