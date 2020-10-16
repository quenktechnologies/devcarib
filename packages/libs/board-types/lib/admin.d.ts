import * as _json from '@quenk/noni/lib/data/jsonx';
/**
 * DO NOT EDIT DIRECTLY! Changes will be lost.
 */
/**
 * Admins
 */
export interface Admins {
    [key: string]: Admin;
}
export interface Admin extends _json.Object {
    [key: string]: _json.Value;
    'id'?: number;
    'name'?: string;
    'email'?: string;
    'password'?: string;
}
