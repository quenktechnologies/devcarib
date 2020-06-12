import { Future } from '@quenk/noni/lib/control/monad/future';
import { Result as SResult } from '@quenk/preconditions/lib/result';
export declare type Result<A, B> = Future<SResult<A, B>>;
export declare const bcrypt: (str: string) => Result<string, string>;
export declare const id: () => Result<void, string>;
