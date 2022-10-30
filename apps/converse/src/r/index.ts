/* tdc-output-imports */

// @ts-ignore: 2300
import { Request } from '@quenk/tendril/lib/app/api/request';
import { notFound, ok } from '@quenk/tendril/lib/app/api/response';
import { Action } from '@quenk/tendril/lib/app/api';

import { ApiController } from '@devcarib/server/lib/controllers/api';

import { PostModel } from '@converse/models/lib/post';
import { CommentModel } from '@converse/models/lib/comment';
import { EventModel } from '@converse/models/lib/event';
import { InviteModel } from '@converse/models/lib/invite';
import { UserModel } from '@converse/models/lib/user';

import {User} from '@converse/types/lib/user';

/**
 * UserController provides the API endpoint for the current user.
 */
export class UserController extends ApiController<User> {

    get(req: Request): Action<void> {

        let muser = req.session.get('user');

        if (muser.isNothing()) return notFound();

        return ok({ data: muser.get() });

    }

    update(req: Request) : Action<void> {

        let muser = req.session.get('user');

        if (muser.isNothing()) return notFound();

        req.params.id =  String((<User>muser.get()).id);

        return super.update(req);

    }

}

export const postsCtrl = new ApiController(PostModel.getInstance);

export const commentsCtrl = new ApiController(CommentModel.getInstance);

export const userCtrl = new UserController(UserModel.getInstance);

export const eventCtrl = new ApiController(EventModel.getInstance);

export const invitesCtrl = new ApiController(InviteModel.getInstance);

/* tdc-output-exports */
