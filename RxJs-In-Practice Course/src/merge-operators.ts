import { interval, merge } from "rxjs";
import { map } from "rxjs/operators";


export function init() {
    const interval1$ = interval(1000);
    const interval2$ = interval1$.pipe(
        map(val => 10 * val)
    );

    const result$ = merge(interval1$, interval2$);
    result$.subscribe(
        result => console.log('merge operators result: ', result)
    );
}