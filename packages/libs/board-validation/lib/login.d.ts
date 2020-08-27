import { Precondition } from '@quenk/preconditions';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';
import { Login } from '@board/types/lib/login';
/**
 * Schema for validating login credentials.
 */
export interface Schema extends Record<Precondition<Value, Value>> {
    email: Precondition<Value, string>;
    password: Precondition<Value, string>;
}
/**
 * schema implementation
 */
export declare const schema: Schema;
/**
 * validate a JSON value against the Login credential rules.
 */
export declare const validate: Precondition<Value, Login>;
