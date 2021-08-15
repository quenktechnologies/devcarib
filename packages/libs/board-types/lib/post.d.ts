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
    'status'?: string;
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
    'id'?: number;
    'title'?: string;
    'type'?: string;
    'location'?: string;
    'remote'?: boolean;
    'description'?: string;
    'description_html'?: string;
    'company'?: string;
    'company_email'?: string;
    'company_logo'?: string;
    'apply_url'?: string;
    'approved'?: boolean;
    'payment_currency'?: string;
    'payment_amount'?: number;
    'payment_frequency'?: string;
}
