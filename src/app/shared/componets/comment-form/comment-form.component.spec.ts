import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFormComponent } from './comment-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CommentFormComponent', () => {
    let component: CommentFormComponent;
    let fixture: ComponentFixture<CommentFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CommentFormComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CommentFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain empty comment form data on initialisation', () => {
        const expected = {
            id: null,
            postId: null,
            email: null,
            name: null,
            body: null,
        };

        expect(component.formGroup.value).toEqual(expected);
    });

    it('should contain empty comment with post id form data on initialisation', () => {
        component.relatedPostId = 3;

        component.ngOnInit();


        const expected = {
            id: null,
            postId: 3,
            email: null,
            name: null,
            body: null,
        };

        expect(component.formGroup.value).toEqual(expected);
    });

    it('should prefill comment form data if post emitted', () => {
        const comment = {
            id: 1,
            postId: 12,
            email: 'some@mail.com',
            name: 'some name',
            body: 'some body',
        };

        component.comment = comment;
        component.ngOnInit();
        expect(component.formGroup.value).toEqual(comment);
    });

    it('should save form and trigger next event', () => {
        spyOn(component.onSave, 'next').and.returnValue();

        const comment = {
            id: 1,
            postId: 12,
            email: 'some@mail.com',
            name: 'some name',
            body: 'some body',
        };

        component.comment = comment;
        component.ngOnInit();

        component.formGroup.controls['name'].setValue('name 2');

        component.save();

        expect(component.onSave.next).toHaveBeenCalledOnceWith({...comment,  ...{name: 'name 2'}});
    });

    it('should not save form and not trigger next event while email not valid', () => {
        spyOn(component.onSave, 'next').and.returnValue();

        const comment = {
            id: 1,
            postId: 12,
            email: 'some@mail.com',
            name: 'some name',
            body: 'some body',
        };

        component.comment = comment;
        component.ngOnInit();

        component.formGroup.controls['email'].setValue('thisisnotavalidmail');

        component.save();

        expect(component.onSave.next).not.toHaveBeenCalledTimes(1);
    });

    it('should trigger cancel form and trigger next event', () => {
        spyOn(component.onCancel, 'next').and.returnValue();

        component.cancel();

        expect(component.onCancel.next).toHaveBeenCalledTimes(1);
    });
});
