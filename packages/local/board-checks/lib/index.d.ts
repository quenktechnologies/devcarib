import { Value } from '@quenk/noni/lib/data/jsonx';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Result as SResult } from '@quenk/preconditions/lib/result';
import { Precondition } from '@quenk/preconditions/lib/async';
export declare type Result<A, B> = Future<SResult<A, B>>;
export declare const SETTINGS_ID = "main";
/**
 * bcrypt
 */
export declare const bcrypt: (str: Value) => Result<Value, Value>;
/**
 * id generates the id number for a record.
 */
export declare const id: Precondition<Value, Value>;
/**
 * inc increments a counter stored in the database returning the value.
 *
 * This is used mostly for generationg sequential ids.
 */
export declare const inc: (field: string, dbid?: string) => (_: Value) => Result<Value, Value>;
/**
 * timestamp provides the current UTC datetime as a Date object.
 */
export declare const timestamp: () => Result<Value, Value>;
