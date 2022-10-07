
import * as jsonx from '@quenk/noni/lib/data/jsonx';
import * as future from '@quenk/noni/lib/control/monad/future';
import * as maybe from '@quenk/noni/lib/data/maybe';
import * as strings from '@quenk/noni/lib/data/string';

import * as request from '@quenk/jhr/lib/request';

import * as remoteModel from '@quenk/jouvert/lib/app/remote/model';
import * as models from '@quenk/jouvert/lib/app/model';


import { Job } from '@converse/types/lib/job';



/**
 * JobRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class JobRemoteModel
    extends
    remoteModel.BaseRemoteModel<Job> {

    create(data: Job): future.Future<models.Id> {

        let that = this;

        return future.doFuture(function*() {

            let r = yield that.send(new request.Post('/board/r/jobs', data));

            return future.pure((<remoteModel.CreateResult>r.body).data.id);

        });

    }

    search(qry: jsonx.Object): future.Future<Job[]> {

        let that = this;

        return future.doFuture(function*() {

            let r = yield that.send(new request.Get('/board/r/jobs', qry));

            return future.pure((r.code === 204) ?
                [] : (<remoteModel.SearchResult<Job>>r.body).data);

        });

    }

    update(id: models.Id, changes: Partial<Job>): future.Future<boolean> {

        let that = this;

        return future.doFuture(function*() {

            let r = yield that.send(new request.Patch(strings.interpolate('/board/r/jobs/{id}', { id }),
                changes));

            return future.pure((r.code === 200) ? true : false);

        });

    }

    get(id: models.Id): future.Future<maybe.Maybe<Job>> {

        let that = this;

        return future.doFuture(function*() {

            let req = new request.Get(strings.interpolate('/board/r/jobs/{id}', { id }));

            return that
                .send(req)
                .chain(res => future.pure(maybe.fromNullable(
                    (<remoteModel.GetResult<Job>>res.body).data)))
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
                '/board/r/jobs/{id}', { id })));

            return future.pure((r.code === 200) ? true : false);

        });

    }

}

