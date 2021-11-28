import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './componets/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SortComponent } from './componets/sort/sort.component';
import { PostListItemComponent } from './componets/post-list-item/post-list-item.component';
import { RouterModule } from '@angular/router';
import { CommentsListComponent } from './componets/comments-list/comments-list.component';
import { CommentListItemComponent } from './componets/comment-list-item/comment-list-item.component';
import { PostFormComponent } from './componets/post-form/post-form.component';
import { CommentFormComponent } from './componets/comment-form/comment-form.component';
import { PostsListComponent } from './componets/posts-list/posts-list.component';
import { NavigationComponent } from './componets/navigation/navigation.component';


@NgModule({
    declarations: [
        SearchComponent,
        SortComponent,
        PostsListComponent,
        PostListItemComponent,
        CommentsListComponent,
        CommentListItemComponent,
        PostFormComponent,
        CommentFormComponent,
        NavigationComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
    ],
    exports: [
        PostsListComponent,
        CommentsListComponent,
        NavigationComponent
    ]
})
export class SharedModule {
}
