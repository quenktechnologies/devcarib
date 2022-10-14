"use strict";
/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteModels = void 0;
const remoteCallback = require("@quenk/jouvert/lib/app/remote/callback");
const admin_1 = require("./admin");
const event_1 = require("./event");
const invite_1 = require("./invite");
const job_1 = require("./job");
const user_1 = require("./user");
/**
 * RemoteModels is a factory class for producing auto-generated RemoteModels.
 *
 * AUTO GENERATED, DO NOT EDIT!
 */
class RemoteModels {
    constructor(remote, actor) {
        this.remote = remote;
        this.actor = actor;
    }
    /**
     * create a new instance of a RemoteModel using the parameters specified.
     */
    static create(name, remote, actor, handler = [], decorator) {
        switch (name) {
            case 'admin':
                return new admin_1.AdminRemoteModel(remote, actor, Array.isArray(handler) ?
                    new remoteCallback.CompositeCompleteHandler(handler) :
                    handler, decorator);
            case 'event':
                return new event_1.EventRemoteModel(remote, actor, Array.isArray(handler) ?
                    new remoteCallback.CompositeCompleteHandler(handler) :
                    handler, decorator);
            case 'invite':
                return new invite_1.InviteRemoteModel(remote, actor, Array.isArray(handler) ?
                    new remoteCallback.CompositeCompleteHandler(handler) :
                    handler, decorator);
            case 'job':
                return new job_1.JobRemoteModel(remote, actor, Array.isArray(handler) ?
                    new remoteCallback.CompositeCompleteHandler(handler) :
                    handler, decorator);
            case 'user':
                return new user_1.UserRemoteModel(remote, actor, Array.isArray(handler) ?
                    new remoteCallback.CompositeCompleteHandler(handler) :
                    handler, decorator);
            default:
                throw new Error(`Unknown model name "${name}"!`);
        }
    }
    /**
     * create an instance of a RemoteModel using the internal and specified
     * parameters.
     */
    create(name, handler = [], decorator) {
        return RemoteModels.create(name, this.remote, this.actor, handler, decorator);
    }
}
exports.RemoteModels = RemoteModels;
RemoteModels.paths = {
    'admin': admin_1.AdminRemoteModel.paths,
    'event': event_1.EventRemoteModel.paths,
    'invite': invite_1.InviteRemoteModel.paths,
    'job': job_1.JobRemoteModel.paths,
    'user': user_1.UserRemoteModel.paths,
};
//# sourceMappingURL=index.js.map