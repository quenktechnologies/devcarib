/* tdc-output-imports */

// @ts-ignore: 2300
import { Request } from '@quenk/tendril/lib/app/api/request';
import { notFound, ok } from '@quenk/tendril/lib/app/api/response';
import { Action } from '@quenk/tendril/lib/app/api';

import { ApiController } from '@devcarib/server/lib/controllers/api';

import { PostModel } from '@converse/models/lib/post';
import { CommentModel } from '@converse/models/lib/comment';
import { EventModel } from '@converse/models/lib/event';

/**
 * UserController provides the api endpoint for the current user.
 */
export class UserController {

    get(req: Request): Action<void> {

        let muser = req.session.get('user');

        if (muser.isNothing()) return notFound();

        return ok({ data: muser.get() });

    }

}

export const postsCtrl = new ApiController(PostModel.getInstance);

export const commentsCtrl = new ApiController(CommentModel.getInstance);

export const userCtrl = new UserController();

export const eventCtrl = new ApiController(EventModel.getInstance);

/* tdc-output-exports */
