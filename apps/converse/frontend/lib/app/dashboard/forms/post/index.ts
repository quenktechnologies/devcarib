import { Value } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';

import { Event } from '@quenk/wml-widgets/lib/control';

import {
    DevCaribRemoteForm
} from '@devcarib/frontend/lib/app/scene/form/remote';

import { Post } from '@converse/types/lib/post';

import { RemoteModels } from '../../../remote/models';
import { CreatePostFormView } from './views';

/**
 * CreatePostForm displays a form for creating new posts.
 */
export class CreatePostForm extends DevCaribRemoteForm<Post, void> {

    name = 'Create Post';

    view = new CreatePostFormView(this);

    model = RemoteModels.create<Post>('post',
        this.app.services['remote.background'], this);

    values = {

        data: this.value,

        errors: <Record<string>>{},

        onCancel: () => this.abort(),

        onChange: (e: Event<Value>) => {

            this.tell(this.self(), e);

        },

        onPost: () => { this.save(); }

    };

}
