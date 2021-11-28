import { TestBed } from '@angular/core/testing';

import { ApiClientService } from './api-client.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

describe('ApiClientService', () => {
    let service: ApiClientService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {provide: 'apiUrl', useValue: 'some-url'}
            ]
        });
        service = TestBed.inject(ApiClientService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should bypass a GET request', () => {
        const httpClientMock = TestBed.inject(HttpClient);
        spyOn(httpClientMock, 'get').and.returnValue(of(null));

        service.get('get-request');

        expect(httpClientMock.get).toHaveBeenCalledOnceWith('some-url/get-request', undefined);
    });

    it('should bypass a POST request', () => {
        const httpClientMock = TestBed.inject(HttpClient);
        const spy = spyOn(httpClientMock, 'post').and.returnValue(of(null));

        service.post('post-request', {key: 'foobar'});

        expect(httpClientMock.post).toHaveBeenCalledOnceWith(
            'some-url/post-request',
            JSON.stringify({key: 'foobar'}),
            jasmine.anything()
        );


        expect((spy.calls.mostRecent()?.args[2]?.headers as any).get('content-type')).toBe('application/json');
    });

    it('should bypass a PUT request', () => {
        const httpClientMock = TestBed.inject(HttpClient);
        const spy = spyOn(httpClientMock, 'put').and.returnValue(of(null));

        service.put('put-request', {key: 'foobar'});

        expect(httpClientMock.put).toHaveBeenCalledOnceWith(
            'some-url/put-request',
            JSON.stringify({key: 'foobar'}),
            jasmine.anything()
        );


        expect((spy.calls.mostRecent()?.args[2]?.headers as any).get('content-type')).toBe('application/json');
    });

    it('should bypass a PATCH request', () => {
        const httpClientMock = TestBed.inject(HttpClient);
        const spy = spyOn(httpClientMock, 'patch').and.returnValue(of(null));

        service.patch('patch-request', {key: 'foobar'});

        expect(httpClientMock.patch).toHaveBeenCalledOnceWith(
            'some-url/patch-request',
            JSON.stringify({key: 'foobar'}),
            jasmine.anything()
        );


        expect((spy.calls.mostRecent()?.args[2]?.headers as any).get('content-type')).toBe('application/json');
    });

    it('should bypass a DELETE request', () => {
        const httpClientMock = TestBed.inject(HttpClient);
        const spy = spyOn(httpClientMock, 'delete').and.returnValue(of(null));

        service.delete('delete-request');

        expect(httpClientMock.delete).toHaveBeenCalledOnceWith(
            'some-url/delete-request',
            jasmine.anything()
        );


        expect((spy.calls.mostRecent()?.args[1]?.headers as any).get('content-type')).toBe('application/json');
    });
});
