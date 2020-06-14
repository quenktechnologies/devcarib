import { Value } from '@quenk/noni/lib/data/jsonx';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Result as SResult } from '@quenk/preconditions/lib/result';
import { Precondition } from '@quenk/preconditions/lib/async';
export declare type Result<A, B> = Future<SResult<A, B>>;
export declare const bcrypt: (str: string) => Result<string, string>;
/**
 * id generates the id number for a record.
 */
export declare const id: Precondition<Value, Value>;
