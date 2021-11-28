import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subject, Subscription, tap } from 'rxjs';

@Component({
    selector: 'jp-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
    formGroup: FormGroup;
    @Output() keywordChanged = new Subject<{key: string, term: string}>();
    private valueChangeSubscription$: Subscription|undefined = undefined;

    constructor() {
        this.formGroup = new FormGroup({
            keyword: new FormControl(''),
            filterKey: new FormControl('id')
        });
    }

    ngOnInit(): void {
        this.valueChangeSubscription$ = this.formGroup.valueChanges.pipe(
            debounceTime(300),
            tap(() => {
                this.keywordChanged.next({
                    key: this.formGroup.get('filterKey')?.value || 'id',
                    term: this.formGroup.get('keyword')?.value || ''
                });
            })
        ).subscribe();
    }

    ngOnDestroy() {
        if (this.valueChangeSubscription$) {
            this.valueChangeSubscription$.unsubscribe();
        }
    }

}
