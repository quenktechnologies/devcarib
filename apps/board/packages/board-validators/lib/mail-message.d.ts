import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions';
import { MailMessage } from '@board/types/lib/mail-message';
/**
 * @private Used during template generation.
 */
export declare type DataType = MailMessage;
/**
 * validators for MailMessage provided as a map.
 */
export declare const validators: Preconditions<Value, Value>;
/**
 * partialValidators for MailMessage provided as a map.
 */
export declare const partialValidators: Preconditions<Value, Value>;
/**
 * validate a single Value against the rules for MailMessage.
 */
export declare const validate: Precondition<Value, MailMessage>;
/**
 * validate a single Value against the rules for a partial MailMessage.
 */
export declare const validatePartial: Precondition<Value, Partial<MailMessage>>;
