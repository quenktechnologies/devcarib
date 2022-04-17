import * as api from '../../../api';

import { Value } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';

import { Event } from '@quenk/wml-widgets/lib/control';

import { Post } from '@converse/types/lib/post';

import { RemoteForm } from '@devcarib/frontend/lib/app/scene/form/remote';

import { CreatePostFormView } from './views';

/**
 * CreatePostForm displays a form for creating new posts.
 */
export class CreatePostForm extends RemoteForm<Post, void> {

    name = 'Create Post';

    view = new CreatePostFormView(this);

    model = this.getModel(api.posts);

    values = {

        data: this.value,

        errors: <Record<string>>{},

        onChange: (e: Event<Value>) => {

            this.tell(this.self(), e);

        },

        onPost: () => { this.save(); }

    };

}
