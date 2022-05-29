import * as _json from '@quenk/noni/lib/data/jsonx';
/**
 * DO NOT EDIT DIRECTLY! Changes will be lost.
 */
/**
 * Posts
 */
export interface Posts {
    [key: string]: Post;
}
export interface Post extends _json.Object {
    [key: string]: _json.Value;
    'id'?: number;
    'title'?: string;
    'body'?: string;
    'body_html'?: string;
    'web-views'?: number;
    'created_by'?: {
        [key: string]: _json.Value;
        'id'?: number;
        'username'?: string;
    };
    'created_on'?: string;
    'last_updated_on'?: string;
    'last_updated_by'?: {
        [key: string]: _json.Value;
        'id'?: number;
        'username'?: string;
    };
}
