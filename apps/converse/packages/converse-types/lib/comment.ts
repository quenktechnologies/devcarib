import * as _json from '@quenk/noni/lib/data/jsonx';

/**
 * DO NOT EDIT DIRECTLY! Changes will be lost.
 */
/**
 * Comments
 */
export interface Comments {

    [key: string]: Comment

}


export interface Comment extends _json.Object {

    [key: string]: _json.Value

    'id'?: number, 'post'?: number, 'body'?: string, 'body_html'?: string, 'created_by'?: {

        [key: string]: _json.Value

        'id'?: number, 'username'?: string
    }, 'created_on'?: string, 'last_updated_on'?: string, 'last_updated_by'?: {

        [key: string]: _json.Value

        'id'?: number, 'username'?: string
    }
}

