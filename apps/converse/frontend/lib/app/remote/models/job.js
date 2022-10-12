"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRemoteModel = void 0;
const remoteModel = require("@quenk/jouvert/lib/app/remote/model");
/**
 * JobRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
class JobRemoteModel extends remoteModel.RemoteModel {
    constructor() {
        super(...arguments);
        this.paths = JobRemoteModel.paths;
    }
}
exports.JobRemoteModel = JobRemoteModel;
JobRemoteModel.paths = { "search": "/board/r/jobs", "get": "/board/r/jobs/{id}" };
//# sourceMappingURL=job.js.map