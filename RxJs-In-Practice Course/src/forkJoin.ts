import { forkJoin } from "rxjs";
import { tap } from "rxjs/operators";

import { creatHttpObservable } from "./http-request";


export function init() {

    const userAlbums$ = creatHttpObservable('https://jsonplaceholder.typicode.com/users/1/albums');
    const userPosts$ = creatHttpObservable('https://jsonplaceholder.typicode.com/users/1/posts');

    forkJoin(userAlbums$, userPosts$).pipe(
        // tap([userAlbums, userPosts] => { // cannot extract it because the api doesn't sent data in such format
        tap(v => {
            console.log('forkJoin ', v);
        })
    ).subscribe();
}
