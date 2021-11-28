import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SortComponent } from './sort.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SortComponent', () => {
    let component: SortComponent;
    let fixture: ComponentFixture<SortComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SortComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SortComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should trigger event on sort change', fakeAsync(() => {
        spyOn(component.sortChanged, 'next').and.returnValue();

        component.formGroup.controls['sort'].patchValue('desc');
        component.formGroup.controls['sort'].updateValueAndValidity({ emitEvent: true });

        tick(400);
        fixture.detectChanges();

        expect(component.sortChanged.next).toHaveBeenCalledOnceWith('desc');
    }));
});
