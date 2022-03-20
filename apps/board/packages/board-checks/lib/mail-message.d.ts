import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions/lib/async';
import { MailMessage } from '@board/types/lib/mail-message';
/**
 * @private Used during template generation.
 */
export declare type DataType = MailMessage;
/**
 * checks for MailMessage provided as a map.
 */
export declare const checks: Preconditions<Value, Value>;
/**
 * partialChecks for MailMessage provided as a map.
 */
export declare const partialChecks: Preconditions<Value, Value>;
/**
 * check a MailMessage value.
 */
export declare const check: Precondition<Value, MailMessage>;
/**
 * checkPartial a partial MailMessage value.
 */
export declare const checkPartial: Precondition<Value, Partial<MailMessage>>;
