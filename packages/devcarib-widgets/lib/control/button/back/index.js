"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackButton = void 0;
const wml_1 = require("@quenk/wml");
const views_1 = require("./views");
/**
 * BackButton provides a button that can be clicked to go back.
 */
class BackButton extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views_1.BackButtonView(this);
        this.values = {
            onClick: () => this.attrs.onClick && this.attrs.onClick()
        };
    }
}
exports.BackButton = BackButton;
//# sourceMappingURL=index.js.map