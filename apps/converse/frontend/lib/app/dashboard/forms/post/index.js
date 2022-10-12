"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostForm = void 0;
const remote_1 = require("@devcarib/frontend/lib/app/scene/form/remote");
const models_1 = require("../../../remote/models");
const views_1 = require("./views");
/**
 * CreatePostForm displays a form for creating new posts.
 */
class CreatePostForm extends remote_1.DevCaribRemoteForm {
    constructor() {
        super(...arguments);
        this.name = 'Create Post';
        this.view = new views_1.CreatePostFormView(this);
        this.model = models_1.RemoteModels.create('post', this.app.services['remote.background'], this);
        this.values = {
            data: this.value,
            errors: {},
            onCancel: () => this.abort(),
            onChange: (e) => {
                this.tell(this.self(), e);
            },
            onPost: () => { this.save(); }
        };
    }
}
exports.CreatePostForm = CreatePostForm;
//# sourceMappingURL=index.js.map