/* tdc-output-imports */

// @ts-ignore: 2300
import { Request } from '@quenk/tendril/lib/app/api/request';

import { ApiController } from '@board/server/lib/controllers/api';

import { JobModel } from '@board/server/lib/data/models/job';

export const jobsCtrl = new ApiController(JobModel.getInstance);

/* tdc-output-exports */
