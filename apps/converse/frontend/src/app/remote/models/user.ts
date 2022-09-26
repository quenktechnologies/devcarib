
/** imports */
import { Object } from '@quenk/noni/lib/data/jsonx';
import {
    Future,
    doFuture,
    pure,
    raise
} from '@quenk/noni/lib/control/monad/future';
import { Maybe, fromNullable, nothing } from '@quenk/noni/lib/data/maybe';
import { interpolate } from '@quenk/noni/lib/data/string';
import { Post, Patch, Get, Delete } from '@quenk/jhr/lib/request';

import {
    CreateResult,
    SearchResult,
    GetResult,
    BaseRemoteModel
} from '@quenk/jouvert/lib/app/remote/model';
import { Id } from '@quenk/jouvert/lib/app/model';








/**
 * UserRemoteModelRemoteModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class UserRemoteModel extends BaseRemoteModel<User> {

    create(data: User): Future<Id> {

        let that = this;

        return doFuture(function*() {

            let r = yield that.send(new Post('invalid', data));

            return pure((<CreateResult>r.body).data.id);

        });

    }

    search(qry: Object): Future<User[]> {

        let that = this;

        return doFuture(function*() {

            let r = yield that.send(new Get('invalid', qry));

            return pure((r.code === 204) ?
                [] : (<SearchResult<User>>r.body).data);

        });

    }

    update(id: Id, changes: Partial<User>): Future<boolean> {

        let that = this;

        return doFuture(function*() {

            let r = yield that.send(new Patch(interpolate('invalid', { id }),
                changes));

            return pure((r.code === 200) ? true : false);

        });

    }

    get(id: Id): Future<Maybe<User>> {

        let that = this;

        return doFuture(function*() {

            let req = new Get(interpolate('invalid', { id }));

            return that
                .send(req)
                .chain(res => pure(fromNullable((<GetResult<User>>res.body).data)))
                .catch(e => ((e.message == 'ClientError') && (e.code == 404)) ?
                    pure(nothing()) :
                    raise(e)
                );

        });

    }

    remove(id: Id): Future<boolean> {

        let that = this;

        return doFuture(function*() {

            let r = yield that.send(new Delete(interpolate(
                'invalid', { id })));

            return pure((r.code === 200) ? true : false);

        });

    }

}

