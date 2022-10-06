import { Value } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';

import { Event } from '@quenk/wml-widgets/lib/control';

import { Post } from '@converse/types/lib/post';


import { ConverseRemoteForm } from '../../../common/scene/form';
import { CreatePostFormView } from './views';

/**
 * CreatePostForm displays a form for creating new posts.
 */
export class CreatePostForm extends ConverseRemoteForm<Post, void> {

    name = 'Create Post';

    view = new CreatePostFormView(this);

    model = this.models.create('post');

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
