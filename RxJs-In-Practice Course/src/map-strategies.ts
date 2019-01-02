import { from, Observable } from "rxjs";
import { filter, concatMap } from "rxjs/operators";
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

        $('input').keyup(function (e) {

            inputValue$ = inputValueObservable(e.target.value);

            /**
             * real usage:
             * when we have form and the data need to be save instantly
             * Using concatMap allow set post after previous is compleat
             * For more detail example check here https://angular-university.io/lesson/rxjs-concatmap-operator
             */
            inputValue$.pipe(
                filter((value) => value.length != 0),
                concatMap(changes => saveChanges(changes))
            ).subscribe();
        })
    });
}



