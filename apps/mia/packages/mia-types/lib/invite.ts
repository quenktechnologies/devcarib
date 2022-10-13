import * as _json from '@quenk/noni/lib/data/jsonx';

/**
 * DO NOT EDIT DIRECTLY! Changes will be lost.
 */
/**
 * Invites
 */
export interface Invites {

    [key: string]: Invite

}


export interface Invite extends _json.Object {

    [key: string]: _json.Value

    'id'?: string, 'name'?: string, 'email'?: string, 'token'?: string, 'message'?: string, 'accepted_on'?: string
}

