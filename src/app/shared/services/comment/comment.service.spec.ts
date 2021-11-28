import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiClientService } from '../api-client/api-client.service';
import { firstValueFrom, of } from 'rxjs';

describe('CommentService', () => {
    let service: CommentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {provide: 'apiUrl', useValue: 'some-url'}
            ]
        });
        service = TestBed.inject(CommentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should getByPostId', (done) => {
        const expected = [
            {
                body: 'body',
                email: 'email@email.com',
                name: 'name',
                id: 12,
                postId: 3
            }
        ];

        const apiMock = TestBed.inject(ApiClientService);
        spyOn(apiMock, 'get').and.returnValue(of(expected));

        expectAsync(firstValueFrom(service.getByPostId(3))).toBeResolvedTo(expected);
        expect(apiMock.get).toHaveBeenCalledOnceWith('posts/3/comments');
        done();
    });

    it('should delete a specific comment', (done) => {
        const apiMock = TestBed.inject(ApiClientService);
        spyOn(apiMock, 'delete').and.returnValue(of(true));

        expectAsync(firstValueFrom(service.delete(13))).toBeResolvedTo(13);
        expect(apiMock.delete).toHaveBeenCalledOnceWith('comments/13');
        done();
    });

    it('should patch a specific comment', (done) => {
        const apiMock = TestBed.inject(ApiClientService);
        spyOn(apiMock, 'patch').and.returnValue(of(null));

        const comment = {
            body: 'body',
            email: 'email@email.com',
            name: 'name',
            id: 12,
            postId: 3
        };

        expectAsync(firstValueFrom(service.patch(comment))).toBeResolvedTo(null);
        expect(apiMock.patch).toHaveBeenCalledOnceWith('comments/12', comment);
        done();
    });

    it('should create a new post', (done) => {
        const comment = {
            name: 'name',
            email: 'some@email.com',
            body: 'body',
        };

        const apiMock = TestBed.inject(ApiClientService);
        spyOn(apiMock, 'post').and.returnValue(of({...comment, ...{id: 15, postId: 3}}));

        expectAsync(firstValueFrom(service.create(comment))).toBeResolvedTo({
            id: 15,
            name: 'name',
            email: 'some@email.com',
            body: 'body',
            postId: 3
        });
        expect(apiMock.post).toHaveBeenCalledOnceWith('comments', comment);
        done();
    });
});
