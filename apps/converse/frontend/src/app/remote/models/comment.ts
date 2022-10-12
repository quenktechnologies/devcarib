import * as remoteModel from '@quenk/jouvert/lib/app/remote/model';


import { Comment } from '@converse/types/lib/comment';



/**
 * CommentRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class CommentRemoteModel
    extends
    remoteModel.RemoteModel<Comment> {

    static paths = { "search": "/r/comments", "get": "/r/comments/{id}" }

    paths = CommentRemoteModel.paths;

}

