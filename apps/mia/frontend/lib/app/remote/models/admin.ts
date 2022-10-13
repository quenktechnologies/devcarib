import * as remoteModel from '@quenk/jouvert/lib/app/remote/model';


import { Admin } from '@mia/types/lib/admin';



/**
 * AdminRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class AdminRemoteModel
    extends
    remoteModel.RemoteModel<Admin> {

    static paths = { "search": "/mia/r/admins", "get": "/mia/r/admins/{id}" }

    paths = AdminRemoteModel.paths;

}

