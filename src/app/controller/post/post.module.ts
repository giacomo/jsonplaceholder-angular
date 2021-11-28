import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';

import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { PostsComponent } from './pages/posts/posts.component';


@NgModule({
    declarations: [
        PostDetailComponent,
        PostsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        PostRoutingModule
    ]
})
export class PostModule {
}
