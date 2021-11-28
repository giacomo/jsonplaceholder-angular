import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiClientService } from '../api-client/api-client.service';
import { firstValueFrom, of } from 'rxjs';
import { Post } from '../../models/post';

describe('PostService', () => {
    let service: PostService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {provide: 'apiUrl', useValue: 'some-url'}
            ]
        });
        service = TestBed.inject(PostService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should findByFilter ascending', (done) => {
        const apiMock = TestBed.inject(ApiClientService);
        spyOn(apiMock, 'get').and.returnValue(of([
            {
                id: 1,
                body: 'body',
                title: 'title',
                userId: 1
            },
            {
                id: 2,
                body: 'body',
                title: 'title',
                userId: 1
            }
        ]));

        const expected: Post[] = [
            {
                id: 1,
                body: 'body',
                title: 'title',
                userId: 1
            },
            {
                id: 2,
                body: 'body',
                title: 'title',
                userId: 1
            }
        ];

        expectAsync(firstValueFrom(service.findByFilter('', '', 'asc'))).toBeResolvedTo(expected);

        done();
    });

    it('should findByFilter descending', (done) => {
        const apiMock = TestBed.inject(ApiClientService);
        spyOn(apiMock, 'get').and.returnValue(of([
            {
                id: 1,
                body: 'body',
                title: 'title',
                userId: 1
            },
            {
                id: 2,
                body: 'body',
                title: 'title',
                userId: 1
            }
        ]));

        const expected: Post[] = [
            {
                id: 2,
                body: 'body',
                title: 'title',
                userId: 1
            },
            {
                id: 1,
                body: 'body',
                title: 'title',
                userId: 1
            }
        ];

        expectAsync(firstValueFrom(service.findByFilter('', '', 'desc'))).toBeResolvedTo(expected);

        done();
    });

    it('should get a specific post', (done) => {
        const expected = {
            id: 1,
            body: 'body',
            title: 'title',
            userId: 1
        };

        const apiMock = TestBed.inject(ApiClientService);
        spyOn(apiMock, 'get').and.returnValue(of(expected));

        expectAsync(firstValueFrom(service.get(12))).toBeResolvedTo(expected);
        expect(apiMock.get).toHaveBeenCalledOnceWith('posts/12');
        done();
    });

    it('should delete a specific post', (done) => {
        const apiMock = TestBed.inject(ApiClientService);
        spyOn(apiMock, 'delete').and.returnValue(of(true));

        expectAsync(firstValueFrom(service.delete(13))).toBeResolvedTo(13);
        expect(apiMock.delete).toHaveBeenCalledOnceWith('posts/13');
        done();
    });

    it('should patch a specific post', (done) => {
        const apiMock = TestBed.inject(ApiClientService);
        spyOn(apiMock, 'patch').and.returnValue(of(null));

        const post = {
            id: 1,
            body: 'body',
            title: 'title',
            userId: 1
        };

        expectAsync(firstValueFrom(service.patch(post))).toBeResolvedTo(null);
        expect(apiMock.patch).toHaveBeenCalledOnceWith('posts/1', post);
        done();
    });

    it('should create a new post', (done) => {
        const post = {
            body: 'body',
            title: 'title',
            userId: 1
        };

        const apiMock = TestBed.inject(ApiClientService);
        spyOn(apiMock, 'post').and.returnValue(of({...post, ...{id: 101}}));

        expectAsync(firstValueFrom(service.create(post))).toBeResolvedTo({
            id: 101,
            body: 'body',
            title: 'title',
            userId: 1
        });
        expect(apiMock.post).toHaveBeenCalledOnceWith('posts', post);
        done();
    });
});
