import { Future } from '@quenk/noni/lib/control/monad/future';
import { Result as SResult } from '@quenk/preconditions/lib/result';
export declare type Result<A, B> = Future<SResult<A, B>>;
export declare const bcrypt: (str: string) => Future<import("@quenk/noni/lib/data/either").Either<import("@quenk/preconditions/lib/result/failure").Failure<string>, string>>;
export declare const id: () => Future<import("@quenk/noni/lib/data/either").Either<import("@quenk/preconditions/lib/result/failure").Failure<void>, string>>;
