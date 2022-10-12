"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRankPanel = void 0;
const wml_1 = require("@quenk/wml");
const views_1 = require("./views");
/**
 * PostRankPanel displays a listing of recent jobs.
 */
class PostRankPanel extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views_1.PostRankPanelView(this);
        this.values = {
            title: this.attrs.title || 'Posts',
            posts: this.attrs.data || []
        };
    }
    update(data) {
        this.values.posts = data;
        this.view.invalidate();
    }
}
exports.PostRankPanel = PostRankPanel;
//# sourceMappingURL=index.js.map