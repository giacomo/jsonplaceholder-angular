import { Component, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'jp-sort',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
    formGroup: FormGroup;
    @Output() sortChanged = new Subject<'asc'|'desc'>();
    private valueChangeSubscription$: Subscription|undefined = undefined;

    constructor() {
        this.formGroup = new FormGroup({
            sort: new FormControl('asc')
        });
    }

    ngOnInit(): void {
        this.valueChangeSubscription$ = this.formGroup.valueChanges.pipe(
            debounceTime(300),
            tap(() => {
                this.sortChanged.next(this.formGroup.get('sort')?.value || 'asc');
            })
        ).subscribe();
    }

    ngOnDestroy() {
        if (this.valueChangeSubscription$) {
            this.valueChangeSubscription$.unsubscribe();
        }
    }

}
