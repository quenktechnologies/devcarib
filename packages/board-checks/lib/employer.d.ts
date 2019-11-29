import { Future } from '@quenk/noni/lib/control/monad/future';
import { Result as SResult } from '@quenk/preconditions/lib/result';
import { Precondition } from '@quenk/preconditions/lib/async';
import { Employer } from '@board/types/lib/employer';
import { Value } from '@quenk/noni/lib/data/json';
export declare type Result<A, B> = Future<SResult<A, B>>;
export declare const bcrypt: (str: string) => Future<import("@quenk/noni/lib/data/either").Either<import("@quenk/preconditions/lib/result/failure").Failure<string>, string>>;
export declare const id: () => Future<import("@quenk/noni/lib/data/either").Either<import("@quenk/preconditions/lib/result/failure").Failure<void>, string>>;
export declare const check: Precondition<Value, Employer>;
