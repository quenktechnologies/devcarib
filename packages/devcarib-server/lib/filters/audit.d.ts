import { Action } from '@quenk/tendril/lib/app/api';
import { Request } from '@quenk/tendril/lib/app/api/request';
/**
 * KeySpec is a string specifying the session key to retreive the audit object
 * from and the destination key to set on the request body separated by a comma.
 *
 * Example: "user:created_by"
 */
export declare type KeySpec = string;
/**
 * auditWrite sets the following keys on POST and PATCH requests respectively.
 * POST:
 *   created_by, created_on
 * PATCH:
 *  last_updated_by, last_updated_on
 *
 * The values for created_by and last_updated_by are fetched from the session.
 *
 * @param key - The session key to get the value from.
 */
export declare const auditWrite: (key: string) => (req: Request) => Action<void>;
