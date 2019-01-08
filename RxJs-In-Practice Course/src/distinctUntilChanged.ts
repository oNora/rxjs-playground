import { from } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';

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

let objectTest2 = objectTest;
objectTest2.p = innerObject2;
console.log(objectTest2);
const myArrayWithDuplicatesInARow = from([objectTest, objectTest, objectTest2, 2, 2, 3, 1, 2, 3]);


export function init() {
    const distinctSub = myArrayWithDuplicatesInARow
        .pipe(startWith(objectTest), distinctUntilChanged())
        .subscribe(val => console.log('DISTINCT SUB:', val));
}