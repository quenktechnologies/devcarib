"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRankPanel = void 0;
const wml_1 = require("@quenk/wml");
const views_1 = require("./views");
/**
 * EventRankPanel displays a listing of ranked events.
 */
class EventRankPanel extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views_1.EventRankPanelView(this);
        this.values = {
            events: this.attrs.data || []
        };
    }
    update(data) {
        this.values.events = data;
        this.view.invalidate();
    }
}
exports.EventRankPanel = EventRankPanel;
//# sourceMappingURL=index.js.map