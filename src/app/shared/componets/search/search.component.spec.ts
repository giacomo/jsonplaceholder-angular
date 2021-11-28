import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SearchComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should trigger event on keyword change', fakeAsync(() => {
        spyOn(component.keywordChanged, 'next').and.returnValue();

        component.formGroup.controls['keyword'].patchValue('some');
        component.formGroup.controls['keyword'].updateValueAndValidity({ emitEvent: true });

        tick(400);
        fixture.detectChanges();

        expect(component.keywordChanged.next).toHaveBeenCalledOnceWith({
            key: 'id',
            term: 'some'
        });
    }));

    it('should trigger event on filterKey change', fakeAsync(() => {
        spyOn(component.keywordChanged, 'next').and.returnValue();

        component.formGroup.controls['filterKey'].patchValue('userId');
        component.formGroup.controls['filterKey'].updateValueAndValidity({ emitEvent: true });

        tick(400);
        fixture.detectChanges();

        expect(component.keywordChanged.next).toHaveBeenCalledOnceWith({
            key: 'userId',
            term: ''
        });
    }));
});
