import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsListComponent } from './posts-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../shared.module';
import { PostService } from '../../services/post/post.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostsListComponent', () => {
    let component: PostsListComponent;
    let fixture: ComponentFixture<PostsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PostsListComponent],
            imports: [
                RouterTestingModule,
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
        fixture = TestBed.createComponent(PostsListComponent);
        component = fixture.componentInstance;

        const postServiceMock = TestBed.inject(PostService);
        spyOn(postServiceMock, 'findByFilter').and.returnValue(of([
            {
                id: 1,
                body: 'body',
                title: 'title',
                userId: 1
            },
            {
                id: 2,
                body: 'body2',
                title: 'title2',
                userId: 1
            }
        ]));

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.postList.length).toBe(2);
    });

    it('should trigger an event on filter', () => {
        spyOn(component.filter$, 'next').and.returnValue();

        component.filterList({key: 'id', term: '1'});

        expect(component.filter$.next).toHaveBeenCalledOnceWith({key: 'id', term: '1'});
    });

    it('should trigger an event on sort', () => {
        spyOn(component.sort$, 'next').and.returnValue();

        component.sortList('desc');

        expect(component.sort$.next).toHaveBeenCalledOnceWith('desc');
    });

    it('should delete comment', () => {
        component.delete(2);

        expect(component.postList.length).toBe(1);
        expect(component.postList).toEqual([
            {
                id: 1,
                body: 'body',
                title: 'title',
                userId: 1
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

    it('should create a new post', (done) => {
        const expected = {
            id: 3,
            body: 'body',
            title: 'title',
            userId: 1
        };

        const postServiceMock = TestBed.inject(PostService);
        spyOn(postServiceMock, 'create').and.returnValue(of(expected));

        const post = {
            id: null,
            body: 'body',
            title: 'title',
            userId: 1
        };

        component.save(post);
        expect(component.postList.length).toBe(3);
        expect(component.postList.includes(expected)).toBeTruthy();

        done();
    });
});
