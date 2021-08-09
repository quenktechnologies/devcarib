import {System} from '@quenk/potoo/lib/actor/system';

import {ClearExpiredJobsTask} from './clear-expired-jobs';
import {TaskClock} from './clock';

export const clock = {

    id: 'clock',

    create: (s:System) => TaskClock.create(s, 1000)

}

export const clearExpiredJobs = {

    id: 'clearExpiredJobs',

    create: (s:System) => new ClearExpiredJobsTask(s)

}
