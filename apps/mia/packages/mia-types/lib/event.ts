import * as _json from '@quenk/noni/lib/data/jsonx';

/**
 * DO NOT EDIT DIRECTLY! Changes will be lost.
 */
/**
 * Events
 */
export interface Events {

    [key: string]: Event

}


export interface Event extends _json.Object {

    [key: string]: _json.Value

    'id'?: number, 'title'?: string, 'startDate'?: string, 'startTime'?: string, 'startDateTime'?: string, 'tzOffset'?: string, 'endDate'?: string, 'endTime'?: string, 'endDateTime'?: string, 'url'?: string, 'location'?: string, 'host'?: string, 'description'?: string, 'description_html'?: string, 'created_by'?: {

        [key: string]: _json.Value

        'id'?: number, 'username'?: string
    }, 'created_on'?: string, 'last_updated_on'?: string, 'last_updated_by'?: {

        [key: string]: _json.Value

        'id'?: number, 'username'?: string
    }
}

