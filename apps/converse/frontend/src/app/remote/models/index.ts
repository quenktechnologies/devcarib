/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */

import { Object } from '@quenk/noni/lib/data/jsonx';
import { isObject } from '@quenk/noni/lib/data/type';

import { Spawner } from '@quenk/potoo/lib/actor/resident/api';
import { Address } from '@quenk/potoo/lib/actor/address';

import { SpawnSpec } from '@quenk/jouvert/lib/app/remote/model/factory';
import { Result, SpawnFunc } from '@quenk/jouvert/lib/app/remote/model';
import {
    CompleteHandler,
    CompositeCompleteHandler
} from '@quenk/jouvert/lib/app/remote/callback';

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

    constructor(public remote: Address, public spawn: SpawnFunc) { }

    static getInstance(remote: Address, spawn: SpawnSpec): RemoteModels {

        return new RemoteModels(remote, isObject(spawn) ?
            (<Spawner>spawn).spawn.bind(spawn) : spawn);

    }

    /**
     * create a new instance of a RemoteModel based on the provided model name.
     */
    create<T extends Object>(
        name: string,
        handler: CompleteHandler<Result<T>> | CompleteHandler<Result<T>>[] = []) {

        switch (name) {


            case 'comment':
                return new CommentRemoteModel(
                    this.remote,
                    this.spawn,
                    Array.isArray(handler) ? new CompositeCompleteHandler(handler) : handler
                )

            case 'event':
                return new EventRemoteModel(
                    this.remote,
                    this.spawn,
                    Array.isArray(handler) ? new CompositeCompleteHandler(handler) : handler
                )

            case 'invite':
                return new InviteRemoteModel(
                    this.remote,
                    this.spawn,
                    Array.isArray(handler) ? new CompositeCompleteHandler(handler) : handler
                )

            case 'job':
                return new JobRemoteModel(
                    this.remote,
                    this.spawn,
                    Array.isArray(handler) ? new CompositeCompleteHandler(handler) : handler
                )

            case 'post':
                return new PostRemoteModel(
                    this.remote,
                    this.spawn,
                    Array.isArray(handler) ? new CompositeCompleteHandler(handler) : handler
                )

            case 'user':
                return new UserRemoteModel(
                    this.remote,
                    this.spawn,
                    Array.isArray(handler) ? new CompositeCompleteHandler(handler) : handler
                )

            default:
                throw new Error(`Unknown model name "${name}"!`);

        }

    }

}

