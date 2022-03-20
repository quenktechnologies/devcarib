import * as _json from '@quenk/noni/lib/data/jsonx';
/**
 * DO NOT EDIT DIRECTLY! Changes will be lost.
 */
/**
 * MailMessages
 */
export interface MailMessages {
    [key: string]: MailMessage;
}
export interface MailMessage extends _json.Object {
    [key: string]: _json.Value;
    'id'?: string;
    'to'?: string;
    'from'?: string;
    'body'?: string;
}
