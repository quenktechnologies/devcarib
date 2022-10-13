import * as remoteModel from '@quenk/jouvert/lib/app/remote/model';


import { Invite } from '@mia/types/lib/invite';



/**
 * InviteRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class InviteRemoteModel
    extends
    remoteModel.RemoteModel<Invite> {

    static paths = { "search": "/mia/r/invites", "get": "/mia/r/invites/{id}" }

    paths = InviteRemoteModel.paths;

}

