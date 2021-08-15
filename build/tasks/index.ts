import { System } from '@quenk/potoo/lib/actor/system';

import { TaskClock } from '@board/server/lib/actors/task/clock';

import { ClearExpiredJobsTask } from './clear-expired-jobs';

export const clock = {

    id: 'clock',

    create: (s: System) => TaskClock.create(s)

}

export const clearExpiredJobs = {

    id: 'clearExpiredJobs',

    create: (s: System) => new ClearExpiredJobsTask(s)

}
