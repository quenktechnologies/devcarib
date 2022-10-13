"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteRemoteModel = void 0;
const remoteModel = require("@quenk/jouvert/lib/app/remote/model");
/**
 * InviteRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
class InviteRemoteModel extends remoteModel.RemoteModel {
    constructor() {
        super(...arguments);
        this.paths = InviteRemoteModel.paths;
    }
}
exports.InviteRemoteModel = InviteRemoteModel;
InviteRemoteModel.paths = { "search": "/mia/r/invites", "get": "/mia/r/invites/{id}" };
//# sourceMappingURL=invite.js.map