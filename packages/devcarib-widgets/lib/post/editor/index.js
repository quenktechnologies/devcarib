"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostEditor = void 0;
const wml_1 = require("@quenk/wml");
const views_1 = require("./views");
/**
 * PostEditor is used by the user to add a new [[Post]] to the system.
 */
class PostEditor extends wml_1.Component {
    constructor() {
        var _a, _b, _c, _d;
        super(...arguments);
        this.view = new views_1.PostEditorView(this);
        this.values = {
            title: {
                hide: this.attrs.notitle,
                value: ((_a = this.attrs.value) === null || _a === void 0 ? void 0 : _a.title) || '',
                error: (_b = this.attrs.errors) === null || _b === void 0 ? void 0 : _b.title,
                onChange: this.attrs.onChange
            },
            body: {
                value: (_c = this.attrs.value) === null || _c === void 0 ? void 0 : _c.body,
                error: (_d = this.attrs.errors) === null || _d === void 0 ? void 0 : _d.body,
                onChange: this.attrs.onChange
            },
            post: {
                allowCancel: this.attrs.allowCancel,
                onPost: this.attrs.onPost,
                onCancel: this.attrs.onCancel
            }
        };
    }
}
exports.PostEditor = PostEditor;
//# sourceMappingURL=index.js.map