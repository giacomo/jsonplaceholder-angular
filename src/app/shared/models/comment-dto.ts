export interface CommentDto {
    id?: number|null;
    postId?: number|null;
    name: string;
    email: string;
    body: string;
}
