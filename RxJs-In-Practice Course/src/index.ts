import { init as initHttpRequest } from './http-request';
import { init as initConcatOperators } from './concat-operator';
import { init as initMapOperators } from './map-strategies';
import { init as initMergeOperator } from './merge-operators';
import { init as initReduceResult } from './search-stremas-with-rxjs-operators';
import { init as initForkJoin } from './forkJoin';
import { init as initBufferCombine } from './buffers-with-combineLatest';
import { init as initDistinctUntilChanged } from './distinctUntilChanged';


// initHttpRequest();
// initConcatOperators();
initMapOperators();
// initMergeOperator();
initReduceResult();
initForkJoin();
// initBufferCombine();
initDistinctUntilChanged();