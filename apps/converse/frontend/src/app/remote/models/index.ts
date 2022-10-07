/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */

import * as jsonx from '@quenk/noni/lib/data/jsonx';
import * as types from '@quenk/noni/lib/data/type';

import * as api from '@quenk/potoo/lib/actor/resident/api';
import * as address from '@quenk/potoo/lib/actor/address';

import * as factory from '@quenk/jouvert/lib/app/remote/model/factory';
import * as remoteModel from '@quenk/jouvert/lib/app/remote/model';
import * as model from '@quenk/jouvert/lib/app/model';
import * as remoteCallback from '@quenk/jouvert/lib/app/remote/callback';

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

    constructor(public remote: address.Address, public spawn: remoteModel.SpawnFunc) { }

    static getInstance(remote: address.Address, spawn: factory.SpawnSpec): RemoteModels {

        return new RemoteModels(remote, types.isObject(spawn) ?
            (<api.Spawner>spawn).spawn.bind(spawn) : spawn);

    }

    /**
     * create a new instance of a RemoteModel based on the provided model name.
     */
    create<T extends jsonx.Object>(
        name: string,
        handler: remoteCallback.CompleteHandler<remoteModel.Result<T>> |
            remoteCallback.CompleteHandler<remoteModel.Result<T>>[] = []
    ): model.Model<T> {

        switch (name) {


            case 'comment':
                return <model.Model<T>><model.Model<jsonx.Object>>new CommentRemoteModel(
                    this.remote,
                    this.spawn,
                    Array.isArray(handler) ?
                        new remoteCallback.CompositeCompleteHandler(handler) :
                        handler
                )

            case 'event':
                return <model.Model<T>><model.Model<jsonx.Object>>new EventRemoteModel(
                    this.remote,
                    this.spawn,
                    Array.isArray(handler) ?
                        new remoteCallback.CompositeCompleteHandler(handler) :
                        handler
                )

            case 'invite':
                return <model.Model<T>><model.Model<jsonx.Object>>new InviteRemoteModel(
                    this.remote,
                    this.spawn,
                    Array.isArray(handler) ?
                        new remoteCallback.CompositeCompleteHandler(handler) :
                        handler
                )

            case 'job':
                return <model.Model<T>><model.Model<jsonx.Object>>new JobRemoteModel(
                    this.remote,
                    this.spawn,
                    Array.isArray(handler) ?
                        new remoteCallback.CompositeCompleteHandler(handler) :
                        handler
                )

            case 'post':
                return <model.Model<T>><model.Model<jsonx.Object>>new PostRemoteModel(
                    this.remote,
                    this.spawn,
                    Array.isArray(handler) ?
                        new remoteCallback.CompositeCompleteHandler(handler) :
                        handler
                )

            case 'user':
                return <model.Model<T>><model.Model<jsonx.Object>>new UserRemoteModel(
                    this.remote,
                    this.spawn,
                    Array.isArray(handler) ?
                        new remoteCallback.CompositeCompleteHandler(handler) :
                        handler
                )

            default:
                throw new Error(`Unknown model name "${name}"!`);

        }

    }

}

