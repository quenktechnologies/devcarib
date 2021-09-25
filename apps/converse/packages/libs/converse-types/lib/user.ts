import * as _json from '@quenk/noni/lib/data/jsonx';

/**
 * DO NOT EDIT DIRECTLY! Changes will be lost.
 */
/**
 * Users
 */
export interface Users {

    [key: string]: User

}


export interface User extends _json.Object {

    [key: string]: _json.Value

    'id'?: number, 'name'?: string, 'username'?: string, 'password'?: string, 'status'?: number, 'last_login'?: string
}

