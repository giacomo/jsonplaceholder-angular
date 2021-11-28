import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsListComponent } from './comments-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommentService } from '../../services/comment/comment.service';
import { of } from 'rxjs';
import { SharedModule } from '../../shared.module';

describe('CommentsListComponent', () => {
    let component: CommentsListComponent;
    let fixture: ComponentFixture<CommentsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CommentsListComponent],
            imports: [
                HttpClientTestingModule,
                SharedModule
            ],
            providers: [
                {provide: 'apiUrl', useValue: 'some-url'}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CommentsListComponent);
        component = fixture.componentInstance;

        const commentServiceMock = TestBed.inject(CommentService);
        spyOn(commentServiceMock, 'getByPostId').and.returnValue(of([
            {
                body: 'body',
                email: 'email@email.com',
                name: 'name',
                id: 12,
                postId: 3
            },
            {
                body: 'body2',
                email: 'email@email.com',
                name: 'name2',
                id: 13,
                postId: 3
            }
        ]));

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.commentList.length).toBe(2);
    });

    it('should delete comment', () => {
        component.delete(12);

        expect(component.commentList.length).toBe(1);
        expect(component.commentList).toEqual([
            {
                body: 'body2',
                email: 'email@email.com',
                name: 'name2',
                id: 13,
                postId: 3
            }
        ]);
    });

    it('should display add form', () => {
        expect(component.showAddForm).toBeFalsy();

        component.add();

        expect(component.showAddForm).toBeTruthy();
    });

    it('should hide add form on cancel', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        component.showAddForm = true;

        expect(component.showAddForm).toBeTruthy();

        component.cancel();

        expect(component.showAddForm).toBeFalsy();
    });

    it('should display add form on cancel if canceled dialog', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        component.showAddForm = true;

        expect(component.showAddForm).toBeTruthy();

        component.cancel();

        expect(component.showAddForm).toBeTruthy();
    });

    it('should create a new comment', (done) => {
        const expected = {
            id: 14,
            name: 'name',
            email: 'some@email.com',
            body: 'body',
            postId: 2,
        };

        const commentServiceMock = TestBed.inject(CommentService);
        spyOn(commentServiceMock, 'create').and.returnValue(of(expected));

        const comment = {
            id: null,
            name: 'name',
            email: 'some@email.com',
            body: 'body',
            postId: 2,
        };

        component.save(comment);
        expect(component.commentList.length).toBe(3);
        expect(component.commentList.includes(expected)).toBeTruthy();

        done();
    });
});
