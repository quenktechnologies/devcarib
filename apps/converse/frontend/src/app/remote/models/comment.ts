
import * as jsonx from '@quenk/noni/lib/data/jsonx';
import * as future from '@quenk/noni/lib/control/monad/future';
import * as maybe from '@quenk/noni/lib/data/maybe';
import * as strings from '@quenk/noni/lib/data/string';

import * as request from '@quenk/jhr/lib/request';

import * as remoteModel from '@quenk/jouvert/lib/app/remote/model';
import * as models from '@quenk/jouvert/lib/app/model';


import { Comment } from '@converse/types/lib/comment';



/**
 * CommentRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class CommentRemoteModel
    extends
    remoteModel.BaseRemoteModel<Comment> {

    create(data: Comment): future.Future<models.Id> {

        let that = this;

        return future.doFuture(function*() {

            let r = yield that.send(new request.Post('/r/comments', data));

            return future.pure((<remoteModel.CreateResult>r.body).data.id);

        });

    }

    search(qry: jsonx.Object): future.Future<Comment[]> {

        let that = this;

        return future.doFuture(function*() {

            let r = yield that.send(new request.Get('/r/comments', qry));

            return future.pure((r.code === 204) ?
                [] : (<remoteModel.SearchResult<Comment>>r.body).data);

        });

    }

    update(id: models.Id, changes: Partial<Comment>): future.Future<boolean> {

        let that = this;

        return future.doFuture(function*() {

            let r = yield that.send(new request.Patch(strings.interpolate('/r/comments/{id}', { id }),
                changes));

            return future.pure((r.code === 200) ? true : false);

        });

    }

    get(id: models.Id): future.Future<maybe.Maybe<Comment>> {

        let that = this;

        return future.doFuture(function*() {

            let req = new request.Get(strings.interpolate('/r/comments/{id}', { id }));

            return that
                .send(req)
                .chain(res => future.pure(maybe.fromNullable(
                    (<remoteModel.GetResult<Comment>>res.body).data)))
                .catch(e => ((e.message == 'ClientError') && (e.code == 404)) ?
                    future.pure(maybe.nothing()) :
                    future.raise(e)
                );

        });

    }

    remove(id: models.Id): future.Future<boolean> {

        let that = this;

        return future.doFuture(function*() {

            let r = yield that.send(new request.Delete(strings.interpolate(
                '/r/comments/{id}', { id })));

            return future.pure((r.code === 200) ? true : false);

        });

    }

}

