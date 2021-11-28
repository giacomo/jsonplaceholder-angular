import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Post } from '../../models/post';
import { Subject } from 'rxjs';
import { PostDto } from '../../models/post-dto';

@Component({
    selector: 'jp-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
    formGroup!: FormGroup;
    @Input() post: Post | null;
    @Output() onSave = new Subject<Post | PostDto>();
    @Output() onCancel = new Subject<void>();

    constructor() {
        this.post = null;
    }

    ngOnInit(): void {
        this.setFormState();
    }

    private setFormState() {
        this.formGroup = new FormGroup({
            id: new FormControl(this.post?.id || null),
            userId: new FormControl(this.post?.userId || null),
            title: new FormControl(this.post?.title),
            body: new FormControl(this.post?.body)
        });
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
