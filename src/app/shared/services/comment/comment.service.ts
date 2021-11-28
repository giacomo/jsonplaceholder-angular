import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ApiClientService } from '../api-client/api-client.service';
import { Comment } from '../../models/comment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(
        private apiClient: ApiClientService
    ) {
    }

    getByPostId(id: number): Observable<Comment[] | null> {
        return this.apiClient.get<Comment[]>(`posts/${id}/comments`).pipe(
            tap(_ => ''),
            catchError(() => {
                return of(null);
            })
        );
    }

    delete(id: number): Observable<number | null> {
        return this.apiClient.delete(`comments/${id}`).pipe(
            tap(_ => ''),
            map(() => {
                return id;
            }),
            catchError(() => {
                return of(null);
            })
        );
    }

    patch(formComment: Comment): Observable<Comment | null> {
        return this.apiClient.patch<Comment>(`comments/${formComment.id}`, formComment).pipe(
            tap(_ => ''),
            catchError(() => {
                return of(null);
            })
        );
    }

    create(formComment: { id?: number | null, postId?: number | null, name?: string | null, email?: string, body?: string | null } ): Observable<Comment | null> {
        return this.apiClient.post<Comment>('comments', formComment).pipe(
            tap(_ => ''),
            catchError(() => {
                return of(null);
            })
        );
    }
}
