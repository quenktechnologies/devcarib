import * as _json from '@quenk/noni/lib/data/jsonx';

/**
 * DO NOT EDIT DIRECTLY! Changes will be lost.
 */
/**
 * CandidatePosts
 */
export interface CandidatePosts {

    [key: string]: CandidatePost

}


export interface CandidatePost extends _json.Object {

    [key: string]: _json.Value

    'created_by'?: {

        [key: string]: _json.Value

        'id'?: number, 'username'?: string
    }, 'created_on'?: string, 'last_updated_on'?: string, 'last_updated_by'?: {

        [key: string]: _json.Value

        'id'?: number, 'username'?: string
    }, 'id'?: number, 'title'?: string, 'type'?: string, 'location'?: string, 'remote'?: boolean, 'preview'?: string, 'description'?: string, 'description_html'?: string, 'company'?: string, 'company_email'?: string, 'company_logo'?: string, 'apply_url'?: string, 'approved'?: boolean
}

