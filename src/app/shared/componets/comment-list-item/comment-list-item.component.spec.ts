import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentListItemComponent } from './comment-list-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommentService } from '../../services/comment/comment.service';
import { of } from 'rxjs';

describe('CommentListItemComponent', () => {
    let component: CommentListItemComponent;
    let fixture: ComponentFixture<CommentListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CommentListItemComponent],
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {provide: 'apiUrl', useValue: 'some-url'}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CommentListItemComponent);
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

    it('should delete comment and trigger Subject', (done) => {
        component.comment = {
            body: 'body',
            email: 'email@email.com',
            name: 'name',
            id: 12,
            postId: 3
        };

        const commentServiceMock = TestBed.inject(CommentService);

        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(commentServiceMock, 'delete').and.returnValue(of(12));
        spyOn(component.onDelete, 'next').and.returnValue();


        component.delete();

        expect(window.confirm).toHaveBeenCalledTimes(1);
        expect(commentServiceMock.delete).toHaveBeenCalledOnceWith(12);
        expect(component.onDelete.next).toHaveBeenCalledOnceWith(12);

        done();
    });

    it('should save a comment', (done) => {
        const comment = {
            body: 'body',
            email: 'email@email.com',
            name: 'name',
            id: 12,
            postId: 3
        };

        const commentServiceMock = TestBed.inject(CommentService);

        spyOn(commentServiceMock, 'patch').and.returnValue(of(comment));
        spyOn(component, 'toggleEdit').and.returnValue();

        component.save(comment);

        expect(component.comment).toEqual(comment);
        expect(commentServiceMock.patch).toHaveBeenCalledOnceWith(comment);
        expect(component.toggleEdit).toHaveBeenCalledTimes(1);

        done();
    });
});
