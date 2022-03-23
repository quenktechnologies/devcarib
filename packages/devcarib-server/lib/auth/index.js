"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAuthenticator = void 0;
const future_1 = require("@quenk/noni/lib/control/monad/future");
const either_1 = require("@quenk/noni/lib/data/either");
/**
 * BaseAuthenticator provides a base Authenticator implementation for
 * authenitcating a user.
 */
class BaseAuthenticator {
    authenticate(req) {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            let elogin = that.validate(req.body);
            if (elogin.isLeft())
                return (0, future_1.pure)((0, either_1.left)({
                    failed: true, credentials: req.body
                }));
            let muser = yield that.getUser(elogin.takeRight());
            return (0, future_1.pure)((muser.isNothing() ?
                (0, either_1.left)({ failed: true, credentials: req.body }) :
                (0, either_1.right)(muser.get())));
        });
    }
}
exports.BaseAuthenticator = BaseAuthenticator;
//# sourceMappingURL=index.js.map