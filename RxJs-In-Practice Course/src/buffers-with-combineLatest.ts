import { from, combineLatest, Subject, fromEvent } from 'rxjs';
import { distinctUntilChanged, startWith, bufferCount, bufferTime, map, takeUntil } from 'rxjs/operators';

//only output distinct values, based on the last emitted value
const number1 = 1;
const innerObject = {
    a: 'test1,',
    b: 'test2,'
}
const innerObject2 = {
    a: 'test1,',
    b: 'test3,'
}
const objectTest = {
    v: 4,
    p: innerObject
}

const shouldSubscribeSnapshot = new Subject();

let objectTest2 = objectTest;
objectTest2.p = innerObject2;

const arrLeeter = fromEvent(document, 'click');
const myArrayWithDuplicatesInARow = from([objectTest, objectTest, objectTest2, 2, 2, 3, 1, 2, 3]);


export function init() {

    shouldSubscribeSnapshot.next(true);
    combineLatest(
        // arrLeeter.pipe(takeUntil(shouldSubscribeSnapshot)),
        arrLeeter,
        myArrayWithDuplicatesInARow.pipe(
            bufferTime(2, null, 2), distinctUntilChanged(), startWith(objectTest)
        ),
        (leters, other) => {
            const result = {
                'leters': leters,
                'other': other
            };
            return result;

        }
    ).pipe(
        map((result) => {
            console.log('result.leters.isTrusted: ');
            if (result.leters.isTrusted) {
                console.log('if');
                shouldSubscribeSnapshot.next(false);
            }
            return result;
        })
    ).subscribe(
        (v) => {
            console.log('v: ', v);
        }
    )
}
