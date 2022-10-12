"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankPanel = void 0;
const wml_1 = require("@quenk/wml");
const util_1 = require("@quenk/wml-widgets/lib/util");
const views_1 = require("./views");
/**
 * RankPanel is used to display a listing of recent activity in a sidebar.
 *
 * This is used for posts,jobs,events etc.
 */
class RankPanel extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views_1.RankPanelView(this);
        this.values = {
            title: this.attrs.title,
            className: (0, util_1.concat)('devcarib-rank-panel', this.attrs.className)
        };
    }
}
exports.RankPanel = RankPanel;
//# sourceMappingURL=index.js.map