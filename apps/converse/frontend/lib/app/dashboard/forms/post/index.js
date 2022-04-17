"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostForm = void 0;
const api = require("../../../api");
const remote_1 = require("@devcarib/frontend/lib/app/scene/form/remote");
const views_1 = require("./views");
/**
 * CreatePostForm displays a form for creating new posts.
 */
class CreatePostForm extends remote_1.RemoteForm {
    constructor() {
        super(...arguments);
        this.name = 'Create Post';
        this.view = new views_1.CreatePostFormView(this);
        this.model = this.getModel(api.posts);
        this.values = {
            data: this.value,
            errors: {},
            onChange: (e) => {
                this.tell(this.self(), e);
            },
            onPost: () => { this.save(); }
        };
    }
}
exports.CreatePostForm = CreatePostForm;
//# sourceMappingURL=index.js.map