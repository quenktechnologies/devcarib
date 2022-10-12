import * as remoteModel from '@quenk/jouvert/lib/app/remote/model';


import { Post } from '@converse/types/lib/post';
import { Comment } from '@converse/types/lib/comment';
import { Id } from '@quenk/jouvert/lib/app/model';
import { Future, pure, doFuture } from '@quenk/noni/lib/control/monad/future';
import { Object } from '@quenk/noni/lib/data/jsonx';
import { interpolate } from '@quenk/noni/lib/data/string';
import * as request from '@quenk/jhr/lib/request';



/**
 * PostRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class PostRemoteModel
    extends
    remoteModel.RemoteModel<Post> {

    static paths = { "search": "/r/posts", "get": "/r/posts/{id}", "comments": "/r/posts/{id}/comments" }

    paths = PostRemoteModel.paths;


    createComment(id: Id, data: Comment): Future<Id> {


        let that = this;

        return doFuture(function*() {

            let path = interpolate('/r/posts/{id}/comments', { id });

            let res = yield that.send(new request.Post(
                path,
                data,
                {
                    tags: {
                        path,
                        verb: 'post',
                        method: 'createComment'
                    }
                }));

            return pure((<{ data: { id: number } }>res.body).data.id);

        });


    }


    getComments(id: Id, qry: Object = {}): Future<Comment[]> {

        let that = this;

        return doFuture(function*() {

            let path = interpolate('/r/posts/{id}/comments', { id });

            let res = yield that.send(new request.Get(
                path,
                qry,
                {
                    tags: {
                        path,
                        verb: 'post',
                        method: 'getComments'
                    }
                }));

            return pure((res.code === 204) ? [] : (<{ data: Comment[] }>res.body).data);

        });

    }

}

