import { Future } from "@quenk/noni/lib/control/monad/future";
/**
 * compare two bcrypt hashes for equality.
 */
export declare const compare: (pwd1: string, pwd2: string) => Future<boolean>;
