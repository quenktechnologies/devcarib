import * as bcrypt from 'bcryptjs';

import { fromCallback, Future } from "@quenk/noni/lib/control/monad/future";

/**
 * compare two bcrypt hashes for equality.
 */
export const  compare = (pwd1: string, pwd2: string): Future<boolean> =>
    fromCallback<boolean>(cb => bcrypt.compare(pwd1, pwd2, cb));