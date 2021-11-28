import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostsComponent', () => {
    let component: PostsComponent;
    let fixture: ComponentFixture<PostsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PostsComponent],
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
        fixture = TestBed.createComponent(PostsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain jp-posts-list', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const navigationElement = compiled.querySelector('jp-posts-list');

        expect(navigationElement).toBeTruthy();
    });
});
