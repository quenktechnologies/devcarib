/* tdc-output-imports */

/* @ts-ignore: 2300 */
import { Request } from '@quenk/tendril/lib/app/api/request';

import { AdminModel } from '@mia/models/lib/admin';
import { JobModel } from '@mia/models/lib/job';
import { UserModel } from '@mia/models/lib/user';

import {ApiController} from '@devcarib/server/lib/controllers/api';

 export const adminsCtrl = new ApiController(AdminModel.getInstance)
export const jobsCtrl = new ApiController(JobModel.getInstance)
export const usersCtrl = new ApiController(UserModel.getInstance)

/* tdc-output-exports */
