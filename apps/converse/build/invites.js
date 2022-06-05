"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteController = void 0;
const checks = require("@converse/checks/lib/user");
const record_1 = require("@quenk/noni/lib/data/record");
const csrf_token_1 = require("@quenk/tendril/lib/app/boot/stage/csrf-token");
const pool_1 = require("@quenk/tendril/lib/app/api/pool");
const api_1 = require("@quenk/tendril/lib/app/api");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const tendril_show_wml_1 = require("@quenk/tendril-show-wml");
const response_1 = require("@quenk/tendril/lib/app/api/response");
const _404_1 = require("@devcarib/views/lib/common/404");
const invite_1 = require("@devcarib/views/lib/converse/invite");
const register_1 = require("@devcarib/views/lib/converse/register");
const datetime_1 = require("@devcarib/common/lib/data/datetime");
const invite_2 = require("@converse/models/lib/invite");
const user_1 = require("@converse/models/lib/user");
const ERR_MESSAGE = 'Please correct the errors below before proceeding.';
/**
 * InviteController is responsible for the invitation based user registration
 * workflow.
 */
class InviteController {
    _getModel(db) {
        return invite_2.InviteModel.getInstance(db);
    }
    _getInvite(model, id) {
        return model.get(id, { accepted_on: { $exists: false } });
    }
    _sendNotFound() {
        return (0, tendril_show_wml_1.render)(new _404_1.NotFoundView({}), 404);
    }
    /**
     * onForm displays the registration form if the invite is valid.
     *
     * 404s otherwise.
     */
    onForm(req) {
        let that = this;
        return (0, api_1.doAction)(function* () {
            let model = that._getModel(yield (0, pool_1.checkout)('main'));
            let minvite = yield (0, control_1.fork)(that._getInvite(model, req.params.id));
            if (minvite.isNothing())
                return (0, tendril_show_wml_1.render)(new _404_1.NotFoundView({}), 404);
            let invite = minvite.get();
            return (0, tendril_show_wml_1.render)(new invite_1.InviteView({
                failed: false,
                errors: {},
                token: invite.id,
                values: {
                    name: invite.name,
                    email: invite.email,
                },
                csrfToken: req.prs.getOrElse(csrf_token_1.PRS_CSRF_TOKEN, '')
            }));
        });
    }
    /**
     * onRegister attempts to create a new user with the credentials the user
     * supplied.
     */
    onRegister(req) {
        let that = this;
        return (0, api_1.doAction)(function* () {
            let db = yield (0, pool_1.checkout)('main');
            let model = that._getModel(db);
            let minvite = yield (0, control_1.fork)(that._getInvite(model, req.params.id));
            if (minvite.isNothing())
                return that._sendNotFound();
            let invite = minvite.get();
            let result = yield (0, control_1.fork)(checks.check(req.body));
            if (result.isLeft()) {
                let errors = result.takeLeft().explain();
                return (0, tendril_show_wml_1.render)(new invite_1.InviteView({
                    failed: true,
                    message: ERR_MESSAGE,
                    errors,
                    token: invite.id,
                    values: (0, record_1.merge)({
                        name: invite.name,
                        email: invite.email,
                    }, req.body),
                    csrfToken: req.prs.getOrElse(csrf_token_1.PRS_CSRF_TOKEN, '')
                }));
            }
            else {
                let user = result.takeRight();
                user.status = 1;
                user.invite = invite.id;
                user.invited_by = invite.created_by;
                user.invited_on = invite.created_on;
                let users = user_1.UserModel.getInstance(db);
                yield (0, control_1.fork)(users.create(user));
                yield (0, control_1.fork)(model.update(req.params.id, { accepted_on: (0, datetime_1.now)() }));
                req.session.setWithDescriptor('success', 1, { ttl: 1 });
                return (0, response_1.redirect)('/converse/register/success', 303);
            }
        });
    }
    /**
     * onSuccess shows the page telling the user their registration was
     * successful.
     */
    onSuccess(req) {
        return (req.session.getOrElse('success', 0) === 1) ?
            (0, tendril_show_wml_1.render)(new register_1.SuccessView({})) :
            (0, response_1.redirect)('/', 301);
    }
}
exports.InviteController = InviteController;
//# sourceMappingURL=invites.js.map