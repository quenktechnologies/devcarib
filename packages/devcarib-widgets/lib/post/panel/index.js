"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostPanel = void 0;
const wml_1 = require("@quenk/wml");
const record_1 = require("@quenk/noni/lib/data/record");
const views_1 = require("./views");
/**
 * PostPanel displays a post made by a user.
 */
class PostPanel extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.readView = new views_1.PostPanelView(this);
        this.editView = new views_1.EditPostPanelView(this);
        this.view = this.readView;
        this.values = {
            editable: this.attrs.editable,
            editing: false,
            data: this.attrs.data,
            editor: {
                data: (0, record_1.clone)(this.attrs.data),
                onChange: (evt) => {
                    this.values.editor.data[evt.name] = evt.value;
                },
                onPost: () => {
                    this.values.data = (0, record_1.clone)(this.values.editor.data);
                    if (this.attrs.onEdit)
                        this.attrs.onEdit((0, record_1.clone)(this.values.editor.data));
                    this.view.tree.replaceWith(this.readView.render());
                    this.view = this.readView;
                },
                onCancel: () => {
                    this.values.editor.data = (0, record_1.clone)(this.values.data);
                    this.view.tree.replaceWith(this.readView.render());
                    this.view = this.readView;
                },
                show: () => {
                    this.view.tree.replaceWith(this.editView.render());
                    this.view = this.editView;
                }
            }
        };
    }
}
exports.PostPanel = PostPanel;
//# sourceMappingURL=index.js.map