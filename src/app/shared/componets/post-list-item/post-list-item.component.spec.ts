import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListItemComponent } from './post-list-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { PostService } from '../../services/post/post.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostListItemComponent', () => {
    let component: PostListItemComponent;
    let fixture: ComponentFixture<PostListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PostListItemComponent],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [
                {provide: 'apiUrl', useValue: 'some-url'}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PostListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle editMode', () => {
        expect(component.isEditMode).toBeFalsy();

        component.toggleEdit();
        expect(component.isEditMode).toBeTruthy();

        component.toggleEdit();
        expect(component.isEditMode).toBeFalsy();
    });

    it('should call toggleEdit through cancel', () => {
        spyOn(component, 'toggleEdit').and.returnValue();

        component.cancel();

        expect(component.toggleEdit).toHaveBeenCalledTimes(1);
    });

    it('should delete post and trigger Subject', (done) => {
        component.post = {
            id: 1,
            body: 'body',
            title: 'title',
            userId: 1
        };

        const postService = TestBed.inject(PostService);

        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(postService, 'delete').and.returnValue(of(1));
        spyOn(component.onDelete, 'next').and.returnValue();


        component.delete();

        expect(window.confirm).toHaveBeenCalledTimes(1);
        expect(postService.delete).toHaveBeenCalledOnceWith(1);
        expect(component.onDelete.next).toHaveBeenCalledOnceWith(1);

        done();
    });

    it('should save a comment', (done) => {
        const post = {
            id: 1,
            body: 'body',
            title: 'title',
            userId: 1
        };

        const postService = TestBed.inject(PostService);

        spyOn(postService, 'patch').and.returnValue(of(post));
        spyOn(component, 'toggleEdit').and.returnValue();

        component.save(post);

        expect(component.post).toEqual(post);
        expect(postService.patch).toHaveBeenCalledOnceWith(post);
        expect(component.toggleEdit).toHaveBeenCalledTimes(1);

        done();
    });
});
