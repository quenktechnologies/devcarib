"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiaFormScene = void 0;
const validator_1 = require("@quenk/jouvert/lib/app/scene/form/validator");
/**
 * MiaFormScene is the base class for form controller actors in mia.
 *
 * This actor exists mostly for providing the app property.
 */
class MiaFormScene extends validator_1.BaseValidatorFormScene {
    constructor(app, target, value = {}) {
        super(app, target, value);
        this.app = app;
        this.target = target;
        this.value = value;
    }
}
exports.MiaFormScene = MiaFormScene;
//# sourceMappingURL=form.js.map