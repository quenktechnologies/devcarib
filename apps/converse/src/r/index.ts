/* tdc-output-imports */
import { ApiController } from '@devcarib/server/lib/controllers/api';

import { PostModel } from '@converse/models/lib/post';
import { CommentModel } from '@converse/models/lib/comment';

import {Comment} from '@converse/types/lib/comment';

export class CommentsController extends ApiController<Comment> {

}

export const postsCtrl = new ApiController(PostModel.getInstance);
export const commentsCtrl = new CommentsController(CommentModel.getInstance);

/* tdc-output-exports */
