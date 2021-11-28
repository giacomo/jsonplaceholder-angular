import { Injectable } from '@angular/core';
import { ApiClientService } from '../api-client/api-client.service';
import { Post } from '../../models/post';
import { catchError, map, Observable, of, OperatorFunction, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { PostDto } from '../../models/post-dto';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    constructor(
        private apiClient: ApiClientService
    ) {
    }

    findByFilter(key: string, term: string, sort: 'asc'|'desc'): Observable<Post[] | never[]> {
        let params = new HttpParams();

        if (term.trim() !== '') {
            params = new HttpParams().set(key, term);
        }

        const options = {params: params};

        return this.apiClient.get<Post[]>('posts', options).pipe(
            tap(_ => ''),
            map((results: Post[]) => {
                if (sort === 'desc') {
                    return results.sort((a: Post, b: Post) => b.id - a.id);
                }

                return results;
            }),
            catchError(() => {
                return of([]);
            })
        );
    }

    get(id: number): Observable<Post | null> {
        return this.apiClient.get<Post>(`posts/${id}`).pipe(
            tap(_ => ''),
            catchError(() => {
                return of(null);
            })
        );
    }

    delete(id: number): Observable<number | null> {
        return this.apiClient.delete(`posts/${id}`).pipe(
            tap(_ => ''),
            map(() => {
                return id;
            }),
            catchError(() => {
                return of(null);
            })
        );
    }

    patch(formPost: Post): Observable<Post | null> {
        return this.apiClient.patch<Post>(`posts/${formPost.id}`, formPost).pipe(
            tap(_ => ''),
            catchError(() => {
                return of(null);
            })
        );
    }

    create(formPost: PostDto): Observable<Post | null> {
        return this.apiClient.post<Post>('posts', formPost).pipe(
            tap(_ => ''),
            catchError(() => {
                return of(null);
            })
        );
    }
}
