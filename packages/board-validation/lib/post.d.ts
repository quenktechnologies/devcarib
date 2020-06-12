import { Precondition } from '@quenk/preconditions';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';
import { Post } from '@board/types/lib/post';
/**
 * Schema for validating a value as a Post.
 */
export interface Schema extends Record<Precondition<Value, Value>> {
    title: Precondition<Value, string>;
    description: Precondition<Value, string>;
    company: Precondition<Value, string>;
    company_email: Precondition<Value, string>;
    company_logo: Precondition<Value, string>;
    apply_url: Precondition<Value, string>;
}
/**
 * schema implementation
 */
export declare const schema: Schema;
/**
 * validate a JSON value as a Post.
 */
export declare const validate: Precondition<Value, Post>;
