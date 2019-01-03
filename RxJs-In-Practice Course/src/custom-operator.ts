import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export enum RxJsLoggingLevel {
    TRACE,
    DEBUG,
    INFO,
    ERROR
}

let rxjsLoggingLevel = RxJsLoggingLevel.INFO;

// this method will allow the rest part of the code to modify the default value of rxjsLoggingLevel
export function setRxJsLoggingLevel(level: RxJsLoggingLevel) {
    rxjsLoggingLevel = level;
}

// high order function
export const debug = (level: number, message: string) =>
    (source: Observable<any>) => source.pipe(
        tap(val => {
            if (level >= rxjsLoggingLevel) {
                console.log(message + ': ', val);
            }
        })
    );
