import { Object, Value } from '@quenk/noni/lib/data/jsonx';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Result as SResult } from '@quenk/preconditions/lib/result';
import { Precondition } from '@quenk/preconditions/lib/async';
export declare type Result<A, B> = Future<SResult<A, B>>;
export declare const COUNTERS_ID = "counters";
/**
 * bcrypt
 */
export declare const bcrypt: (str: Value) => Result<Value, Value>;
/**
 * unique fails if the value specified for the field is already stored in the
 * database.
 */
export declare const unique: <A>(collection: string, field: string, dbid?: string) => (value: A) => Result<A, A>;
/**
 * id generates the id number for a record.
 */
export declare const id: Precondition<Value, Value>;
/**
 * inc increments a counter stored in the database returning the value.
 *
 * This is used mostly for generationg sequential ids.
 *
 * Note: This was previously used at the field level but that wastes ids when
 * other checks fail. Instead, it now expects the whole object and will assign
 * the value to the property directly.
 */
export declare const inc: <T extends Object>(counter: string, propName?: string, dbid?: string) => (value: T) => Result<T, T>;
/**
 * timestamp provides the current UTC datetime as a Date object.
 */
export declare const timestamp: () => Result<Value, Value>;
/**
 * parseMarkdown parses the value of a property on a object as markdown
 * and sets the result to the target destination.
 */
export declare const parseMarkdown: (src: string, dest: string) => <T extends Object>(value: T) => Result<T, T>;
