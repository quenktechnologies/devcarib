"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostStream = void 0;
const wml_1 = require("@quenk/wml");
const views_1 = require("./views");
const util_1 = require("@quenk/wml-widgets/lib/util");
/**
 * PostStream is used to display recent post activity in a list view fashion.
 */
class PostStream extends wml_1.Component {
    constructor() {
        var _a;
        super(...arguments);
        this.view = new views_1.PostStreamView(this);
        this.values = {
            className: (0, util_1.concat)('devcarib-post-stream', this.attrs.className),
            data: ((_a = this.attrs.data) === null || _a === void 0 ? void 0 : _a.slice()) || [],
            getPostHref: (post) => `#/posts/${post.id}`,
            onClick: (idx) => () => {
                this.attrs.onPost && this.attrs.onPost(this.values.data[idx]);
            }
        };
    }
    /**
     * update the stream with new posts.
     *
     * This will trigger a refresh of the view.
     */
    update(data) {
        this.values.data = data;
        this.view.invalidate();
    }
    /**
     * append new posts to the stream.
     *
     * This will trigger a refresh of the view.
     */
    append(data) {
        this.update([...this.values.data, ...data]);
    }
}
exports.PostStream = PostStream;
//# sourceMappingURL=index.js.map