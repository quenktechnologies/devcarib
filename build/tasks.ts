import { System } from '@quenk/potoo/lib/actor/system';

import {
    ClearExpiredJobsTask
} from '@board/server/lib/actors/tasks/clear-expired-jobs';

export const clearExpiredJobs = {

    id: 'clearExpiredJobs',

    create: (s: System) => new ClearExpiredJobsTask(s)

}
