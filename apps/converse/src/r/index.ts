/* tdc-output-imports */
import { ApiController } from '@devcarib/server/lib/controllers/api';

import { PostModel } from '@converse/models/lib/post';

export const postsCtrl = new ApiController(PostModel.getInstance);
/* tdc-output-exports */
