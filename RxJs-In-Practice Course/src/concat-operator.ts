import { of, concat, interval } from "rxjs";

const sourceNotCompleat$ = interval(2000);

const source1$ = of(1, 2, 3);
const source2$ = of('a', 'b', 'c');
const source3$ = of(7, 8, 9);

// concat operator works only with observable which complete
const result$ = concat(source1$, source2$, source3$)

const result2$ = concat(sourceNotCompleat$, source2$, source3$)


export function init() {
    result$.subscribe(
        val => console.log('concat operator value: ', val)
    )

    // sourceNotCompleat$.subscribe(
    //     val => console.log('first stream not complete so we won\'t see value from others streams: ', val)
    // )
}