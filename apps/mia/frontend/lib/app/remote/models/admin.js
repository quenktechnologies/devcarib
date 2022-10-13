"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRemoteModel = void 0;
const remoteModel = require("@quenk/jouvert/lib/app/remote/model");
/**
 * AdminRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
class AdminRemoteModel extends remoteModel.RemoteModel {
    constructor() {
        super(...arguments);
        this.paths = AdminRemoteModel.paths;
    }
}
exports.AdminRemoteModel = AdminRemoteModel;
AdminRemoteModel.paths = { "search": "/mia/r/admins", "get": "/mia/r/admins/{id}" };
//# sourceMappingURL=admin.js.map