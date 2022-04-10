import {Attrs,Component} from '@quenk/wml';

import {Post} from '@converse/types/lib/post';

import {PostMetadataView} from './views';

/**
 * PostMetadataAttrs
 */
export interface PostMetadataAttrs extends Attrs {

    /**
     * data is the Post to extract the data from.
     */
    data: Post

}

/**
 * PostMetadata displays the user name and time-ago time of a post.
 *
 * Example: sana posted 3 seconds ago.
 */
export class PostMetadata extends Component<PostMetadataAttrs> {

    view = new PostMetadataView(this);

    values = {

        data: this.attrs.data

    }

}
