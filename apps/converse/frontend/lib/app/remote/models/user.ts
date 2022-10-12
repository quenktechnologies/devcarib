import * as remoteModel from '@quenk/jouvert/lib/app/remote/model';


import { User } from '@converse/types/lib/user';



/**
 * UserRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class UserRemoteModel
    extends
    remoteModel.RemoteModel<User> {

    static paths = { "search": "invalid", "get": "/r/me" }

    paths = UserRemoteModel.paths;

}

