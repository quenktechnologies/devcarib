/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */

import * as jsonx from '@quenk/noni/lib/data/jsonx';

import * as api from '@quenk/potoo/lib/actor/resident/api';
import * as address from '@quenk/potoo/lib/actor/address';

import * as factory from '@quenk/jouvert/lib/app/remote/model/factory';
import * as remoteModel from '@quenk/jouvert/lib/app/remote/model';
import * as remoteCallback from '@quenk/jouvert/lib/app/remote/callback';
import * as requestDecorator
    from '@quenk/jouvert/lib/app/remote/request/decorators';

import { CommentRemoteModel } from './comment';
import { EventRemoteModel } from './event';
import { InviteRemoteModel } from './invite';
import { JobRemoteModel } from './job';
import { PostRemoteModel } from './post';
import { UserRemoteModel } from './user';

/**
 * RemoteModels is a factory class for producing auto-generated RemoteModels.
 *
 * AUTO GENERATED, DO NOT EDIT!
 */
export class RemoteModels {

    constructor(public remote: address.Address, public actor: api.Spawner) { }

    static paths = {

        'comment': CommentRemoteModel.paths,
        'event': EventRemoteModel.paths,
        'invite': InviteRemoteModel.paths,
        'job': JobRemoteModel.paths,
        'post': PostRemoteModel.paths,
        'user': UserRemoteModel.paths,

    };

    /**
     * create a new instance of a RemoteModel using the parameters specified.
     */
    static create<T extends jsonx.Object>(
        name: string,
        remote: address.Address,
        actor: api.Spawner,
        handler: factory.CompleteHandlerSpec<T> = [],
        decorator?: requestDecorator.RequestDecorator<T>)
        : remoteModel.RemoteModel<T> {

        switch (name) {


            case 'comment':
                return <remoteModel.RemoteModel<T>><remoteModel.RemoteModel<jsonx.Object>>new CommentRemoteModel(
                    remote,
                    actor,
                    Array.isArray(handler) ?
                        new remoteCallback.CompositeCompleteHandler(handler) :
                        handler,
                    decorator
                )

            case 'event':
                return <remoteModel.RemoteModel<T>><remoteModel.RemoteModel<jsonx.Object>>new EventRemoteModel(
                    remote,
                    actor,
                    Array.isArray(handler) ?
                        new remoteCallback.CompositeCompleteHandler(handler) :
                        handler,
                    decorator
                )

            case 'invite':
                return <remoteModel.RemoteModel<T>><remoteModel.RemoteModel<jsonx.Object>>new InviteRemoteModel(
                    remote,
                    actor,
                    Array.isArray(handler) ?
                        new remoteCallback.CompositeCompleteHandler(handler) :
                        handler,
                    decorator
                )

            case 'job':
                return <remoteModel.RemoteModel<T>><remoteModel.RemoteModel<jsonx.Object>>new JobRemoteModel(
                    remote,
                    actor,
                    Array.isArray(handler) ?
                        new remoteCallback.CompositeCompleteHandler(handler) :
                        handler,
                    decorator
                )

            case 'post':
                return <remoteModel.RemoteModel<T>><remoteModel.RemoteModel<jsonx.Object>>new PostRemoteModel(
                    remote,
                    actor,
                    Array.isArray(handler) ?
                        new remoteCallback.CompositeCompleteHandler(handler) :
                        handler,
                    decorator
                )

            case 'user':
                return <remoteModel.RemoteModel<T>><remoteModel.RemoteModel<jsonx.Object>>new UserRemoteModel(
                    remote,
                    actor,
                    Array.isArray(handler) ?
                        new remoteCallback.CompositeCompleteHandler(handler) :
                        handler,
                    decorator
                )

            default:
                throw new Error(`Unknown model name "${name}"!`);

        }

    }

    /**
     * create an instance of a RemoteModel using the internal and specified 
     * parameters.
     */
    create<T extends jsonx.Object>(
        name: string,
        handler: factory.CompleteHandlerSpec<T> = [],
        decorator?: requestDecorator.RequestDecorator<T>)
        : remoteModel.RemoteModel<T> {

        return RemoteModels.create(name, this.remote, this.actor, handler, decorator);

    }
}

