import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Comment } from '../../models/comment';
import { CommentDto } from '../../models/comment-dto';

@Component({
  selector: 'jp-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
    formGroup!: FormGroup;
    @Input() comment: Comment | null;
    @Input() relatedPostId!: number;
    @Output() onSave = new Subject<Comment| CommentDto>();
    @Output() onCancel = new Subject<void>();

    constructor() {
        this.comment = null;
    }

    ngOnInit(): void {
        this.setFormState();
    }

    private setFormState() {
        this.formGroup = new FormGroup({
            id: new FormControl(this.comment?.id || null),
            postId: new FormControl(this.comment?.postId || this.relatedPostId || null),
            name: new FormControl(this.comment?.name),
            body: new FormControl(this.comment?.body),
            email: new FormControl(this.comment?.email, [Validators.email])
        });
    }

    get email() {
        return this.formGroup.get('email');
    }

    save(): void {
        if (this.formGroup.valid) {
            this.onSave.next(this.formGroup.value);
        }
    }

    cancel(): void {
        this.onCancel.next();
    }
}
