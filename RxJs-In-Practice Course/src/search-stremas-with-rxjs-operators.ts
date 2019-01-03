import $ from "jquery";
import { map, debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { fromEvent } from "rxjs";

import { creatHttpObservable } from "./http-request";

const user = creatHttpObservable('https://jsonplaceholder.typicode.com/users/1');
const userContent = loadUserContent('todos')
    .pipe(
        map(photos => {
            return photos.filter(p => p.id < 4);
        })
    )

function loadUserContent(param) {
    return creatHttpObservable(`https://jsonplaceholder.typicode.com/users/1/${param}`)
        .pipe(
            map(photos => {
                // quick fix prevent error
                if (photos.length) {
                    return photos.filter(p => p.id < 4);
                } else {
                    [{ title: '' }]
                }
            })
        )
}

export function init() {
    $(document).ready(function () {

        user.subscribe(
            albumResult => {

                $('.album-details').append(
                    `<h3>Album name: ${albumResult.title}</h3>
                    <p>Album ID: ${albumResult.id}</p>`
                );
            }
        )


        userContent.subscribe(
            userContentResult => {
                applyDomChanges(userContentResult)
            }
        )

        fromEvent($('.second-input'), 'keyup')
            .pipe(
                map(() => $(".second-input").val()),
                // debounceTime - good explanation of behavior https://angular-university.io/lesson/rxjs-building-a-search-typeahead
                // and here also http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-debounceTime
                debounceTime(400),
                distinctUntilChanged(),
                /**
                 * switchMap real usage: if user write slowly to cancel existing post request a
                 * and start search with the last entered value
                 * here is not relay visible so check here https://angular-university.io/lesson/rxjs-switchmap-operator
                 *
                 */
                switchMap(search => loadUserContent(search))
            ).subscribe(
                (r) => applyDomChanges(r)

            )


    });


    function applyDomChanges(result) {
        let sectionName = '';
        $('.albums-info li').remove();
        result.forEach(content => {


            if (content.completed !== undefined) {
                sectionName = sectionName.length !== 0 ? sectionName : 'todos';
            }

            if (content.body) {
                sectionName = sectionName.length !== 0 ? sectionName : 'posts';
            }

            if (content.completed == undefined && !content.body) {
                sectionName = sectionName.length !== 0 ? sectionName : 'albums';
            }


            $('.albums-info').append(
                `<li>
                <p>title: ${content.title}</p>
                </li>`
            );
        });

        $('.albums-info').prepend(
            `<li><strong>this is users ${sectionName}:</strong></li>`
        )
    }
}