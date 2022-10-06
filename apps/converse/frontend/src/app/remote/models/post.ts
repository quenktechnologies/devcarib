
import * as jsonx from '@quenk/noni/lib/data/jsonx';
import * as future from '@quenk/noni/lib/control/monad/future';
import * as maybe from '@quenk/noni/lib/data/maybe';
import * as strings from '@quenk/noni/lib/data/string';

import * as request from '@quenk/jhr/lib/request';

import * as remoteModel from '@quenk/jouvert/lib/app/remote/model';
import * as models from '@quenk/jouvert/lib/app/model';


import { Post } from '@converse/types/lib/post';



/**
 * PostRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class PostRemoteModel
    extends
    remoteModel.BaseRemoteModel<Post> {

    create(data: Post): future.Future<models.Id> {

        let that = this;

        return future.doFuture(function*() {

            let r = yield that.send(new request.Post('/r/posts', data));

            return future.pure((<remoteModel.CreateResult>r.body).data.id);

        });

    }

    search(qry: jsonx.Object): future.Future<Post[]> {

        let that = this;

        return future.doFuture(function*() {

            let r = yield that.send(new request.Get('/r/posts', qry));

            return future.pure((r.code === 204) ?
                [] : (<remoteModel.SearchResult<Post>>r.body).data);

        });

    }

    update(id: models.Id, changes: Partial<Post>): future.Future<boolean> {

        let that = this;

        return future.doFuture(function*() {

            let r = yield that.send(new request.Patch(strings.interpolate('/r/posts/{id}', { id }),
                changes));

            return future.pure((r.code === 200) ? true : false);

        });

    }

    get(id: models.Id): future.Future<maybe.Maybe<Post>> {

        let that = this;

        return future.doFuture(function*() {

            let req = new request.Get(strings.interpolate('/r/posts/{id}', { id }));

            return that
                .send(req)
                .chain(res => future.pure(maybe.fromNullable(
                    (<remoteModel.GetResult<Post>>res.body).data)))
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
                '/r/posts/{id}', { id })));

            return future.pure((r.code === 200) ? true : false);

        });

    }

}

