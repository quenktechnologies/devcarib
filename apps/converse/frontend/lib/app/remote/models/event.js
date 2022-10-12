"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRemoteModel = void 0;
const remoteModel = require("@quenk/jouvert/lib/app/remote/model");
/**
 * EventRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
class EventRemoteModel extends remoteModel.RemoteModel {
    constructor() {
        super(...arguments);
        this.paths = EventRemoteModel.paths;
    }
}
exports.EventRemoteModel = EventRemoteModel;
EventRemoteModel.paths = { "search": "/r/events", "get": "/r/events/{id}" };
//# sourceMappingURL=event.js.map