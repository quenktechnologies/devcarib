"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearExpiredJobs = exports.clock = void 0;
const clock_1 = require("@board/server/lib/actors/task/clock");
const clear_expired_jobs_1 = require("./clear-expired-jobs");
exports.clock = {
    id: 'clock',
    create: (s) => clock_1.TaskClock.create(s)
};
exports.clearExpiredJobs = {
    id: 'clearExpiredJobs',
    create: (s) => new clear_expired_jobs_1.ClearExpiredJobsTask(s)
};
//# sourceMappingURL=index.js.map