"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearExpiredJobsTask = void 0;
const moment = require("moment");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const immutable_1 = require("@quenk/potoo/lib/actor/resident/immutable");
const case_1 = require("@quenk/potoo/lib/actor/resident/case");
const connection_1 = require("@quenk/tendril/lib/app/connection");
const clock_1 = require("../task/clock");
const POST_EXPIRE_MONTHS = 3;
/**
 * ClearExpiredJobsTask removes jobs that have been posted POST_EXPIRE_MONTHS
 * ago from the database.
 */
class ClearExpiredJobsTask extends immutable_1.Immutable {
    receive() {
        return [
            (0, case_1.caseOf)(clock_1.Tick, (t) => this.clear(t.src))
        ];
    }
    /**
     * clear the expired job postings.
     */
    clear(clock) {
        let self = this;
        return (0, future_1.doFuture)(function* () {
            let threshold = moment
                .utc()
                .subtract(POST_EXPIRE_MONTHS, 'months')
                .toDate();
            let db = yield (0, connection_1.unsafeGetUserConnection)('main');
            let posts = db.collection('posts');
            // TODO: Remove magic string.
            yield (0, future_1.liftP)(() => posts.updateMany({ created_on: { $lt: threshold } }, { $set: { status: 'archived' } }));
            self.tell(clock, new clock_1.Finished(self.self()));
            return (0, future_1.pure)(undefined);
        });
    }
    run() {
        this.tell('/clock', new clock_1.Subscribe('freq.low', this.self()));
    }
}
exports.ClearExpiredJobsTask = ClearExpiredJobsTask;
//# sourceMappingURL=clear-expired-jobs.js.map