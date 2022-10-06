
import * as jsonx from '@quenk/noni/lib/data/jsonx';
import * as future from '@quenk/noni/lib/control/monad/future';
import * as maybe from '@quenk/noni/lib/data/maybe';
import * as strings from '@quenk/noni/lib/data/string';

import * as request from '@quenk/jhr/lib/request';

import * as remoteModel from '@quenk/jouvert/lib/app/remote/model';
import * as models from '@quenk/jouvert/lib/app/model';


import { Invite } from '@converse/types/lib/invite';



/**
 * InviteRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class InviteRemoteModel
    extends
    remoteModel.BaseRemoteModel<Invite> {

    create(data: Invite): future.Future<models.Id> {

        let that = this;

        return future.doFuture(function*() {

            let r = yield that.send(new request.Post('/r/invites', data));

            return future.pure((<remoteModel.CreateResult>r.body).data.id);

        });

    }

    search(qry: jsonx.Object): future.Future<Invite[]> {

        let that = this;

        return future.doFuture(function*() {

            let r = yield that.send(new request.Get('/r/invites', qry));

            return future.pure((r.code === 204) ?
                [] : (<remoteModel.SearchResult<Invite>>r.body).data);

        });

    }

    update(id: models.Id, changes: Partial<Invite>): future.Future<boolean> {

        let that = this;

        return future.doFuture(function*() {

            let r = yield that.send(new request.Patch(strings.interpolate('/r/invites/{id}', { id }),
                changes));

            return future.pure((r.code === 200) ? true : false);

        });

    }

    get(id: models.Id): future.Future<maybe.Maybe<Invite>> {

        let that = this;

        return future.doFuture(function*() {

            let req = new request.Get(strings.interpolate('/r/invites/{id}', { id }));

            return that
                .send(req)
                .chain(res => future.pure(maybe.fromNullable(
                    (<remoteModel.GetResult<Invite>>res.body).data)))
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
                '/r/invites/{id}', { id })));

            return future.pure((r.code === 200) ? true : false);

        });

    }

}

