import { Observable, noop, of, throwError, timer } from 'rxjs';
import { map, shareReplay, catchError, finalize, retryWhen, delayWhen } from 'rxjs/operators';

export function creatHttpObservable(url: string): Observable<any> {
    // create own observable
    return Observable.create(observer => {

        /**
         * this comes form fetch api
         * and will help to stop http request when we call observable.unsubscribe
         */
        const controller = new AbortController();
        const signal = controller.signal;

        // fetch('https://api.github.com/users')
        fetch(url, { signal })
            .then(response => {

                // handle error response
                if (response.ok) {
                    return response.json();
                } else {
                    observer.error('Request failed with status code: ', response.status);
                }
            })
            .then(body => {
                observer.next(body);
                observer.complete();
            })
            // this catch error will be trigger in case of fatal error : network or DNS error
            .catch(err => {
                observer.error(err);
            });

        return () => controller.abort();
    });
}


const http$ = creatHttpObservable('https://jsonplaceholder.typicode.com/todos/')

const todos$ = http$.pipe(
    map(res => {
        res[0].userId = `${res[0].userId}_hasChanged`
        return res;
    }),
    // prevent calling api for each subscription
    shareReplay(),
    catchError(err => {
        // return of([]) // if we want just to sent sum data on error

        //The Catch and Rethrow RxJs Error Handling Strategy
        console.log('Error occured', err);
        return throwError(err);
    }),
    // finalize - will happen if the observable has completed or catchError
    finalize(() => {
        console.log('Finalize executed...');
    }),
    //  The Retry RxJs Error Handling Strateg
    // retryWhen(error => error.pipe(
    //     // delay(2000) // this delay whole stream
    //     delayWhen(() => timer(2000)) // each error will wait for 2s
    // ))
)


const userIdFirst$ = todos$.pipe(
    map(todos => todos.filter(todo => todo.userId == 1))
);

const userIdSecond$ = todos$.pipe(
    map(todos => todos.filter(todo => todo.userId == 2))
)

export function init() {

    todos$.subscribe(
        todos => console.log('result todos with changes first user\'s id', todos),
        noop,
        () => console.log('complete user')
    );

    userIdFirst$.subscribe(
        userOne => console.log('result user id1', userOne),
        noop,
        () => console.log('complete user id1')
    )


    userIdSecond$.subscribe(
        userOne => console.log('result user id2', userOne),
        noop,
        () => console.log('complete user id2')
    )



    // cancel subscription and http call
    const http2$ = creatHttpObservable('https://jsonplaceholder.typicode.com/albums/');
    const sub = http2$.subscribe(v => console.log('http2$ val', v));

    setTimeout(() => sub.unsubscribe(), 0);
}
