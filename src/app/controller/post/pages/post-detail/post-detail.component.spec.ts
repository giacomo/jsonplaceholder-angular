import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailComponent } from './post-detail.component';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostService } from '../../../../shared/services/post/post.service';

describe('PostDetailComponent', () => {
    let component: PostDetailComponent;
    let fixture: ComponentFixture<PostDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PostDetailComponent],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                SharedModule
            ],
            providers: [
                {provide: 'apiUrl', useValue: 'some-url'},
                {
                    provide: ActivatedRoute,
                    useValue: {paramMap: of(convertToParamMap({id: '12'}))}
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PostDetailComponent);
        component = fixture.componentInstance;

        const postServiceMock = TestBed.inject(PostService);
        spyOn(postServiceMock, 'get').and.returnValue(of({
            id: 101,
            body: 'body',
            title: 'title',
            userId: 1
        }))

        fixture.detectChanges();
    });

    it('should create', () => {
        const compiled = fixture.nativeElement as HTMLElement;

        expect(component).toBeTruthy();
        expect(compiled.querySelector('h1')?.textContent).toContain('title');
    });

    it('should contain comments-list', () => {
        const compiled = fixture.nativeElement as HTMLElement;

        expect(compiled.querySelector('jp-comments-list')).toBeTruthy();
    });
});
