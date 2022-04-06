"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConverseScene = void 0;
const main_1 = require("@quenk/jouvert/lib/app/scene/main");
/**
 * ConverseScene is the base class for all mia AppScenes.
 *
 * This definition exists to specify the app property.
 */
class ConverseScene extends main_1.MainScene {
    constructor(app, resume) {
        super(app, resume);
        this.app = app;
        this.resume = resume;
    }
}
exports.ConverseScene = ConverseScene;
//# sourceMappingURL=index.js.map