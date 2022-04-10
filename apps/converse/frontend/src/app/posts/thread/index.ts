import * as api from '../../api';

import {
    AfterGetSetData,
    OnCompleteShowData,
} from '@quenk/jouvert/lib/app/scene/remote/handlers';

import { Post } from '@converse/types/lib/post';

import { ConverseScene } from '../../common/scene';
import { PostThreadView } from './views';

/**
 * PostThread serves as the main view for a single post.
 *
 * It displays the original post as well as subsequent comments.
 */
export class PostThread extends ConverseScene<void> {

    name = 'post-thread';

    view = new PostThreadView(this);

    values = {

        data: <Post>{}

    };

    posts = this.app.getModel(api.POST, [

        new AfterGetSetData(data => this.values.data = data),

        new OnCompleteShowData(this),

    ]);

    afterFormSaved() {

        this.reload();

    }

    run() {

        return this.posts.get(Number(this.resume.request.params.id));

    }

}
