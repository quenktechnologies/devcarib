"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentStream = void 0;
const wml_1 = require("@quenk/wml");
const views_1 = require("./views");
/**
 * CommentStream is used to display a stream of comments on a post.
 */
class CommentStream extends wml_1.Component {
    constructor() {
        var _a;
        super(...arguments);
        this.view = new views_1.CommentStreamView(this);
        this.values = {
            user: this.attrs.user || -1,
            data: ((_a = this.attrs.data) === null || _a === void 0 ? void 0 : _a.slice()) || [],
            onEdit: this.attrs.onEdit
        };
    }
    /**
     * update adds new comments to the stream.
     *
     * This will trigger a refresh of the view.
     */
    update(data) {
        this.values.data = data.slice();
        this.view.invalidate();
    }
    /**
     * append new comments to the stream.
     *
     * This will trigger a refresh of the view.
     */
    append(data) {
        this.update([...this.values.data, ...data]);
    }
}
exports.CommentStream = CommentStream;
//# sourceMappingURL=index.js.map