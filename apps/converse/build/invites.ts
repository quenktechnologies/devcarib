import * as mongo from 'mongodb';
import * as checks from '@converse/checks/lib/user';

import { Maybe } from '@quenk/noni/lib/data/maybe';
import { Object } from '@quenk/noni/lib/data/jsonx';
import { merge, Record } from '@quenk/noni/lib/data/record';
import { Future } from '@quenk/noni/lib/control/monad/future';

import { Request } from '@quenk/tendril/lib/app/api/request';
import { PRS_CSRF_TOKEN } from '@quenk/tendril/lib/app/boot/stage/csrf-token';
import { checkout } from '@quenk/tendril/lib/app/api/pool';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { fork } from '@quenk/tendril/lib/app/api/control';

import { render } from '@quenk/tendril-show-wml';

import { Result } from '@quenk/preconditions/lib/result';
import { redirect } from '@quenk/tendril/lib/app/api/response';

import { NotFoundView } from '@devcarib/views/lib/common/404';
import { InviteView } from '@devcarib/views/lib/converse/invite';
import { SuccessView } from '@devcarib/views/lib/converse/register';
import { now } from '@devcarib/common/lib/data/datetime';

import { Invite } from '@converse/types/lib/invite';
import { User } from '@converse/types/lib/user';

import { InviteModel } from '@converse/models/lib/invite';
import { UserModel } from '@converse/models/lib/user';

const ERR_MESSAGE = 'Please correct the errors below before proceeding.';

/**
 * InviteController is responsible for the invitation based user registration
 * workflow.
 */
export class InviteController {

    _getModel(db: mongo.Db): InviteModel {

        return InviteModel.getInstance(db);

    }

    _getInvite(model: InviteModel, id: string): Future<Maybe<Invite>> {

        return model.get(id, { accepted_on: { $exists: false } });

    }

    _sendNotFound(): Action<void> {

        return render(new NotFoundView({}), 404);
    }

    /**
     * onForm displays the registration form if the invite is valid.
     *
     * 404s otherwise.
     */
    onForm(req: Request): Action<void> {

        let that = this;

        return doAction(function*() {

            let model = that._getModel(yield checkout('main'));

            let minvite: Maybe<Invite> =
                yield fork(that._getInvite(model, req.params.id));

            if (minvite.isNothing())
                return render(new NotFoundView({}), 404);

            let invite = minvite.get();

            return render(new InviteView({

                failed: false,

                errors: <Record<string>>{},

                token: <string>invite.id,

                values: {

                    name: invite.name,

                    email: invite.email,

                },

                csrfToken: <string>req.prs.getOrElse(PRS_CSRF_TOKEN, '')

            }));

        });

    }

    /**
     * onRegister attempts to create a new user with the credentials the user
     * supplied.
     */
    onRegister(req: Request): Action<void> {

        let that = this;

        return doAction(function*() {

            let db = yield checkout('main');

            let model = that._getModel(db);

            let minvite: Maybe<Invite> =
                yield fork(that._getInvite(model, req.params.id));

            if (minvite.isNothing()) return that._sendNotFound();

            let invite = minvite.get();

            let result: Result<Object, User> =
                yield fork(checks.check(req.body));

            if (result.isLeft()) {

                let errors = <Record<string>>result.takeLeft().explain();

                return render(new InviteView({

                    failed: true,

                    message: ERR_MESSAGE,

                    errors,

                    token: <string>invite.id,

                    values: merge({

                        name: invite.name,

                        email: invite.email,

                    }, <object>req.body),

                    csrfToken: <string>req.prs.getOrElse(PRS_CSRF_TOKEN, '')

                }));

            } else {

                let user: User = result.takeRight();

                user.status = 1;
                user.invite = invite.id;
                user.invited_by = invite.created_by;
                user.invited_on = invite.created_on;

                let users = UserModel.getInstance(db);

                yield fork(users.create(user));

                yield fork(model.update(req.params.id, { accepted_on: now() }));

                req.session.setWithDescriptor('success', 1, { ttl: 1 });

                return redirect('/converse/register/success', 303);

            }

        });

    }

    /**
     * onSuccess shows the page telling the user their registration was
     * successful.
     */
    onSuccess(req: Request): Action<void> {

        return (req.session.getOrElse('success', 0) === 1) ?
            render(new SuccessView({})) :
            redirect('/', 301);

    }

}
