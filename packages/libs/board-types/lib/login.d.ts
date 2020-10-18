import * as _json from '@quenk/noni/lib/data/jsonx';
/**
 * DO NOT EDIT DIRECTLY! Changes will be lost.
 */
/**
 * Logins
 */
export interface Logins {
    [key: string]: Login;
}
export interface Login extends _json.Object {
    [key: string]: _json.Value;
    'email'?: string;
    'password'?: string;
}
