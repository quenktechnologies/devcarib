import * as remoteModel from '@quenk/jouvert/lib/app/remote/model';


import { User } from '@mia/types/lib/user';



/**
 * UserRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class UserRemoteModel
    extends
    remoteModel.RemoteModel<User> {

    static paths = { "search": "r/users", "get": "r/users/{id}" }

    paths = UserRemoteModel.paths;

}

