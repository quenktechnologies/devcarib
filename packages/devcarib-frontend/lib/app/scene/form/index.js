"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevCaribForm = void 0;
const validator_1 = require("@quenk/jouvert/lib/app/scene/form/validator");
/**
 * DevCaribForm is the base class for form controller actors in DevCarib
 * apps.
 */
class DevCaribForm extends validator_1.BaseValidatorFormScene {
    constructor(app, target, value = {}) {
        super(app, target, value);
        this.app = app;
        this.target = target;
        this.value = value;
    }
}
exports.DevCaribForm = DevCaribForm;
//# sourceMappingURL=index.js.map