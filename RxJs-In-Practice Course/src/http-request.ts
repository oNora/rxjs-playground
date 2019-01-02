import { Observable, noop } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

function creatHttpObservable(url: string): Observable<any> {
    // create own observable
    return Observable.create(observer => {
        // fetch('https://api.github.com/users')
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(body => {
                observer.next(body);
                observer.complete();
            })
            .catch(err => {
                observer.error(err);
            });
    });
}


const http$ = creatHttpObservable('https://jsonplaceholder.typicode.com/todos/')

const todos$ = http$.pipe(
    map(res => {
        res[0].userId = `${res[0].userId}_hasChanged`
        return res;
    }),
    // prevent calling api for each subscription
    shareReplay()
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
}
