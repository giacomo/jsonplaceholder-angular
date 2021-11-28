import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormComponent } from './post-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('PostFormComponent', () => {
    let component: PostFormComponent;
    let fixture: ComponentFixture<PostFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PostFormComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PostFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain empty post form data on initialisation', () => {
        const expected = {
            id: null,
            userId: null,
            title: null,
            body: null,
        };

        expect(component.formGroup.value).toEqual(expected);
    });

    it('should prefill post form data if post emitted', () => {
        const post = {
            id: 1,
            userId: 2,
            title: 'some title',
            body: 'some body',
        };

        component.post = post;
        component.ngOnInit();
        expect(component.formGroup.value).toEqual(post);
    });

    it('should save form and trigger next event', () => {
        spyOn(component.onSave, 'next').and.returnValue();

        const post = {
            id: 1,
            userId: 2,
            title: 'some title',
            body: 'some body',
        };

        component.post = post;
        component.ngOnInit();

        component.formGroup.controls['title'].setValue('title 2');

        component.save();

        expect(component.onSave.next).toHaveBeenCalledOnceWith({...post,  ...{title: 'title 2'}});
    });

    it('should trigger cancel form and trigger next event', () => {
        spyOn(component.onCancel, 'next').and.returnValue();

        component.cancel();

        expect(component.onCancel.next).toHaveBeenCalledTimes(1);
    });
});
