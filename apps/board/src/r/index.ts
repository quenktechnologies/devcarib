/* tdc-output-imports */

// @ts-ignore: 2300
import { Request } from '@quenk/tendril/lib/app/api/request';

import { ApiController } from '@devcarib/server/lib/controllers/api';

import { JobModel } from '@board/models/lib/job';

export const jobsCtrl = new ApiController(JobModel.getInstance);

/* tdc-output-exports */
