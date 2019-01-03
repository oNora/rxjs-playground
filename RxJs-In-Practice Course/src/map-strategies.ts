import { from, Observable, fromEvent } from "rxjs";
import { filter, concatMap, mergeMap, exhaustMap } from "rxjs/operators";
import $ from "jquery";

let inputValue$: Observable<string>;

function saveChanges(changes: string): Observable<any> {
    return from(
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: changes,
                userId: 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    )
}

function inputValueObservable(text: string): Observable<string> {
    // create own observable
    return Observable.create(observer => {
        observer.next(text);
        observer.complete();

    });
}

export function init() {
    $(document).ready(function () {

        $('.first-input').keyup(function (e) {

            inputValue$ = inputValueObservable(e.target.value);

            /**
             * real usage:
             * when we have form and the data need to be save instantly
             * Using concatMap allow set post after previous is compleat
             * For more detail example check here https://angular-university.io/lesson/rxjs-concatmap-operator
             *
             * Another possibility is using mergeMap allow set post in parallel
             */
            inputValue$.pipe(
                filter((value) => value.length != 0),
                concatMap(changes => saveChanges(changes)),
                // mergeMap(changes => saveChanges(changes))
            ).subscribe();
        });


        /**
         * real usage:
         * to prevent multiple post if click the save button quick
         * For more detail example check here https://angular-university.io/lesson/rxjs-exhaustmap-operator
         */
        fromEvent($('.saveBtn'), 'click')
            .pipe(
                exhaustMap(() => saveChanges($(".first-input").val()))
            ).subscribe();
    });
}



3