import * as mongo from 'mongodb';
import * as moment from 'moment';

import { doFuture, liftP, pure } from '@quenk/noni/lib/control/monad/future';

import { Immutable } from '@quenk/potoo/lib/actor/resident/immutable';
import { caseOf } from '@quenk/potoo/lib/actor/resident/case';
import { Address } from '@quenk/potoo/lib/actor/address';

import { unsafeGetUserConnection } from '@quenk/tendril/lib/app/connection';

import { Finished, Subscribe, Tick } from '../task/clock';

const POST_EXPIRE_MONTHS = 3;

export type Message
    = Tick
    ;

/**
 * ClearExpiredJobsTask removes jobs that have been posted POST_EXPIRE_MONTHS
 * ago from the database.
 */
export class ClearExpiredJobsTask extends Immutable<Message> {

    receive() {

        return [

            caseOf(Tick, (t: Tick) => this.clear(t.src))

        ];

    }

    /**
     * clear the expired job postings.
     */
    clear(clock: Address) {

        let self = this;

        return doFuture<undefined>(function*() {

            let threshold = moment
                .utc()
                .subtract(POST_EXPIRE_MONTHS, 'months')
                .toDate();

            let db: mongo.Db = yield unsafeGetUserConnection('main');

            let posts = db.collection('posts');

            // TODO: Remove magic string.
            yield liftP(() =>
                posts.updateMany({ created_on: { $lt: threshold } },
                    { $set: { status: 'archived' } }));

            self.tell(clock, new Finished(self.self()));

            return pure(undefined);

        });

    }

    run() {

        this.tell('/clock', new Subscribe('freq.low', this.self()));

    }

}
