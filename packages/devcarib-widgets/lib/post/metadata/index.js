"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMetadata = void 0;
const wml_1 = require("@quenk/wml");
const views_1 = require("./views");
/**
 * PostMetadata displays the user name and time-ago time of a post.
 *
 * Example: sana posted 3 seconds ago.
 */
class PostMetadata extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views_1.PostMetadataView(this);
        this.values = {
            data: this.attrs.data
        };
    }
}
exports.PostMetadata = PostMetadata;
//# sourceMappingURL=index.js.map