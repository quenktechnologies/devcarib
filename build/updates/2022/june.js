"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnsureRootUser = void 0;
const checks = require("@converse/checks/lib/user");
const update_1 = require("@devcarib/server/lib/data/update");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const collection_1 = require("@quenk/noni-mongodb/lib/database/collection");
const __1 = require("..");
/**
 * EnsureRootUser makes sure the system has at least one user on install.
 */
class EnsureRootUser extends update_1.Update {
    constructor() {
        super(...arguments);
        this.key = '20220622_ensure-root-user';
        this.timestamp = 1654490680906;
        this.description = 'Ensures there is a root user to start the user graph. ' +
            'The credentials are source from the environment variables ROOT_USER_*';
    }
    run({ app, logger }) {
        return (0, future_1.doFuture)(function* () {
            let db = yield (0, __1.getMain)(app);
            let col = db.collection('users');
            let n = yield (0, collection_1.count)(col, {});
            if (n !== 0)
                return future_1.voidPure;
            let user = {
                name: process.env.ROOT_USER_NAME,
                email: process.env.ROOT_USER_EMAIL,
                username: process.env.ROOT_USER_USERNAME,
                password: process.env.ROOT_USER_PASSWORD
            };
            let result = yield checks.check(user);
            if (result.isLeft()) {
                let failures = result.takeLeft().explain();
                logger.warn(`User validation failed: ` +
                    `${JSON.stringify(failures)}`);
                return (0, future_1.raise)(new Error('Could not create root user account!'));
            }
            yield (0, collection_1.insertOne)(col, result.takeRight());
            return future_1.voidPure;
        });
    }
}
exports.EnsureRootUser = EnsureRootUser;
//# sourceMappingURL=june.js.map