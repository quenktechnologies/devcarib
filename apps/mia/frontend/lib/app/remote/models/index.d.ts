/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */
import * as jsonx from '@quenk/noni/lib/data/jsonx';
import * as api from '@quenk/potoo/lib/actor/resident/api';
import * as address from '@quenk/potoo/lib/actor/address';
import * as factory from '@quenk/jouvert/lib/app/remote/model/factory';
import * as remoteModel from '@quenk/jouvert/lib/app/remote/model';
import * as requestDecorator from '@quenk/jouvert/lib/app/remote/request/decorators';
/**
 * RemoteModels is a factory class for producing auto-generated RemoteModels.
 *
 * AUTO GENERATED, DO NOT EDIT!
 */
export declare class RemoteModels {
    remote: address.Address;
    actor: api.Spawner;
    constructor(remote: address.Address, actor: api.Spawner);
    static paths: {
        admin: {
            search: string;
            get: string;
        };
        event: {
            search: string;
            get: string;
        };
        invite: {
            search: string;
            get: string;
        };
        job: {
            search: string;
            get: string;
        };
        user: {
            search: string;
            get: string;
        };
    };
    /**
     * create a new instance of a RemoteModel using the parameters specified.
     */
    static create<T extends jsonx.Object>(name: string, remote: address.Address, actor: api.Spawner, handler?: factory.CompleteHandlerSpec<T>, decorator?: requestDecorator.RequestDecorator<T>): remoteModel.RemoteModel<T>;
    /**
     * create an instance of a RemoteModel using the internal and specified
     * parameters.
     */
    create<T extends jsonx.Object>(name: string, handler?: factory.CompleteHandlerSpec<T>, decorator?: requestDecorator.RequestDecorator<T>): remoteModel.RemoteModel<T>;
}
