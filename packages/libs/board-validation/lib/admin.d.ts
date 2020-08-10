import { Precondition } from '@quenk/preconditions';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';
import { Admin } from '@board/types/lib/admin';
/**
 * Schema for validating a value as a Admin.
 */
export interface Schema extends Record<Precondition<Value, Value>> {
    name: Precondition<Value, string>;
    email: Precondition<Value, string>;
    password: Precondition<Value, string>;
}
/**
 * schema implementation
 */
export declare const schema: Schema;
/**
 * validate a JSON value as a Admin.
 */
export declare const validate: Precondition<Value, Admin>;
