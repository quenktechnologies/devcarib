"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRemoteModel = void 0;
const remoteModel = require("@quenk/jouvert/lib/app/remote/model");
/**
 * UserRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
class UserRemoteModel extends remoteModel.RemoteModel {
    constructor() {
        super(...arguments);
        this.paths = UserRemoteModel.paths;
    }
}
exports.UserRemoteModel = UserRemoteModel;
UserRemoteModel.paths = { "search": "/mia/r/users", "get": "/mia/r/users/{id}" };
//# sourceMappingURL=user.js.map