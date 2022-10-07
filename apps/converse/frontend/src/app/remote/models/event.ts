
import * as jsonx from '@quenk/noni/lib/data/jsonx';
import * as future from '@quenk/noni/lib/control/monad/future';
import * as maybe from '@quenk/noni/lib/data/maybe';
import * as strings from '@quenk/noni/lib/data/string';

import * as request from '@quenk/jhr/lib/request';

import * as remoteModel from '@quenk/jouvert/lib/app/remote/model';
import * as models from '@quenk/jouvert/lib/app/model';


import { Event } from '@mia/types/lib/event';



/**
 * EventRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class EventRemoteModel
    extends
    remoteModel.BaseRemoteModel<Event> {

    create(data: Event): future.Future<models.Id> {

        let that = this;

        return future.doFuture(function*() {

            let r = yield that.send(new request.Post('/r/events', data));

            return future.pure((<remoteModel.CreateResult>r.body).data.id);

        });

    }

    search(qry: jsonx.Object): future.Future<Event[]> {

        let that = this;

        return future.doFuture(function*() {

            let r = yield that.send(new request.Get('/r/events', qry));

            return future.pure((r.code === 204) ?
                [] : (<remoteModel.SearchResult<Event>>r.body).data);

        });

    }

    update(id: models.Id, changes: Partial<Event>): future.Future<boolean> {

        let that = this;

        return future.doFuture(function*() {

            let r = yield that.send(new request.Patch(strings.interpolate('/r/events/{id}', { id }),
                changes));

            return future.pure((r.code === 200) ? true : false);

        });

    }

    get(id: models.Id): future.Future<maybe.Maybe<Event>> {

        let that = this;

        return future.doFuture(function*() {

            let req = new request.Get(strings.interpolate('/r/events/{id}', { id }));

            return that
                .send(req)
                .chain(res => future.pure(maybe.fromNullable(
                    (<remoteModel.GetResult<Event>>res.body).data)))
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
                '/r/events/{id}', { id })));

            return future.pure((r.code === 200) ? true : false);

        });

    }

}
