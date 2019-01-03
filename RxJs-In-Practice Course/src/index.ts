import { init as initHttpRequest } from './http-request';
import { init as initConcatOperators } from './concat-operator';
import { init as initMapOperators } from './map-strategies';
import { init as initMergeOperator } from './merge-operators';
import { init as initReduceResult } from './search-stremas-with-rxjs-operators';


// initHttpRequest();
// initConcatOperators();
initMapOperators();
// initMergeOperator();
initReduceResult();